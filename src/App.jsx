import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import HeaderNav from './components/HeaderNav';
import QuoteFormEditor from './components/QuoteFormEditor';
import QuoteDocumentView from './components/QuoteDocumentView';
import HistoryModal from './components/HistoryModal';
import NetlifyGuideModal from './components/NetlifyGuideModal';
import { DEFAULT_QUOTE } from './data/presets';
import { Edit3, Eye, Download, Share2 } from 'lucide-react';

export default function App() {
  const [quote, setQuote] = useState(() => {
    const saved = localStorage.getItem('maher_current_quote');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTE;
  });

  const [savedQuotes, setSavedQuotes] = useState(() => {
    const history = localStorage.getItem('maher_saved_quotes_history');
    return history ? JSON.parse(history) : [];
  });

  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isNetlifyOpen, setIsNetlifyOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const documentRef = useRef(null);

  // Auto-save current state to localStorage
  useEffect(() => {
    localStorage.setItem('maher_current_quote', JSON.stringify(quote));
  }, [quote]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('maher_saved_quotes_history', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  // Total calculation for WhatsApp
  const subtotal = quote.items.reduce((acc, item) => acc + (parseFloat(item.importe) || 0), 0);
  const tasa = quote.incluirIva ? (parseFloat(quote.tasaIva) || 0) : 0;
  const total = subtotal + subtotal * (tasa / 100);

  // Actions
  const handleNewQuote = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(2,10).replace(/-/g,'');
    const randomNum = Math.floor(Math.random() * 90 + 10);
    const newFolio = `CM-${dateStr}-${randomNum}`;
    
    setQuote({
      ...DEFAULT_QUOTE,
      folio: newFolio,
      fecha: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase(),
      cliente: "",
      unidad: "",
      modelo: "",
      placas: "",
      vin: "",
      items: [
        { id: Date.now().toString(), cant: 1, concepto: "", descripcion: "", importe: 0 }
      ],
      diagnostico: [""],
      codigosActivos: []
    });
    setMobileTab('editor');
  };

  const handleResetExample = () => {
    setQuote(DEFAULT_QUOTE);
  };

  const handleSaveCurrentQuote = () => {
    setSavedQuotes(prev => {
      const filtered = prev.filter(q => q.folio !== quote.folio);
      return [quote, ...filtered];
    });
    alert(`Cotización ${quote.folio} guardada exitosamente en el historial.`);
  };

  const handleLoadQuote = (loadedQuote) => {
    setQuote(loadedQuote);
    setIsHistoryOpen(false);
  };

  const handleDeleteQuote = (folio) => {
    if (confirm(`¿Estás seguro de eliminar la cotización ${folio}?`)) {
      setSavedQuotes(prev => prev.filter(q => q.folio !== folio));
    }
  };

  const handlePrint = () => {
    try {
      window.focus();
      setTimeout(() => {
        window.print();
      }, 100);
    } catch (e) {
      console.error("Error al ejecutar window.print():", e);
      alert("Para imprimir, presiona Ctrl + P en tu teclado.");
    }
  };

  // Direct PDF Download Handler with Pixel-Perfect 794px A4 Proportions
  const handleDownloadPDF = async () => {
    if (!documentRef.current) {
      alert("No se encontró la hoja de documento para exportar.");
      return;
    }
    
    setIsGeneratingPDF(true);

    try {
      const previousTab = mobileTab;
      if (mobileTab === 'editor') {
        setMobileTab('preview');
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const element = documentRef.current;

      const opt = {
        margin:       [0, 0, 0, 0],
        filename:     `Cotizacion_${quote.folio || 'MAHER'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          logging: false, 
          windowWidth: 794,
          scrollY: 0 
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const pdfModule = typeof html2pdf === 'function' ? html2pdf : html2pdf.default || window.html2pdf;
      
      if (pdfModule) {
        await pdfModule().set(opt).from(element).save();
      }

      if (previousTab === 'editor') {
        setTimeout(() => setMobileTab('editor'), 400);
      }
    } catch (err) {
      console.error("Error al descargar PDF:", err);
      alert(`Error al generar el PDF: ${err?.message || 'Error de procesamiento'}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShareWhatsApp = () => {
    const totalFormatted = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(total);

    const message = 
      `*COTIZACIÓN TÉCNICA - MAHER MECÁNICA ESPECIALIZADA* 🚘\n\n` +
      `📌 *Folio:* ${quote.folio}\n` +
      `📅 *Fecha:* ${quote.fecha}\n` +
      `👤 *Cliente:* ${quote.cliente || 'Estimado Cliente'}\n` +
      `🚙 *Unidad:* ${quote.unidad || 'Vehículo'} (${quote.modelo || ''})\n` +
      `🚘 *Placas:* ${quote.placas || '—'}\n\n` +
      `💰 *TOTAL COTIZADO:* ${totalFormatted} MXN\n\n` +
      `Te adjunto el desglose completo. ¡Quedamos atentos a tus comentarios para proceder!`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-gray-100 flex flex-col font-sans selection:bg-[#E5A900] selection:text-[#0F1E36]">
      
      {/* Top Navbar */}
      <HeaderNav
        onNewQuote={handleNewQuote}
        onResetExample={handleResetExample}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenNetlifyModal={() => setIsNetlifyOpen(true)}
        onDownloadPDF={handleDownloadPDF}
        onShareWhatsApp={handleShareWhatsApp}
        onPrint={handlePrint}
        savedCount={savedQuotes.length}
      />

      {/* Mobile Mode Switcher (Visible only on screens below lg breakpoint) */}
      <div className="no-print lg:hidden p-2 bg-[#091122]/90 border-b border-white/10 sticky top-[53px] z-30 backdrop-blur-md">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mobileTab === 'editor'
                ? 'bg-gradient-to-r from-[#172b4c] to-[#0F1E36] text-[#E5A900] shadow border border-[#E5A900]/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#E5A900]" />
            <span>Editar Cotización</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-gradient-to-r from-[#172b4c] to-[#0F1E36] text-[#E5A900] shadow border border-[#E5A900]/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Ver Hoja PDF (1:1)</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Workspace */}
      <main className="flex-1 p-2 sm:p-4 max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 pb-20 lg:pb-4">
        
        {/* Left Column: Form Editor */}
        <div className={`no-print lg:col-span-5 xl:col-span-4 h-full ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
          <QuoteFormEditor quote={quote} setQuote={setQuote} />
        </div>

        {/* Right Column: PDF Replica Document View */}
        <div className={`lg:col-span-7 xl:col-span-8 flex flex-col items-center w-full ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="no-print w-full flex items-center justify-between glass-card border border-white/10 px-4 py-2 rounded-xl mb-3 shadow-lg">
            <span className="text-xs text-gray-300 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Vista Previa 1:1 de Cotización Impresa
            </span>
            <span className="text-[11px] text-[#E5A900] bg-[#1a2d4d] px-2.5 py-0.5 rounded-full border border-[#E5A900]/30 font-bold">
              Vectorial A4 / PDF
            </span>
          </div>

          <QuoteDocumentView quote={quote} documentRef={documentRef} />
        </div>
      </main>

      {/* Floating Action Bar for Mobile View */}
      <div className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091122]/95 backdrop-blur-md border-t border-white/10 p-2.5 px-4 flex items-center justify-between shadow-2xl">
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total</span>
          <span className="text-sm font-black text-emerald-400 font-mono">
            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1 px-3 py-2 bg-[#128C7E] text-white text-xs font-bold rounded-xl shadow cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1 px-3.5 py-2 bg-[#E5A900] text-[#0F1E36] text-xs font-black rounded-xl shadow cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedQuotes={savedQuotes}
        onLoadQuote={handleLoadQuote}
        onSaveCurrentQuote={handleSaveCurrentQuote}
        onDeleteQuote={handleDeleteQuote}
        currentFolio={quote.folio}
      />

      <NetlifyGuideModal
        isOpen={isNetlifyOpen}
        onClose={() => setIsNetlifyOpen(false)}
      />

      {/* PDF Loading Toast Overlay */}
      {isGeneratingPDF && (
        <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0f192c] border border-[#E5A900] p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#E5A900] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-bold text-sm">Generando PDF de Alta Calidad...</p>
            <p className="text-xs text-gray-400">Descargando archivo directamente...</p>
          </div>
        </div>
      )}
    </div>
  );
}
