import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import HeaderNav from './components/HeaderNav';
import QuoteFormEditor from './components/QuoteFormEditor';
import QuoteDocumentView from './components/QuoteDocumentView';
import HistoryModal from './components/HistoryModal';
import NetlifyGuideModal from './components/NetlifyGuideModal';
import { DEFAULT_QUOTE } from './data/presets';

export default function App() {
  const [quote, setQuote] = useState(() => {
    const saved = localStorage.getItem('maher_current_quote');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTE;
  });

  const [savedQuotes, setSavedQuotes] = useState(() => {
    const history = localStorage.getItem('maher_saved_quotes_history');
    return history ? JSON.parse(history) : [];
  });

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

  const handleDownloadPDF = async () => {
    if (!documentRef.current) {
      alert("No se encontró la hoja de documento para exportar.");
      return;
    }
    
    setIsGeneratingPDF(true);

    try {
      const element = documentRef.current;
      const opt = {
        margin:       [0, 0, 0, 0],
        filename:     `Cotizacion_${quote.folio || 'MAHER'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const pdfExporter = typeof html2pdf === 'function' ? html2pdf : html2pdf.default || window.html2pdf;
      
      if (pdfExporter) {
        await pdfExporter().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (err) {
      console.error("Error al generar PDF con html2pdf:", err);
      window.focus();
      window.print();
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
    <div className="min-h-screen bg-[#070d19] text-gray-100 flex flex-col font-sans">
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

      {/* Main Workspace Split */}
      <main className="flex-1 p-2 sm:p-4 max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Interactive Form Editor */}
        <div className="no-print lg:col-span-5 xl:col-span-4 h-full">
          <QuoteFormEditor quote={quote} setQuote={setQuote} />
        </div>

        {/* Right Column: Live PDF Document Replica */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center w-full">
          <div className="no-print w-full flex items-center justify-between bg-[#0f192c] border border-[#1e2d4a] px-4 py-2 rounded-xl mb-3 shadow-lg">
            <span className="text-xs text-gray-300 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Vista Previa en Tiempo Real (Réplica 1:1 de Cotización)
            </span>
            <span className="text-[11px] text-[#E5A900] bg-[#1a2d4d] px-2.5 py-0.5 rounded border border-[#E5A900]/30 font-bold">
              Impresión Vectorial A4 / PDF
            </span>
          </div>

          <QuoteDocumentView quote={quote} documentRef={documentRef} />
        </div>
      </main>

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
            <p className="text-xs text-gray-400">Preparando documento para descarga</p>
          </div>
        </div>
      )}
    </div>
  );
}
