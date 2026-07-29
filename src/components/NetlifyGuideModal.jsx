import React from 'react';
import { Cloud, CheckCircle2, X, ExternalLink, Download, UploadCloud } from 'lucide-react';

export default function NetlifyGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f192c] border border-cyan-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b1323] border-b border-cyan-500/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-cyan-400" />
            <h2 className="text-white font-bold text-base">Despliegue 100% Gratis en Netlify</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-gray-300">
          <div className="bg-[#0e2738] border border-cyan-600/50 p-3 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-cyan-300 text-sm">¡Netlify es la mejor opción 100% Gratuita para siempre!</p>
              <p className="text-gray-300 mt-0.5">
                No requiere tarjeta de crédito, incluye dominio gratis SSL (<code className="text-cyan-300">.netlify.app</code>) y el sitio cargará ultra rápido.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm">Método 1: Arrastrar y Soltar en Netlify Drop (1 minuto)</h3>

            <div className="space-y-2">
              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">1</span>
                  Abrir Netlify Drop
                </div>
                <p className="text-gray-300 pl-7">
                  Entra a la página oficial de despliegue directo de Netlify:
                </p>
                <div className="pl-7 pt-1">
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
                  >
                    <span>Abrir Netlify Drop</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">2</span>
                  Arrastrar la carpeta dist
                </div>
                <p className="text-gray-300 pl-7">
                  Arrastra y suelta la carpeta <strong className="text-cyan-300">cotizador-maher/dist</strong> directamente en el recuadro gris de Netlify.
                </p>
              </div>

              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">3</span>
                  ¡Sitio en vivo al instante!
                </div>
                <p className="text-emerald-400 pl-7 font-semibold">
                  Netlify te dará una URL pública como <code className="text-white bg-emerald-950 px-2 py-0.5 rounded font-mono">https://cotizador-maher.netlify.app</code> lista para enviar a tus clientes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0b1323] border-t border-cyan-500/30 p-3 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
