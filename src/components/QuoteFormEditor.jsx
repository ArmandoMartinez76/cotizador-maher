import React, { useState } from 'react';
import { 
  Car, User, FileSpreadsheet, AlertTriangle, CheckSquare, 
  FileText, Plus, Trash2, Sparkles, DollarSign, ShieldCheck, CheckCircle2, ChevronRight
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

  // List item helpers
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

  // Quick total calculation for live sticky footer
  const subtotal = quote.items.reduce((acc, item) => acc + (parseFloat(item.importe) || 0), 0);
  const tasa = quote.incluirIva ? (parseFloat(quote.tasaIva) || 0) : 0;
  const iva = subtotal * (tasa / 100);
  const total = subtotal + iva;

  const formatMoney = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

  return (
    <div className="no-print glass-panel-master rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10 w-full transition-all duration-300">
      
      {/* UI/UX Masterpiece Stepper Tab Navigation */}
      <div className="bg-[#050b18]/90 border-b border-white/10 p-3 sm:p-4">
        <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
          
          <button
            type="button"
            onClick={() => setActiveTab('vehiculo')}
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 cursor-pointer ${
              activeTab === 'vehiculo'
                ? 'bg-gradient-to-r from-[#172b4c] via-[#10203a] to-[#091A33] text-[#E5A900] border border-[#E5A900]/60 shadow-lg shadow-amber-950/40 glow-badge-gold'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${activeTab === 'vehiculo' ? 'bg-[#E5A900] text-[#091A33]' : 'bg-slate-800 text-slate-400'}`}>
              1
            </div>
            <Car className="w-4 h-4 text-[#E5A900]" />
            <span>Vehículo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conceptos')}
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 cursor-pointer ${
              activeTab === 'conceptos'
                ? 'bg-gradient-to-r from-[#172b4c] via-[#10203a] to-[#091A33] text-[#E5A900] border border-[#E5A900]/60 shadow-lg shadow-amber-950/40 glow-badge-gold'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${activeTab === 'conceptos' ? 'bg-[#E5A900] text-[#091A33]' : 'bg-slate-800 text-slate-400'}`}>
              2
            </div>
            <FileSpreadsheet className="w-4 h-4 text-[#E5A900]" />
            <span>Precios ({quote.items.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('diagnostico')}
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 cursor-pointer ${
              activeTab === 'diagnostico'
                ? 'bg-gradient-to-r from-[#172b4c] via-[#10203a] to-[#091A33] text-[#E5A900] border border-[#E5A900]/60 shadow-lg shadow-amber-950/40 glow-badge-gold'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${activeTab === 'diagnostico' ? 'bg-[#E5A900] text-[#091A33]' : 'bg-slate-800 text-slate-400'}`}>
              3
            </div>
            <AlertTriangle className="w-4 h-4 text-[#E5A900]" />
            <span>Diagnóstico</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('condiciones')}
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 cursor-pointer ${
              activeTab === 'condiciones'
                ? 'bg-gradient-to-r from-[#172b4c] via-[#10203a] to-[#091A33] text-[#E5A900] border border-[#E5A900]/60 shadow-lg shadow-amber-950/40 glow-badge-gold'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${activeTab === 'condiciones' ? 'bg-[#E5A900] text-[#091A33]' : 'bg-slate-800 text-slate-400'}`}>
              4
            </div>
            <CheckSquare className="w-4 h-4 text-[#E5A900]" />
            <span>Notas</span>
          </button>

        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-5 sm:p-7 space-y-6">
        
        {/* STEP 1: VEHÍCULO & CLIENTE */}
        {activeTab === 'vehiculo' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Control & Folio Card */}
            <div className="glass-card-master p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-black text-[#E5A900] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Control de Folio & Emisión
                </h3>
                <span className="text-[10px] bg-[#E5A900]/20 text-[#E5A900] px-2.5 py-1 rounded-full border border-[#E5A900]/30 font-extrabold uppercase">
                  N° {quote.folio}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Folio de Cotización</label>
                  <input
                    type="text"
                    value={quote.folio}
                    onChange={(e) => updateField('folio', e.target.value)}
                    className="w-full glass-input-master font-mono font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Fecha de Emisión</label>
                  <input
                    type="text"
                    value={quote.fecha}
                    onChange={(e) => updateField('fecha', e.target.value)}
                    className="w-full glass-input-master font-semibold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle & Client Card */}
            <div className="glass-card-master p-5 sm:p-6 space-y-5">
              <h3 className="text-xs sm:text-sm font-black text-[#E5A900] uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                Información del Cliente & Unidad
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Nombre del Cliente / Razón Social</label>
                  <input
                    type="text"
                    value={quote.cliente}
                    onChange={(e) => updateField('cliente', e.target.value)}
                    className="w-full glass-input-master text-sm font-medium"
                    placeholder="Nombre completo del cliente o empresa"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Unidad (Marca y Submarca)</label>
                    <input
                      type="text"
                      value={quote.unidad}
                      onChange={(e) => updateField('unidad', e.target.value)}
                      className="w-full glass-input-master text-sm font-black uppercase"
                      placeholder="VOLKSWAGEN SAVEIRO"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Modelo (Año)</label>
                    <input
                      type="text"
                      value={quote.modelo}
                      onChange={(e) => updateField('modelo', e.target.value)}
                      className="w-full glass-input-master text-sm font-bold"
                      placeholder="2015"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Placas</label>
                    <input
                      type="text"
                      value={quote.placas}
                      onChange={(e) => updateField('placas', e.target.value)}
                      className="w-full glass-input-master text-sm font-mono uppercase font-black"
                      placeholder="HX-9350-A"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">VIN / Número de Serie</label>
                    <input
                      type="text"
                      value={quote.vin}
                      onChange={(e) => updateField('vin', e.target.value)}
                      className="w-full glass-input-master text-sm font-mono uppercase"
                      placeholder="9BWKB05U5XP056838"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Kilometraje</label>
                    <input
                      type="text"
                      value={quote.kilometraje}
                      onChange={(e) => updateField('kilometraje', e.target.value)}
                      className="w-full glass-input-master text-sm font-semibold"
                      placeholder="—"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONCEPTOS Y PRECIOS */}
        {activeTab === 'conceptos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs sm:text-sm font-black text-[#E5A900] uppercase tracking-wider flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Servicios, Refacciones & Manos de Obra
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Agrega los conceptos desglosados para la cotización</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowServicePresets(!showServicePresets)}
                  className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-[#E5A900] px-3.5 py-2.5 rounded-2xl border border-[#E5A900]/40 transition cursor-pointer font-bold shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Catálogo de Presets</span>
                </button>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-2xl font-black transition cursor-pointer active:scale-95 shadow-lg shadow-emerald-950/50 glow-badge-[#10B981]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Agregar Concepto</span>
                </button>
              </div>
            </div>

            {/* Presets Modal Dropdown */}
            {showServicePresets && (
              <div className="glass-card-master border border-[#E5A900]/50 p-5 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-black text-[#E5A900]">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E5A900]" />
                    Insertar Servicio Frecuente (1-Clic)
                  </span>
                  <button type="button" onClick={() => setShowServicePresets(false)} className="text-slate-400 hover:text-white p-1">✕</button>
                </div>
                <div className="grid grid-cols-1 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {SERVICE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addPresetService(preset)}
                      className="text-left bg-[#081224] hover:bg-[#122442] p-3.5 rounded-2xl text-xs flex justify-between items-center transition border border-slate-700/80 cursor-pointer group"
                    >
                      <div>
                        <div className="font-extrabold text-slate-100 text-sm group-hover:text-[#E5A900] transition-colors">{preset.concepto}</div>
                        <div className="text-xs text-slate-400 leading-snug mt-0.5">{preset.descripcion}</div>
                      </div>
                      <div className="font-black text-emerald-400 font-mono text-sm ml-3 shrink-0 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
                        {formatMoney(preset.importe)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Item Cards */}
            <div className="space-y-4">
              {quote.items.map((item, idx) => (
                <div key={item.id || idx} className="glass-card-master p-5 space-y-4 relative border border-slate-700/80">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-black text-[#E5A900] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-[#E5A900]/20 text-[#E5A900] flex items-center justify-center text-[11px] font-black">
                        #{idx + 1}
                      </span>
                      Línea de Cotización
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-xl hover:bg-red-950/50 transition cursor-pointer"
                      title="Eliminar concepto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Cant.</label>
                      <input
                        type="number"
                        min="1"
                        value={item.cant}
                        onChange={(e) => updateItem(idx, 'cant', parseFloat(e.target.value) || 1)}
                        className="w-full glass-input-master font-bold text-center"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Título del Concepto</label>
                      <input
                        type="text"
                        value={item.concepto}
                        onChange={(e) => updateItem(idx, 'concepto', e.target.value)}
                        className="w-full glass-input-master font-black uppercase text-sm"
                        placeholder="REFACCIONES Y REPARACIÓN"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Importe ($ MXN)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.importe}
                        onChange={(e) => updateItem(idx, 'importe', parseFloat(e.target.value) || 0)}
                        className="w-full glass-input-master text-emerald-400 font-black font-mono text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Descripción Detallada</label>
                    <textarea
                      rows="2"
                      value={item.descripcion}
                      onChange={(e) => updateItem(idx, 'descripcion', e.target.value)}
                      className="w-full glass-input-master text-xs text-slate-200"
                      placeholder="Desglose de refacciones o maniobras realizadas..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* IVA Selector Card */}
            <div className="glass-card-master p-4 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={quote.incluirIva}
                  onChange={(e) => updateField('incluirIva', e.target.checked)}
                  className="w-5 h-5 rounded-lg border-slate-700 text-[#E5A900] focus:ring-[#E5A900]"
                />
                <span>Incluir Impuesto IVA ({quote.tasaIva}%)</span>
              </label>

              {quote.incluirIva && (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <span>Tasa:</span>
                  <input
                    type="number"
                    value={quote.tasaIva}
                    onChange={(e) => updateField('tasaIva', parseFloat(e.target.value) || 0)}
                    className="w-16 glass-input-master px-2 py-1.5 text-center font-bold"
                  />
                  <span>%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: DIAGNÓSTICO Y OBD-II */}
        {activeTab === 'diagnostico' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-[#E5A900] uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Puntos de Diagnóstico Técnico
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem('diagnostico', '')}
                className="text-xs bg-slate-800 text-[#E5A900] px-3.5 py-2 rounded-xl border border-[#E5A900]/30 transition cursor-pointer font-bold"
              >
                + Agregar Punto
              </button>
            </div>

            <div className="space-y-3">
              {quote.diagnostico.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-[#E5A900] font-black text-base">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('diagnostico', idx, e.target.value)}
                    className="flex-1 glass-input-master text-xs sm:text-sm text-white"
                    placeholder="Hallazgo técnico o medición..."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('diagnostico', idx)}
                    className="text-slate-400 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <h3 className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Car className="w-4 h-4" />
                Códigos OBD-II Registrados
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowOBDPresets(!showOBDPresets)}
                  className="text-xs bg-cyan-950 text-cyan-300 px-3 py-2 rounded-xl border border-cyan-800 font-bold transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Catálogo
                </button>
                <button
                  type="button"
                  onClick={() => addDTC({ codigo: "", descripcion: "" })}
                  className="text-xs bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-2 rounded-xl font-bold transition cursor-pointer"
                >
                  + Código
                </button>
              </div>
            </div>

            {showOBDPresets && (
              <div className="glass-card-master border border-cyan-700/60 p-4 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-black text-cyan-400">
                  <span>Catálogo Frecuente de Fórmulas OBD-II:</span>
                  <button type="button" onClick={() => setShowOBDPresets(false)} className="text-slate-400 hover:text-white p-1">✕</button>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                  {COMMON_DTC_CODES.map((codeObj, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addDTC(codeObj)}
                      className="text-left bg-[#081224] hover:bg-[#122646] p-3 rounded-xl text-xs flex items-center justify-between border border-slate-700/80 cursor-pointer"
                    >
                      <span className="font-bold text-cyan-400 font-mono text-sm">{codeObj.codigo}</span>
                      <span className="text-xs text-slate-300 truncate max-w-[240px] ml-3">{codeObj.descripcion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {quote.codigosActivos.map((dtc, idx) => (
                <div key={idx} className="glass-card-master p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="text"
                    value={dtc.codigo}
                    onChange={(e) => updateDTC(idx, 'codigo', e.target.value)}
                    className="w-28 glass-input-master text-xs sm:text-sm text-cyan-400 font-black uppercase font-mono"
                    placeholder="P0202"
                  />
                  <input
                    type="text"
                    value={dtc.descripcion}
                    onChange={(e) => updateDTC(idx, 'descripcion', e.target.value)}
                    className="flex-1 glass-input-master text-xs sm:text-sm text-slate-200"
                    placeholder="Descripción de la falla..."
                  />
                  <button
                    type="button"
                    onClick={() => removeDTC(idx)}
                    className="text-slate-400 hover:text-red-400 p-2 self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: INCLUYE Y NOTAS */}
        {activeTab === 'condiciones' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Sección "Incluye" (Checklist ✓)
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem('incluye', '')}
                className="text-xs bg-emerald-950 text-emerald-300 px-3.5 py-2 rounded-xl border border-emerald-800 font-bold transition cursor-pointer"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-3">
              {quote.incluye.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-black text-base">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('incluye', idx, e.target.value)}
                    className="flex-1 glass-input-master text-xs sm:text-sm text-white"
                    placeholder="Servicio o garantía incluida..."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('incluye', idx)}
                    className="text-slate-400 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <h3 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Observaciones & Notas Generales
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem('observaciones', '')}
                className="text-xs bg-amber-950 text-amber-300 px-3.5 py-2 rounded-xl border border-amber-800 font-bold transition cursor-pointer"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-3">
              {quote.observaciones.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-amber-400 font-black text-base">•</span>
                  <textarea
                    rows="2"
                    value={item}
                    onChange={(e) => updateArrayItem('observaciones', idx, e.target.value)}
                    className="flex-1 glass-input-master text-xs sm:text-sm text-white"
                    placeholder="Cláusula o recomendación técnica..."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('observaciones', idx)}
                    className="text-slate-400 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <h3 className="text-xs sm:text-sm font-black text-[#E5A900] uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Condiciones Comerciales
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem('condiciones', '')}
                className="text-xs bg-slate-800 text-[#E5A900] px-3.5 py-2 rounded-xl border border-[#E5A900]/30 font-bold transition cursor-pointer"
              >
                + Condición
              </button>
            </div>

            <div className="space-y-3">
              {quote.condiciones.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-[#E5A900] font-black text-base">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('condiciones', idx, e.target.value)}
                    className="flex-1 glass-input-master text-xs sm:text-sm text-white"
                    placeholder="Vigencia, Forma de pago, etc."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('condiciones', idx)}
                    className="text-slate-400 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live Total Card Summary Footer */}
      <div className="bg-[#050b18]/95 border-t border-white/10 p-4 px-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Monto Total Cotizado</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono leading-none">
            {formatMoney(total)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            {quote.items.length} {quote.items.length === 1 ? 'concepto' : 'conceptos'}
          </span>
          <button
            type="button"
            onClick={() => {
              if (activeTab === 'vehiculo') setActiveTab('conceptos');
              else if (activeTab === 'conceptos') setActiveTab('diagnostico');
              else if (activeTab === 'diagnostico') setActiveTab('condiciones');
              else setActiveTab('vehiculo');
            }}
            className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-[#172b4c] to-[#091A33] text-[#E5A900] px-4 py-2.5 rounded-2xl border border-[#E5A900]/40 font-bold transition cursor-pointer hover:brightness-110"
          >
            <span>Siguiente Paso</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
