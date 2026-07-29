/**
 * @file App.jsx
 * @description Componente principal de la aplicación MAHER Pro.
 * Maneja el estado global de la cotización activa, la persistencia en localStorage,
 * el control de navegación móvil (Editor vs Preview A4) y la exportación directa a PDF/WhatsApp.
 * 
 * @module App
 */

import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import HeaderNav from './components/HeaderNav';
import QuoteFormEditor from './components/QuoteFormEditor';
import QuoteDocumentView from './components/QuoteDocumentView';
import HistoryModal from './components/HistoryModal';
import NetlifyGuideModal from './components/NetlifyGuideModal';
import { DEFAULT_QUOTE } from './data/presets';
import { Download, Share2, Sparkles } from 'lucide-react';

export default function App() {
  /**
   * Estado de la cotización actual en edición.
   * Se inicializa recuperando la cotización guardada en localStorage o la plantilla de ejemplo por defecto.
   */
  const [quote, setQuote] = useState(() => {
    const saved = localStorage.getItem('maher_current_quote');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTE;
  });

  /**
   * Historial de cotizaciones previamente guardadas por el usuario.
   */
  const [savedQuotes, setSavedQuotes] = useState(() => {
    const history = localStorage.getItem('maher_saved_quotes_history');
    return history ? JSON.parse(history) : [];
  });

  /**
   * Control de pestaña en vista móvil:
   * 'editor'  -> Muestra el formulario de edición por pasos.
   * 'preview' -> Muestra el visor de la hoja física A4 vectorizada.
   */
  const [mobileTab, setMobileTab] = useState('editor');

  /** Estados de visibilidad para los modales de la aplicación */
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isNetlifyOpen, setIsNetlifyOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  /** Referencia directa al nodo DOM de la hoja A4 para html2canvas */
  const documentRef = useRef(null);

  // Sincronización automática de la cotización activa con localStorage
  useEffect(() => {
    localStorage.setItem('maher_current_quote', JSON.stringify(quote));
  }, [quote]);

  // Sincronización automática del historial con localStorage
  useEffect(() => {
    localStorage.setItem('maher_saved_quotes_history', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  // Cálculo en tiempo real del gran total para envío por WhatsApp
  const subtotal = quote.items.reduce((acc, item) => acc + (parseFloat(item.importe) || 0), 0);
  const tasa = quote.incluirIva ? (parseFloat(quote.tasaIva) || 0) : 0;
  const total = subtotal + subtotal * (tasa / 100);

  /**
   * Crea una nueva cotización en blanco con un folio único autogenerado basándose en la fecha actual.
   */
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

  /**
   * Restablece la cotización de ejemplo original (Saveiro 2015).
   */
  const handleResetExample = () => {
    setQuote(DEFAULT_QUOTE);
  };

  /**
   * Guarda la cotización actual en el historial de la aplicación.
   */
  const handleSaveCurrentQuote = () => {
    setSavedQuotes(prev => {
      const filtered = prev.filter(q => q.folio !== quote.folio);
      return [quote, ...filtered];
    });
    alert(`Cotización ${quote.folio} guardada exitosamente en el historial.`);
  };

  /**
   * Carga una cotización seleccionada del historial.
   * @param {Object} loadedQuote - Cotización almacenada.
   */
  const handleLoadQuote = (loadedQuote) => {
    setQuote(loadedQuote);
    setIsHistoryOpen(false);
  };

  /**
   * Elimina una cotización específica del historial por su folio.
   * @param {string} folio - Folio único de la cotización.
   */
  const handleDeleteQuote = (folio) => {
    if (confirm(`¿Estás seguro de eliminar la cotización ${folio}?`)) {
      setSavedQuotes(prev => prev.filter(q => q.folio !== folio));
    }
  };

  /**
   * Ejecuta el comando de impresión del navegador.
   */
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

  /**
   * Manejador de descarga directa de PDF sin abrir cuadros de diálogo de impresora.
   * Cambia temporalmente la vista en móvil a 'preview' para asegurar el renderizado del DOM en html2canvas.
   */
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

  /**
   * Construye y abre la URL de WhatsApp con el resumen de la cotización.
   */
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
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-[#E5A900] selection:text-[#0F1E36]">
      
      {/* Barra de navegación superior */}
      <HeaderNav
        onNewQuote={handleNewQuote}
        onResetExample={handleResetExample}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenNetlifyModal={() => setIsNetlifyOpen(true)}
        onDownloadPDF={handleDownloadPDF}
        onShareWhatsApp={handleShareWhatsApp}
        onPrint={handlePrint}
        savedCount={savedQuotes.length}
        mobileTab={mobileTab}
        setMobileTab={setMobileTab}
      />

      {/* Área principal de trabajo */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1750px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-32 lg:pb-12">
        
        {/* Columna Izquierda: Formulario Asistido (Stepper Wizard) */}
        <div className={`no-print lg:col-span-6 xl:col-span-5 ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
          <QuoteFormEditor quote={quote} setQuote={setQuote} />
        </div>

        {/* Columna Derecha: Visor de la Hoja A4 Vectorial en Tiempo Real */}
        <div className={`lg:col-span-6 xl:col-span-7 flex flex-col items-center w-full ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="no-print w-full flex items-center justify-between glass-card-master px-5 py-3 rounded-2xl mb-4 shadow-xl border border-white/10">
            <span className="text-xs sm:text-sm text-slate-200 font-extrabold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50"></span>
              Vista Previa Vectorial 1:1 en Tiempo Real
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#E5A900] bg-[#172b4c] px-3 py-1 rounded-full border border-[#E5A900]/40 font-black flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A900]" />
                Standard A4 PDF
              </span>
            </div>
          </div>

          <QuoteDocumentView quote={quote} documentRef={documentRef} />
        </div>
      </main>

      {/* Dock Flotante Inferior de Comandos para Teléfonos Móviles */}
      <div className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050b18]/95 backdrop-blur-2xl border-t border-white/10 p-3 px-5 flex items-center justify-between shadow-2xl">
        <div className="text-left">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Cotizado</span>
          <span className="text-base font-black text-emerald-400 font-mono">
            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#128C7E] text-white text-xs font-bold rounded-2xl shadow active:scale-95 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#E5A900] text-[#050913] text-xs font-black rounded-2xl shadow-lg active:scale-95 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Modales de Historial y Guía */}
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

      {/* Toast de carga al generar el PDF */}
      {isGeneratingPDF && (
        <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="bg-[#091428] border border-[#E5A900] p-7 rounded-3xl shadow-2xl flex flex-col items-center space-y-4 max-w-xs text-center">
            <div className="w-12 h-12 border-4 border-[#E5A900] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-extrabold text-base">Generando PDF de Alta Resolución...</p>
            <p className="text-xs text-slate-400 leading-relaxed">Procesando vectores 1:1. El archivo se descargará automáticamente.</p>
          </div>
        </div>
      )}
    </div>
  );
}
