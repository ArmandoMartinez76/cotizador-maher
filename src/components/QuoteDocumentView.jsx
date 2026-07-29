import React from 'react';

export default function QuoteDocumentView({ quote, documentRef }) {
  // Calculations
  const subtotal = quote.items.reduce((acc, item) => acc + (parseFloat(item.importe) || 0), 0);
  const tasa = quote.incluirIva ? (parseFloat(quote.tasaIva) || 0) : 0;
  const iva = subtotal * (tasa / 100);
  const total = subtotal + iva;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="document-preview-container flex justify-center p-2 sm:p-6 bg-[#09101f] overflow-x-auto min-h-full w-full">
      {/* Printable Sheet (Letter/A4 standard aspect ratio) */}
      <div
        ref={documentRef}
        className="document-paper bg-white text-black w-[210mm] min-h-[297mm] p-[12mm] sm:p-[15mm] shadow-2xl rounded-sm flex flex-col justify-between text-left font-['Inter'] relative select-text"
        style={{ color: '#091A33' }}
      >
        <div className="space-y-4">
          
          {/* HEADER SECTION */}
          <div className="flex justify-between items-start pb-2 border-b border-[#091A33]/30">
            {/* Logo Maher */}
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="font-['Montserrat'] font-black text-4xl sm:text-5xl tracking-tight text-[#091A33] leading-none">
                  MAHER
                </span>
              </div>
              <div className="h-[4px] bg-[#E5A900] w-full my-1"></div>
              <span className="font-['Montserrat'] font-extrabold text-[10px] sm:text-[11px] tracking-[0.24em] text-[#091A33] uppercase">
                {quote.tallerSubtitulo || "MECÁNICA ESPECIALIZADA"}
              </span>
            </div>

            {/* Header Right: Cotización & Folio */}
            <div className="text-right flex flex-col items-end">
              <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl tracking-widest text-[#091A33] uppercase">
                COTIZACIÓN
              </h2>

              <div className="flex items-center mt-1 border border-[#091A33] rounded overflow-hidden shadow-sm">
                <span className="bg-[#091A33] text-white text-[11px] font-bold px-3 py-1 tracking-wider uppercase">
                  FOLIO:
                </span>
                <span className="bg-[#E2E8F0] text-[#091A33] font-bold text-xs px-3 py-1 font-mono">
                  {quote.folio || "CM-250728-01"}
                </span>
              </div>

              <div className="mt-2 text-xs font-semibold text-[#091A33] tracking-wide">
                FECHA: <span className="font-bold text-black uppercase ml-1">{quote.fecha}</span>
              </div>
            </div>
          </div>

          {/* DATOS DE LA UNIDAD */}
          <div>
            <h3 className="font-bold text-xs tracking-wider text-[#091A33] uppercase mb-1 font-['Montserrat']">
              DATOS DE LA UNIDAD
            </h3>

            <div className="bg-[#EEF2F7] border border-[#CBD5E1] rounded-md p-3 text-xs">
              <div className="grid grid-cols-12 gap-y-2 gap-x-4">
                {/* Row 1 */}
                <div className="col-span-12 sm:col-span-5 flex items-center gap-1 border-b border-[#CBD5E1] sm:border-b-0 pb-1 sm:pb-0">
                  <span className="font-bold text-[#091A33] uppercase text-[11px]">CLIENTE:</span>
                  <span className="font-semibold text-black uppercase flex-1 truncate border-b border-gray-400 min-h-[18px]">
                    {quote.cliente || ""}
                  </span>
                </div>

                <div className="col-span-7 sm:col-span-4 border-l border-[#CBD5E1] pl-3">
                  <span className="font-bold text-[#5a6e85] uppercase text-[10px] block">UNIDAD:</span>
                  <span className="font-black text-[#091A33] uppercase text-xs tracking-wide">
                    {quote.unidad || "—"}
                  </span>
                </div>

                <div className="col-span-5 sm:col-span-3 border-l border-[#CBD5E1] pl-3">
                  <span className="font-bold text-[#5a6e85] uppercase text-[10px] block">MODELO:</span>
                  <span className="font-black text-[#091A33] uppercase text-xs">
                    {quote.modelo || "—"}
                  </span>
                </div>

                {/* Row 2 divider */}
                <div className="col-span-12 border-t border-[#CBD5E1] my-0.5"></div>

                {/* Row 2 */}
                <div className="col-span-12 sm:col-span-5">
                  <span className="font-bold text-[#5a6e85] uppercase text-[10px] block">PLACAS:</span>
                  <span className="font-black text-[#091A33] uppercase text-xs font-mono">
                    {quote.placas || "—"}
                  </span>
                </div>

                <div className="col-span-7 sm:col-span-4 border-l border-[#CBD5E1] pl-3">
                  <span className="font-bold text-[#5a6e85] uppercase text-[10px] block">VIN / NO. DE SERIE:</span>
                  <span className="font-bold text-[#091A33] uppercase text-[11px] font-mono tracking-wider">
                    {quote.vin || "—"}
                  </span>
                </div>

                <div className="col-span-5 sm:col-span-3 border-l border-[#CBD5E1] pl-3">
                  <span className="font-bold text-[#5a6e85] uppercase text-[10px] block">KILOMETRAJE:</span>
                  <span className="font-bold text-[#091A33] uppercase text-xs">
                    {quote.kilometraje || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE CONCEPTOS E IMPORTES */}
          <div className="border border-[#CBD5E1] rounded-md overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#091A33] text-white font-bold text-[11px] tracking-wider uppercase">
                  <th className="py-2 px-3 border-r border-[#1E304B] text-center w-[10%]">CANT.</th>
                  <th className="py-2 px-3 border-r border-[#1E304B] w-[35%]">CONCEPTO</th>
                  <th className="py-2 px-3 border-r border-[#1E304B] w-[40%]">DESCRIPCIÓN</th>
                  <th className="py-2 px-3 text-right w-[15%]">IMPORTE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                {quote.items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50">
                    <td className="py-3 px-3 border-r border-[#CBD5E1] text-center font-bold align-top text-black">
                      {item.cant}
                    </td>
                    <td className="py-3 px-3 border-r border-[#CBD5E1] font-extrabold text-[#091A33] align-top uppercase">
                      {item.concepto}
                    </td>
                    <td className="py-3 px-3 border-r border-[#CBD5E1] text-gray-800 align-top text-[11px] leading-snug">
                      {item.descripcion}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-black align-top font-mono">
                      {formatMoney(item.importe)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BLOQUE DE TOTALES */}
          <div className="flex justify-end">
            <div className="w-full sm:w-[48%] border border-[#CBD5E1] rounded-md overflow-hidden text-xs shadow-sm">
              <div className="flex justify-between py-1.5 px-4 bg-[#EEF2F7] border-b border-[#CBD5E1]">
                <span className="font-bold text-[#091A33] tracking-wider">SUBTOTAL</span>
                <span className="font-bold text-black font-mono">{formatMoney(subtotal)}</span>
              </div>

              {quote.incluirIva && (
                <div className="flex justify-between py-1.5 px-4 bg-[#EEF2F7] border-b border-[#CBD5E1]">
                  <span className="font-bold text-[#091A33] tracking-wider">IVA {quote.tasaIva}%</span>
                  <span className="font-bold text-black font-mono">{formatMoney(iva)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2 px-4 bg-[#091A33] text-white">
                <span className="font-black text-base tracking-widest font-['Montserrat']">TOTAL</span>
                <div className="text-right">
                  <span className="font-black text-xl font-mono leading-none">
                    {formatMoney(total)}
                  </span>
                  <span className="text-[10px] font-bold block text-gray-300 uppercase tracking-widest">MXN</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2 COLUMNAS: DIAGNÓSTICO & CÓDIGOS ACTIVOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* CARD DIAGNÓSTICO */}
            <div className="border border-[#CBD5E1] rounded-md overflow-hidden flex flex-col bg-[#F8FAFC]">
              <div className="bg-[#091A33] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider font-['Montserrat'] flex items-center rounded-tr-xl w-[70%]">
                DIAGNÓSTICO
              </div>
              <div className="p-3 flex-1 text-xs text-gray-800 leading-snug">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {quote.diagnostico.map((diag, idx) => (
                    <li key={idx} className="font-medium text-[11px]">
                      {diag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CARD CÓDIGOS ACTIVOS */}
            <div className="border border-[#CBD5E1] rounded-md overflow-hidden flex flex-col bg-[#F8FAFC]">
              <div className="bg-[#091A33] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider font-['Montserrat'] flex items-center rounded-tr-xl w-[70%]">
                CÓDIGOS ACTIVOS
              </div>
              <div className="p-0 flex-1 bg-white">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-[#EEF2F7] border-b border-[#CBD5E1] text-[#091A33] font-bold text-[10px] uppercase">
                      <th className="py-1 px-3 border-r border-[#CBD5E1] w-[30%]">CÓDIGO</th>
                      <th className="py-1 px-3">DESCRIPCIÓN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CBD5E1]">
                    {quote.codigosActivos.map((dtc, idx) => (
                      <tr key={idx}>
                        <td className="py-1.5 px-3 border-r border-[#CBD5E1] font-mono font-bold text-[#091A33] align-top">
                          {dtc.codigo}
                        </td>
                        <td className="py-1.5 px-3 text-gray-800 leading-tight align-top font-medium">
                          {dtc.descripcion}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2 COLUMNAS: INCLUYE & OBSERVACIONES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* CARD INCLUYE */}
            <div className="border border-[#CBD5E1] rounded-md overflow-hidden flex flex-col bg-[#F8FAFC]">
              <div className="bg-[#091A33] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider font-['Montserrat'] flex items-center rounded-tr-xl w-[70%]">
                INCLUYE
              </div>
              <div className="p-3 flex-1 text-xs text-gray-800 leading-snug">
                <ul className="space-y-1">
                  {quote.incluye.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 font-medium text-[11px]">
                      <span className="font-bold text-black font-mono">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CARD OBSERVACIONES */}
            <div className="border border-[#CBD5E1] rounded-md overflow-hidden flex flex-col bg-[#F8FAFC]">
              <div className="bg-[#091A33] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider font-['Montserrat'] flex items-center rounded-tr-xl w-[70%]">
                OBSERVACIONES
              </div>
              <div className="p-3 flex-1 text-xs text-gray-800 leading-snug">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {quote.observaciones.map((obs, idx) => (
                    <li key={idx} className="font-medium text-[11px]">
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* PIE DE PÁGINA: CONDICIONES & FIRMA */}
          <div className="grid grid-cols-12 gap-4 items-end pt-2">
            {/* Left: Condiciones Comerciales */}
            <div className="col-span-12 sm:col-span-7 bg-[#EEF2F7] border-l-[5px] border-[#E5A900] border-y border-r border-[#CBD5E1] p-2.5 text-[11px] rounded-r-md">
              <h4 className="font-bold text-[#091A33] uppercase text-[10px] tracking-wider mb-1 font-['Montserrat']">
                CONDICIONES COMERCIALES
              </h4>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 font-medium">
                {quote.condiciones.map((cond, idx) => (
                  <li key={idx}>{cond}</li>
                ))}
              </ul>
            </div>

            {/* Right: Autorización del Cliente */}
            <div className="col-span-12 sm:col-span-5 text-center pt-6 sm:pt-0">
              <div className="border-b border-gray-400 w-[80%] mx-auto mb-1"></div>
              <span className="font-bold text-[10px] text-[#091A33] uppercase tracking-wider font-['Montserrat']">
                AUTORIZACIÓN DEL CLIENTE
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR SLOGAN */}
        <div className="border-t border-[#CBD5E1] pt-3 mt-4 text-center">
          <span className="font-['Montserrat'] font-bold text-[11px] tracking-[0.25em] text-[#091A33] uppercase">
            {quote.slogan || "CALIDAD  |  CONFIANZA  |  RESULTADOS"}
          </span>
        </div>

      </div>
    </div>
  );
}
