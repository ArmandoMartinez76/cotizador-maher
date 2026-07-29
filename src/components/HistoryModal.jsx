import React from 'react';
import { History, Trash2, FolderOpen, Save, X, Calendar, Car } from 'lucide-react';

export default function HistoryModal({
  isOpen,
  onClose,
  savedQuotes,
  onLoadQuote,
  onSaveCurrentQuote,
  onDeleteQuote,
  currentFolio
}) {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f192c] border border-[#25395c] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0b1323] border-b border-[#25395c] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#E5A900]" />
            <h2 className="text-white font-bold text-base">Historial de Cotizaciones Guardadas</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <div className="flex justify-between items-center bg-[#15233c] p-3 rounded-xl border border-[#25395c]">
            <div>
              <p className="text-xs text-gray-300 font-medium">Cotización Actual en Pantalla:</p>
              <p className="text-sm font-bold text-[#E5A900]">{currentFolio}</p>
            </div>
            <button
              onClick={onSaveCurrentQuote}
              className="flex items-center gap-1.5 bg-[#E5A900] hover:bg-[#f5b810] text-[#0F1E36] font-bold text-xs px-3 py-2 rounded-lg transition shadow"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cotización Actual</span>
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Cotizaciones Almacenadas ({savedQuotes.length})
            </p>

            {savedQuotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs bg-[#0b1323] rounded-xl border border-[#1e2d4a]">
                No hay cotizaciones guardadas en este navegador todavía.
              </div>
            ) : (
              savedQuotes.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1323] border border-[#25395c] hover:border-[#E5A900]/50 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 transition"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#E5A900] text-sm">{q.folio}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {q.fecha}
                      </span>
                    </div>
                    <p className="text-xs text-gray-200 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{q.unidad} {q.modelo ? `(${q.modelo})` : ''} - Placas: {q.placas || '—'}</span>
                    </p>
                    {q.cliente && (
                      <p className="text-[11px] text-gray-400">Cliente: {q.cliente}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLoadQuote(q)}
                      className="flex items-center gap-1 bg-[#1a2d4d] hover:bg-[#253f6c] text-[#E5A900] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E5A900]/30 transition"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Cargar</span>
                    </button>
                    <button
                      onClick={() => onDeleteQuote(q.folio)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-950/40 transition"
                      title="Eliminar del historial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0b1323] border-t border-[#25395c] p-3 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
