import React, { useState } from 'react';
import { 
  Car, User, FileSpreadsheet, AlertTriangle, CheckSquare, 
  FileText, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, DollarSign
} from 'lucide-react';
import { COMMON_DTC_CODES, SERVICE_PRESETS } from '../data/presets';

export default function QuoteFormEditor({ quote, setQuote }) {
  const [activeTab, setActiveTab] = useState('vehiculo');
  const [showOBDPresets, setShowOBDPresets] = useState(false);
  const [showServicePresets, setShowServicePresets] = useState(false);

  // Field update helpers
  const updateField = (field, value) => {
    setQuote(prev => ({ ...prev, [field]: value }));
  };

  // Item helpers
  const addItem = () => {
    setQuote(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          cant: 1,
          concepto: "",
          descripcion: "",
          importe: 0
        }
      ]
    }));
  };

  const addPresetService = (preset) => {
    setQuote(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          cant: 1,
          concepto: preset.concepto,
          descripcion: preset.descripcion,
          importe: preset.importe
        }
      ]
    }));
    setShowServicePresets(false);
  };

  const updateItem = (index, field, value) => {
    setQuote(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const removeItem = (index) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // List item helpers (Diagnóstico, Incluye, Observaciones, Condiciones)
  const addArrayItem = (field, defaultValue = "") => {
    setQuote(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setQuote(prev => {
      const newArr = [...prev[field]];
      newArr[index] = value;
      return { ...prev, [field]: newArr };
    });
  };

  const removeArrayItem = (field, index) => {
    setQuote(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // OBD-II Code Helpers
  const addDTC = (codeObj) => {
    setQuote(prev => ({
      ...prev,
      codigosActivos: [...prev.codigosActivos, codeObj]
    }));
    setShowOBDPresets(false);
  };

  const updateDTC = (index, key, value) => {
    setQuote(prev => {
      const newDTC = [...prev.codigosActivos];
      newDTC[index] = { ...newDTC[index], [key]: value };
      return { ...prev, codigosActivos: newDTC };
    });
  };

  const removeDTC = (index) => {
    setQuote(prev => ({
      ...prev,
      codigosActivos: prev.codigosActivos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="no-print bg-[#0f192c] border border-[#1e2d4a] rounded-xl overflow-hidden shadow-2xl flex flex-col h-full max-h-[calc(100vh-80px)]">
      {/* Editor Tabs Header */}
      <div className="bg-[#0b1323] border-b border-[#1e2d4a] p-2 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('vehiculo')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'vehiculo'
              ? 'bg-[#1a2d4d] text-[#E5A900] border border-[#E5A900]/40'
              : 'text-gray-400 hover:bg-[#16233b] hover:text-gray-200'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Vehículo & Cliente</span>
        </button>

        <button
          onClick={() => setActiveTab('conceptos')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'conceptos'
              ? 'bg-[#1a2d4d] text-[#E5A900] border border-[#E5A900]/40'
              : 'text-gray-400 hover:bg-[#16233b] hover:text-gray-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Conceptos ({quote.items.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnostico')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'diagnostico'
              ? 'bg-[#1a2d4d] text-[#E5A900] border border-[#E5A900]/40'
              : 'text-gray-400 hover:bg-[#16233b] hover:text-gray-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Diagnóstico & OBD-II</span>
        </button>

        <button
          onClick={() => setActiveTab('condiciones')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'condiciones'
              ? 'bg-[#1a2d4d] text-[#E5A900] border border-[#E5A900]/40'
              : 'text-gray-400 hover:bg-[#16233b] hover:text-gray-200'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Incluye & Notas</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 overflow-y-auto flex-1 space-y-5">
        
        {/* TAB 1: VEHÍCULO & CLIENTE */}
        {activeTab === 'vehiculo' && (
          <div className="space-y-4">
            <div className="border-b border-[#1e2d4a] pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E5A900]" />
                Datos de Control y Folio
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Folio de Cotización</label>
                <input
                  type="text"
                  value={quote.folio}
                  onChange={(e) => updateField('folio', e.target.value)}
                  className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                  placeholder="CM-250728-01"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Fecha de Emisión</label>
                <input
                  type="text"
                  value={quote.fecha}
                  onChange={(e) => updateField('fecha', e.target.value)}
                  className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                  placeholder="28 DE JULIO DE 2026"
                />
              </div>
            </div>

            <div className="border-b border-[#1e2d4a] pt-3 pb-2">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <User className="w-4 h-4 text-[#E5A900]" />
                Datos del Cliente y Unidad
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nombre del Cliente</label>
                <input
                  type="text"
                  value={quote.cliente}
                  onChange={(e) => updateField('cliente', e.target.value)}
                  className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                  placeholder="Nombre del cliente o empresa"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Unidad (Marca y Modelo)</label>
                  <input
                    type="text"
                    value={quote.unidad}
                    onChange={(e) => updateField('unidad', e.target.value)}
                    className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="VOLKSWAGEN SAVEIRO"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Modelo (Año)</label>
                  <input
                    type="text"
                    value={quote.modelo}
                    onChange={(e) => updateField('modelo', e.target.value)}
                    className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="2015"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Placas</label>
                  <input
                    type="text"
                    value={quote.placas}
                    onChange={(e) => updateField('placas', e.target.value)}
                    className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="HX-9350-A"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">VIN / No. de Serie</label>
                  <input
                    type="text"
                    value={quote.vin}
                    onChange={(e) => updateField('vin', e.target.value)}
                    className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="9BWKB05U5XP056838"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Kilometraje</label>
                  <input
                    type="text"
                    value={quote.kilometraje}
                    onChange={(e) => updateField('kilometraje', e.target.value)}
                    className="w-full bg-[#0b1323] border border-[#25395c] rounded-lg px-3 py-2 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="— o 125,000 km"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONCEPTOS Y PRECIOS */}
        {activeTab === 'conceptos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e2d4a] pb-2">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#E5A900]" />
                Líneas de Servicios y Refacciones
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowServicePresets(!showServicePresets)}
                  className="flex items-center gap-1 text-xs bg-[#1a2d4d] hover:bg-[#233a61] text-[#E5A900] px-2.5 py-1 rounded border border-[#E5A900]/30 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cargar Preset</span>
                </button>
                <button
                  onClick={addItem}
                  className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Fila</span>
                </button>
              </div>
            </div>

            {/* Preset Selector Dropdown */}
            {showServicePresets && (
              <div className="bg-[#0b1323] border border-[#E5A900]/40 rounded-xl p-3 space-y-2">
                <p className="text-xs font-bold text-[#E5A900] flex items-center justify-between">
                  <span>Seleccionar plantilla rápida de servicio:</span>
                  <button onClick={() => setShowServicePresets(false)} className="text-gray-400 hover:text-white">✕</button>
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {SERVICE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => addPresetService(preset)}
                      className="text-left bg-[#15233c] hover:bg-[#1f3458] p-2 rounded text-xs flex justify-between items-center transition border border-[#23385c]"
                    >
                      <div>
                        <div className="font-bold text-gray-200">{preset.concepto}</div>
                        <div className="text-[11px] text-gray-400">{preset.descripcion}</div>
                      </div>
                      <div className="font-bold text-[#E5A900] text-xs ml-2">${preset.importe.toLocaleString('es-MX')}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Items Table */}
            <div className="space-y-3">
              {quote.items.map((item, idx) => (
                <div key={item.id || idx} className="bg-[#0b1323] border border-[#25395c] rounded-xl p-3 relative group space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#E5A900]">Concepto #{idx + 1}</span>
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition"
                      title="Eliminar concepto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-[10px] text-gray-400 mb-0.5">Cant.</label>
                      <input
                        type="number"
                        min="1"
                        value={item.cant}
                        onChange={(e) => updateItem(idx, 'cant', parseFloat(e.target.value) || 1)}
                        className="w-full bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-white font-bold"
                      />
                    </div>
                    <div className="col-span-9 sm:col-span-6">
                      <label className="block text-[10px] text-gray-400 mb-0.5">Título / Concepto</label>
                      <input
                        type="text"
                        value={item.concepto}
                        onChange={(e) => updateItem(idx, 'concepto', e.target.value)}
                        className="w-full bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-white font-bold uppercase"
                        placeholder="REFACCIONES PARA REPARACIÓN"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <label className="block text-[10px] text-gray-400 mb-0.5">Importe ($ MXN)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.importe}
                        onChange={(e) => updateItem(idx, 'importe', parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-0.5">Descripción en detalle</label>
                    <textarea
                      rows="2"
                      value={item.descripcion}
                      onChange={(e) => updateItem(idx, 'descripcion', e.target.value)}
                      className="w-full bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-gray-200"
                      placeholder="Descripción de los trabajos o piezas sustituidas..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* IVA Options */}
            <div className="bg-[#0b1323] border border-[#25395c] rounded-xl p-3 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-300">
                <input
                  type="checkbox"
                  checked={quote.incluirIva}
                  onChange={(e) => updateField('incluirIva', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-[#E5A900] focus:ring-[#E5A900]"
                />
                <span>Incluir IVA ({quote.tasaIva}%)</span>
              </label>

              {quote.incluirIva && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span>Tasa %:</span>
                  <input
                    type="number"
                    value={quote.tasaIva}
                    onChange={(e) => updateField('tasaIva', parseFloat(e.target.value) || 0)}
                    className="w-14 bg-[#15233c] border border-[#2c446e] rounded px-2 py-0.5 text-xs text-white text-center font-bold"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIAGNÓSTICO Y OBD-II */}
        {activeTab === 'diagnostico' && (
          <div className="space-y-4">
            {/* Diagnóstico Section */}
            <div className="border-b border-[#1e2d4a] pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#E5A900]" />
                Puntos de Diagnóstico Técnico
              </h3>
              <button
                onClick={() => addArrayItem('diagnostico', '')}
                className="text-xs bg-[#1a2d4d] hover:bg-[#233a61] text-[#E5A900] px-2 py-1 rounded border border-[#E5A900]/30 transition"
              >
                + Agregar Punto
              </button>
            </div>

            <div className="space-y-2">
              {quote.diagnostico.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#E5A900] font-bold text-xs">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('diagnostico', idx, e.target.value)}
                    className="flex-1 bg-[#0b1323] border border-[#25395c] rounded px-3 py-1.5 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="Escribe el hallazgo detectado..."
                  />
                  <button
                    onClick={() => removeArrayItem('diagnostico', idx)}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* OBD-II DTC Codes */}
            <div className="border-b border-[#1e2d4a] pt-4 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Car className="w-4 h-4 text-cyan-400" />
                Códigos de Falla Activos (OBD-II)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOBDPresets(!showOBDPresets)}
                  className="text-xs bg-[#1a2d4d] text-cyan-300 px-2 py-1 rounded border border-cyan-800 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Catálogo OBD-II
                </button>
                <button
                  onClick={() => addDTC({ codigo: "", descripcion: "" })}
                  className="text-xs bg-cyan-800 hover:bg-cyan-700 text-white px-2 py-1 rounded font-semibold transition"
                >
                  + Código
                </button>
              </div>
            </div>

            {showOBDPresets && (
              <div className="bg-[#0b1323] border border-cyan-700/50 rounded-xl p-3 space-y-2">
                <p className="text-xs font-bold text-cyan-400 flex justify-between">
                  <span>Seleccionar Código OBD-II Frecuente:</span>
                  <button onClick={() => setShowOBDPresets(false)} className="text-gray-400 hover:text-white">✕</button>
                </p>
                <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
                  {COMMON_DTC_CODES.map((codeObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => addDTC(codeObj)}
                      className="text-left bg-[#13223b] hover:bg-[#1a2f52] p-1.5 rounded text-xs flex items-center justify-between border border-[#223759]"
                    >
                      <span className="font-bold text-cyan-400">{codeObj.codigo}</span>
                      <span className="text-[11px] text-gray-300 truncate max-w-[240px]">{codeObj.descripcion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {quote.codigosActivos.map((dtc, idx) => (
                <div key={idx} className="bg-[#0b1323] border border-[#25395c] rounded-lg p-2 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={dtc.codigo}
                    onChange={(e) => updateDTC(idx, 'codigo', e.target.value)}
                    className="w-24 bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-cyan-400 font-bold uppercase"
                    placeholder="P0202"
                  />
                  <input
                    type="text"
                    value={dtc.descripcion}
                    onChange={(e) => updateDTC(idx, 'descripcion', e.target.value)}
                    className="flex-1 bg-[#15233c] border border-[#2c446e] rounded px-2 py-1 text-xs text-gray-200"
                    placeholder="Descripción del fallo o sensor..."
                  />
                  <button
                    onClick={() => removeDTC(idx)}
                    className="text-gray-500 hover:text-red-400 p-1 self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INCLUYE Y NOTAS */}
        {activeTab === 'condiciones' && (
          <div className="space-y-4">
            {/* Sección INCLUYE */}
            <div className="border-b border-[#1e2d4a] pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Sección "Incluye" (Puntos con Palomita ✓)
              </h3>
              <button
                onClick={() => addArrayItem('incluye', '')}
                className="text-xs bg-[#193226] text-emerald-300 px-2 py-1 rounded border border-emerald-800 transition"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-2">
              {quote.incluye.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('incluye', idx, e.target.value)}
                    className="flex-1 bg-[#0b1323] border border-[#25395c] rounded px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Servicio o prueba incluida..."
                  />
                  <button
                    onClick={() => removeArrayItem('incluye', idx)}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Sección OBSERVACIONES */}
            <div className="border-b border-[#1e2d4a] pt-3 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Observaciones y Términos Técnicos
              </h3>
              <button
                onClick={() => addArrayItem('observaciones', '')}
                className="text-xs bg-[#322819] text-amber-300 px-2 py-1 rounded border border-amber-800 transition"
              >
                + Agregar Nota
              </button>
            </div>

            <div className="space-y-2">
              {quote.observaciones.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs">•</span>
                  <textarea
                    rows="2"
                    value={item}
                    onChange={(e) => updateArrayItem('observaciones', idx, e.target.value)}
                    className="flex-1 bg-[#0b1323] border border-[#25395c] rounded px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Cláusula o nota especial..."
                  />
                  <button
                    onClick={() => removeArrayItem('observaciones', idx)}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* CONDICIONES COMERCIALES */}
            <div className="border-b border-[#1e2d4a] pt-3 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#E5A900]" />
                Condiciones Comerciales
              </h3>
              <button
                onClick={() => addArrayItem('condiciones', '')}
                className="text-xs bg-[#1a2d4d] text-[#E5A900] px-2 py-1 rounded border border-[#E5A900]/30 transition"
              >
                + Agregar Condición
              </button>
            </div>

            <div className="space-y-2">
              {quote.condiciones.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#E5A900] font-bold text-xs">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('condiciones', idx, e.target.value)}
                    className="flex-1 bg-[#0b1323] border border-[#25395c] rounded px-3 py-1.5 text-xs text-white focus:border-[#E5A900] focus:outline-none"
                    placeholder="Vigencia, Forma de Pago, etc."
                  />
                  <button
                    onClick={() => removeArrayItem('condiciones', idx)}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
