import React from 'react';
import { 
  FileText, Download, Share2, Printer, PlusCircle, RotateCcw, 
  History, Cloud, Sparkles
} from 'lucide-react';

export default function HeaderNav({
  onNewQuote,
  onResetExample,
  onOpenHistory,
  onOpenNetlifyModal,
  onDownloadPDF,
  onShareWhatsApp,
  onPrint,
  savedCount
}) {
  return (
    <header className="no-print bg-[#0b1323]/80 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 sticky top-0 z-40 shadow-2xl">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="bg-gradient-to-br from-[#0F1E36] to-[#060c18] border border-[#E5A900]/60 text-[#E5A900] font-black px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-950/20">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5A900]" />
            <span className="tracking-wider text-base sm:text-lg font-['Montserrat']">MAHER</span>
            <span className="text-[9px] sm:text-[10px] bg-[#E5A900] text-[#0F1E36] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
              PRO
            </span>
          </div>
          
          <div className="hidden md:block">
            <h1 className="text-white text-xs sm:text-sm font-semibold leading-tight flex items-center gap-2">
              Cotizador Técnico Especializado
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                v2.0 UI/UX
              </span>
            </h1>
            <p className="text-[#9ca3af] text-[11px] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Auto-guardado activo • Netlify Ready ($0)
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          <button
            type="button"
            onClick={onNewQuote}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-gray-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer active:scale-95 shadow-sm"
            title="Crear una cotización en blanco"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Nueva</span>
          </button>

          <button
            type="button"
            onClick={onResetExample}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-gray-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer active:scale-95 shadow-sm"
            title="Restablecer plantilla de ejemplo Saveiro"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Ejemplo</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-gray-200 text-xs font-semibold rounded-xl border border-slate-700 transition relative cursor-pointer active:scale-95 shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Historial</span>
            {savedCount > 0 && (
              <span className="bg-blue-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenNetlifyModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 text-xs font-semibold rounded-xl border border-cyan-700/40 transition cursor-pointer active:scale-95"
          >
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Desplegar ($0)</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-700/60 mx-0.5 sm:mx-1"></div>

          {/* Primary Action Buttons */}
          <button
            type="button"
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-600 shadow transition cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={onShareWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-emerald-900/30 transition cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#E5A900] via-[#f3b708] to-[#ca9400] hover:brightness-110 text-[#0F1E36] text-xs font-black rounded-xl shadow-lg shadow-amber-500/10 transition cursor-pointer transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>

        </div>
      </div>
    </header>
  );
}
