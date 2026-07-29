import React from 'react';
import { 
  FileText, Download, Share2, Printer, PlusCircle, RotateCcw, 
  History, Cloud, Edit3, Eye, ShieldCheck
} from 'lucide-react';

export default function HeaderNav({
  onNewQuote,
  onResetExample,
  onOpenHistory,
  onOpenNetlifyModal,
  onDownloadPDF,
  onShareWhatsApp,
  onPrint,
  savedCount,
  mobileTab,
  setMobileTab
}) {
  return (
    <header className="no-print bg-[#060c18]/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-2xl">
      <div className="max-w-[1750px] mx-auto flex flex-col gap-3">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand & Subtitle Emblem */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#0c182b] to-[#040812] border border-[#E5A900]/70 text-[#E5A900] px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-amber-950/20 group cursor-pointer">
              <FileText className="w-5 h-5 text-[#E5A900] group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="tracking-wider text-base sm:text-lg font-black font-['Montserrat'] text-white">MAHER</span>
                  <span className="text-[10px] bg-[#E5A900] text-[#050913] px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-widest">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] text-[#E5A900] font-bold tracking-widest uppercase mt-0.5">
                  MECÁNICA ESPECIALIZADA
                </span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium border-l border-slate-800 pl-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cotizador Automotriz Vectorial</span>
            </div>
          </div>

          {/* Right Action Toolbar */}
          <div className="flex items-center gap-2">
            
            <button
              type="button"
              onClick={onNewQuote}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-gray-200 text-xs font-bold rounded-2xl border border-slate-700/80 transition cursor-pointer active:scale-95 shadow-sm"
              title="Crear una cotización en blanco"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Nueva</span>
            </button>

            <button
              type="button"
              onClick={onResetExample}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-gray-200 text-xs font-bold rounded-2xl border border-slate-700/80 transition cursor-pointer active:scale-95"
              title="Restablecer plantilla de ejemplo Saveiro"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Cargar Ejemplo</span>
            </button>

            <button
              type="button"
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-gray-200 text-xs font-bold rounded-2xl border border-slate-700/80 transition relative cursor-pointer active:scale-95"
            >
              <History className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Historial</span>
              {savedCount > 0 && (
                <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenNetlifyModal}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 text-xs font-bold rounded-2xl border border-cyan-700/40 transition cursor-pointer active:scale-95"
            >
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span>Desplegar ($0)</span>
            </button>

            <div className="h-6 w-[1px] bg-slate-800 mx-1 hidden sm:block"></div>

            {/* Main CTA Buttons */}
            <button
              type="button"
              onClick={onPrint}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-2xl border border-slate-600 shadow transition cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Imprimir</span>
            </button>

            <button
              type="button"
              onClick={onShareWhatsApp}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-black rounded-2xl shadow-lg transition cursor-pointer active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={onDownloadPDF}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E5A900] via-[#f5b80a] to-[#ca9400] hover:brightness-110 text-[#050913] text-xs font-black rounded-2xl shadow-xl shadow-amber-950/30 transition cursor-pointer transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>

          </div>
        </div>

        {/* Integrated Mobile Mode Switcher Row (No overlap on small screens) */}
        <div className="lg:hidden grid grid-cols-2 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-inner">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              mobileTab === 'editor'
                ? 'bg-gradient-to-r from-[#172b4c] to-[#0c182b] text-[#E5A900] shadow-md border border-[#E5A900]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#E5A900]" />
            <span>Formulario Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-gradient-to-r from-[#172b4c] to-[#0c182b] text-[#E5A900] shadow-md border border-[#E5A900]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Vista Hoja A4</span>
          </button>
        </div>

      </div>
    </header>
  );
}
