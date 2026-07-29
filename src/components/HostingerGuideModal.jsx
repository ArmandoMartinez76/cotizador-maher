import React from 'react';
import { Server, CheckCircle2, ArrowRight, X, ExternalLink } from 'lucide-react';

export default function HostingerGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f192c] border border-emerald-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b1323] border-b border-emerald-500/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-bold text-base">Guía de Despliegue Gratis en Hostinger</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-gray-300">
          <div className="bg-[#10241b] border border-emerald-700/50 p-3 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-300 text-sm">¡Tu plan Hostinger Business Web Hosting es 100% compatible!</p>
              <p className="text-gray-300 mt-0.5">
                Al ser un sistema web moderno compilado de forma estática, puedes alojarlo sin ningún costo adicional en tu plan de Hostinger actual.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm">Pasos para publicar en 3 minutos:</h3>

            <div className="space-y-2">
              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">1</span>
                  Generar los archivos de producción
                </div>
                <p className="text-gray-400 pl-7">
                  Ejecuta en la terminal el comando: <code className="bg-[#18263e] px-2 py-0.5 rounded text-emerald-300 font-mono">npm run build</code>
                </p>
                <p className="text-gray-400 pl-7 text-[11px]">
                  Esto creará una carpeta llamada <strong className="text-gray-200">dist/</strong> en la raíz del proyecto.
                </p>
              </div>

              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">2</span>
                  Ingresar a Hostinger hPanel
                </div>
                <p className="text-gray-400 pl-7">
                  Accede a tu hPanel de Hostinger → Selecciona tu sitio web o crea un subdominio (ej: <code className="text-cyan-300">cotizaciones.tudominio.com</code>).
                </p>
                <p className="text-gray-400 pl-7 text-[11px]">
                  Abre el <strong>Administrador de Archivos (File Manager)</strong> y navega a la carpeta <code className="text-amber-300">public_html</code>.
                </p>
              </div>

              <div className="bg-[#0b1323] p-3 rounded-xl border border-[#1e2d4a] space-y-1">
                <div className="font-bold text-[#E5A900] flex items-center gap-2">
                  <span className="bg-[#E5A900] text-[#0F1E36] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">3</span>
                  Subir el contenido de dist/
                </div>
                <p className="text-gray-400 pl-7">
                  Arrastra todos los archivos dentro de la carpeta <strong className="text-gray-200">dist/</strong> hacia la carpeta <code className="text-amber-300">public_html</code> de Hostinger.
                </p>
                <p className="text-emerald-400 pl-7 font-semibold">
                  ¡Listo! Tu cotizador estará en vivo y accesible desde cualquier celular, tablet o computadora con certificado SSL gratis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0b1323] border-t border-emerald-500/30 p-3 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
