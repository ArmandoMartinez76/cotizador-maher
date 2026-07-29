import React from 'react';
import { FileText, Download, Share2, Printer, PlusCircle, RotateCcw, History, Cloud } from 'lucide-react';

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
    <header className="no-print bg-[#0b1424] border-b border-[#1d2d4a] px-4 py-3 sticky top-0 z-40 shadow-xl">
      <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-[#0F1E36] border border-[#E5A900] text-[#E5A900] font-black px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md">
            <FileText className="w-5 h-5 text-[#E5A900]" />
            <span className="tracking-wider text-lg font-[#Montserrat]">MAHER</span>
            <span className="text-[10px] bg-[#E5A900] text-[#0F1E36] px-1.5 py-0.5 rounded font-bold uppercase">PRO</span>
          </div>
          <div>
            <h1 className="text-white text-sm font-semibold leading-tight">Generador de Cotizaciones Técnicas</h1>
            <p className="text-[#9ca3af] text-xs flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Listo para despliegue en Netlify ($0 Gratis)
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onNewQuote}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2b45] hover:bg-[#253d61] text-gray-200 text-xs font-medium rounded-lg border border-[#2d446a] transition cursor-pointer"
            title="Crear una cotización en blanco"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Nueva</span>
          </button>

          <button
            type="button"
            onClick={onResetExample}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2b45] hover:bg-[#253d61] text-gray-200 text-xs font-medium rounded-lg border border-[#2d446a] transition cursor-pointer"
            title="Restablecer plantilla de ejemplo Saveiro"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Cargar Ejemplo</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2b45] hover:bg-[#253d61] text-gray-200 text-xs font-medium rounded-lg border border-[#2d446a] transition relative cursor-pointer"
          >
            <History className="w-4 h-4 text-blue-400" />
            <span>Historial</span>
            {savedCount > 0 && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenNetlifyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0e2738] hover:bg-[#14364e] text-cyan-300 text-xs font-medium rounded-lg border border-cyan-700/50 transition cursor-pointer"
          >
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>Desplegar en Netlify ($0)</span>
          </button>

          <div className="h-5 w-[1px] bg-[#1d2d4a] mx-1 hidden sm:block"></div>

          {/* Primary Action Buttons */}
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#20314f] hover:bg-[#2a4169] text-white text-xs font-semibold rounded-lg border border-[#3b588a] shadow transition cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={onShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-emerald-900/30 transition cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#E5A900] to-[#ca9400] hover:from-[#f3b507] hover:to-[#da9f00] text-[#0F1E36] text-xs font-bold rounded-lg shadow-lg hover:shadow-amber-500/20 transition cursor-pointer transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
