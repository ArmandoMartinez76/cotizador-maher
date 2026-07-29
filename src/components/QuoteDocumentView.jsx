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
    <div className="document-preview-container flex justify-center p-1 sm:p-6 bg-[#09101f] min-h-full w-full">
      {/* Mobile Auto-Fit Scaler Wrapper */}
      <div className="w-full flex justify-center py-1">
        
        {/* Printable Sheet (Standard A4 dimensions: 794px width x 1123px height at 96 DPI) */}
        <div
          ref={documentRef}
          id="cotizacion-maher-paper"
          className="document-paper mobile-paper-scaler shadow-2xl rounded-sm flex flex-col justify-between text-left font-['Inter'] relative select-text shrink-0"
          style={{
            width: '794px',
            minHeight: '1123px',
            padding: '40px 44px',
            backgroundColor: '#ffffff',
            color: '#091A33',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* HEADER SECTION */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: '2.5px solid #091A33' }}>
              
              {/* Logo Maher (Original Slanted Typography + Spaced Yellow Line) */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span 
                    className="font-['Montserrat']" 
                    style={{ 
                      fontSize: '44px', 
                      fontWeight: 900, 
                      fontStyle: 'italic',
                      color: '#091A33', 
                      lineHeight: 1, 
                      letterSpacing: '0.01em',
                      display: 'inline-block'
                    }}
                  >
                    MAHER
                  </span>
                </div>
                
                {/* Spaced Solid Yellow Underline */}
                <div style={{ height: '4px', backgroundColor: '#E5A900', width: '100%', marginTop: '8px', marginBottom: '6px' }}></div>

                <span 
                  className="font-['Montserrat'] font-extrabold uppercase" 
                  style={{ fontSize: '10.5px', letterSpacing: '0.24em', color: '#091A33' }}
                >
                  {quote.tallerSubtitulo || "MECÁNICA ESPECIALIZADA"}
                </span>
              </div>

              {/* Header Right: Cotización & Folio */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h2 className="font-['Montserrat'] font-black uppercase" style={{ fontSize: '26px', letterSpacing: '0.1em', color: '#091A33', margin: 0 }}>
                  COTIZACIÓN
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px', border: '1.5px solid #091A33', borderRadius: '4px', overflow: 'hidden' }}>
                  <span style={{ backgroundColor: '#091A33', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FOLIO:
                  </span>
                  <span style={{ backgroundColor: '#EEF2F7', color: '#091A33', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', fontFamily: 'monospace' }}>
                    {quote.folio || "CM-250728-01"}
                  </span>
                </div>

                <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: '600', color: '#091A33' }}>
                  FECHA: <span style={{ fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', marginLeft: '4px' }}>{quote.fecha}</span>
                </div>
              </div>
            </div>

            {/* DATOS DE LA UNIDAD */}
            <div>
              <h3 className="font-['Montserrat'] font-bold uppercase" style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#091A33', marginBottom: '6px' }}>
                DATOS DE LA UNIDAD
              </h3>

              <div style={{ backgroundColor: '#EEF2F7', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '14px', fontSize: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', rowGap: '10px', columnGap: '16px' }}>
                  {/* Row 1 */}
                  <div style={{ gridColumn: 'span 5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 'bold', color: '#091A33', fontSize: '11px', textTransform: 'uppercase' }}>CLIENTE:</span>
                    <span style={{ fontWeight: '600', color: '#000000', textTransform: 'uppercase', flex: 1, borderBottom: '1px solid #94A3B8', minHeight: '18px' }}>
                      {quote.cliente || ""}
                    </span>
                  </div>

                  <div style={{ gridColumn: 'span 4', borderLeft: '1px solid #CBD5E1', paddingLeft: '14px' }}>
                    <span style={{ fontWeight: 'bold', color: '#5A6E85', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>UNIDAD:</span>
                    <span style={{ fontWeight: '900', color: '#091A33', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      {quote.unidad || "—"}
                    </span>
                  </div>

                  <div style={{ gridColumn: 'span 3', borderLeft: '1px solid #CBD5E1', paddingLeft: '14px' }}>
                    <span style={{ fontWeight: 'bold', color: '#5A6E85', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>MODELO:</span>
                    <span style={{ fontWeight: '900', color: '#091A33', fontSize: '12px', textTransform: 'uppercase' }}>
                      {quote.modelo || "—"}
                    </span>
                  </div>

                  {/* Row 2 divider */}
                  <div style={{ gridColumn: 'span 12', borderTop: '1px solid #CBD5E1', margin: '2px 0' }}></div>

                  {/* Row 2 */}
                  <div style={{ gridColumn: 'span 5' }}>
                    <span style={{ fontWeight: 'bold', color: '#5A6E85', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>PLACAS:</span>
                    <span style={{ fontWeight: '900', color: '#091A33', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                      {quote.placas || "—"}
                    </span>
                  </div>

                  <div style={{ gridColumn: 'span 4', borderLeft: '1px solid #CBD5E1', paddingLeft: '14px' }}>
                    <span style={{ fontWeight: 'bold', color: '#5A6E85', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>VIN / NO. DE SERIE:</span>
                    <span style={{ fontWeight: 'bold', color: '#091A33', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                      {quote.vin || "—"}
                    </span>
                  </div>

                  <div style={{ gridColumn: 'span 3', borderLeft: '1px solid #CBD5E1', paddingLeft: '14px' }}>
                    <span style={{ fontWeight: 'bold', color: '#5A6E85', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>KILOMETRAJE:</span>
                    <span style={{ fontWeight: 'bold', color: '#091A33', fontSize: '12px', textTransform: 'uppercase' }}>
                      {quote.kilometraje || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLA DE CONCEPTOS E IMPORTES */}
            <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#091A33', color: '#ffffff', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'center', width: '10%', borderRight: '1px solid #1E304B' }}>CANT.</th>
                    <th style={{ padding: '8px 12px', width: '35%', borderRight: '1px solid #1E304B' }}>CONCEPTO</th>
                    <th style={{ padding: '8px 12px', width: '40%', borderRight: '1px solid #1E304B' }}>DESCRIPCIÓN</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', width: '15%' }}>IMPORTE</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item, idx) => (
                    <tr key={item.id || idx} style={{ borderTop: idx > 0 ? '1px solid #CBD5E1' : 'none' }}>
                      <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 'bold', verticalAlign: 'top', color: '#000000', borderRight: '1px solid #CBD5E1' }}>
                        {item.cant}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: '900', verticalAlign: 'top', textTransform: 'uppercase', color: '#091A33', borderRight: '1px solid #CBD5E1' }}>
                        {item.concepto}
                      </td>
                      <td style={{ padding: '10px 12px', verticalAlign: 'top', fontSize: '11px', lineHeight: '1.4', color: '#1F2937', borderRight: '1px solid #CBD5E1' }}>
                        {item.descripcion}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 'bold', verticalAlign: 'top', fontFamily: 'monospace', color: '#000000' }}>
                        {formatMoney(item.importe)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BLOQUE DE TOTALES */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '48%', border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 16px', backgroundColor: '#EEF2F7', borderBottom: '1px solid #CBD5E1' }}>
                  <span style={{ fontWeight: 'bold', color: '#091A33', letterSpacing: '0.05em' }}>SUBTOTAL</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000' }}>{formatMoney(subtotal)}</span>
                </div>

                {quote.incluirIva && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 16px', backgroundColor: '#EEF2F7', borderBottom: '1px solid #CBD5E1' }}>
                    <span style={{ fontWeight: 'bold', color: '#091A33', letterSpacing: '0.05em' }}>IVA {quote.tasaIva}%</span>
                    <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000' }}>{formatMoney(iva)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: '#091A33', color: '#ffffff' }}>
                  <span className="font-['Montserrat']" style={{ fontWeight: '900', fontSize: '16px', letterSpacing: '0.1em' }}>TOTAL</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: '900', fontSize: '20px', fontFamily: 'monospace', lineHeight: 1 }}>
                      {formatMoney(total)}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D1D5DB' }}>MXN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2 COLUMNAS: DIAGNÓSTICO & CÓDIGOS ACTIVOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '4px' }}>
              {/* CARD DIAGNÓSTICO */}
              <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
                <div className="font-['Montserrat']" style={{ backgroundColor: '#091A33', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5A900' }}>
                  DIAGNÓSTICO
                </div>
                <div style={{ padding: '12px', flex: 1, fontSize: '11px', lineHeight: '1.45', color: '#1F2937' }}>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0 }}>
                    {quote.diagnostico.map((diag, idx) => (
                      <li key={idx} style={{ marginBottom: '4px', fontWeight: '500' }}>
                        {diag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CARD CÓDIGOS ACTIVOS */}
              <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
                <div className="font-['Montserrat']" style={{ backgroundColor: '#091A33', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5A900' }}>
                  CÓDIGOS ACTIVOS
                </div>
                <div style={{ padding: 0, flex: 1, backgroundColor: '#ffffff' }}>
                  <table style={{ width: '100%', textAlign: 'left', fontSize: '11px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#EEF2F7', color: '#091A33', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', borderBottom: '1px solid #CBD5E1' }}>
                        <th style={{ padding: '6px 10px', width: '30%', borderRight: '1px solid #CBD5E1' }}>CÓDIGO</th>
                        <th style={{ padding: '6px 10px' }}>DESCRIPCIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quote.codigosActivos.map((dtc, idx) => (
                        <tr key={idx} style={{ borderTop: idx > 0 ? '1px solid #E2E8F0' : 'none' }}>
                          <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 'bold', color: '#091A33', borderRight: '1px solid #CBD5E1', verticalAlign: 'top' }}>
                            {dtc.codigo}
                          </td>
                          <td style={{ padding: '6px 10px', color: '#1F2937', lineHeight: '1.3', verticalAlign: 'top', fontWeight: '500' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '4px' }}>
              {/* CARD INCLUYE */}
              <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
                <div className="font-['Montserrat']" style={{ backgroundColor: '#091A33', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5A900' }}>
                  INCLUYE
                </div>
                <div style={{ padding: '12px', flex: 1, fontSize: '11px', lineHeight: '1.45', color: '#1F2937' }}>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                    {quote.incluye.map((inc, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px', fontWeight: '500' }}>
                        <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000' }}>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CARD OBSERVACIONES */}
              <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
                <div className="font-['Montserrat']" style={{ backgroundColor: '#091A33', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5A900' }}>
                  OBSERVACIONES
                </div>
                <div style={{ padding: '12px', flex: 1, fontSize: '11px', lineHeight: '1.45', color: '#1F2937' }}>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0 }}>
                    {quote.observaciones.map((obs, idx) => (
                      <li key={idx} style={{ marginBottom: '4px', fontWeight: '500' }}>
                        {obs}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PIE DE PÁGINA: CONDICIONES & FIRMA */}
            <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '16px', alignItems: 'flex-end', paddingTop: '6px' }}>
              {/* Left: Condiciones Comerciales */}
              <div style={{ backgroundColor: '#EEF2F7', borderLeft: '5px solid #E5A900', borderTop: '1px solid #CBD5E1', borderRight: '1px solid #CBD5E1', borderBottom: '1px solid #CBD5E1', padding: '10px 14px', borderRadius: '0 6px 6px 0', fontSize: '11px' }}>
                <h4 className="font-['Montserrat']" style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em', color: '#091A33', margin: '0 0 4px 0' }}>
                  CONDICIONES COMERCIALES
                </h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0, color: '#1F2937', fontWeight: '500' }}>
                  {quote.condiciones.map((cond, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{cond}</li>
                  ))}
                </ul>
              </div>

              {/* Right: Autorización del Cliente */}
              <div style={{ textAlign: 'center', paddingTop: '24px' }}>
                <div style={{ borderBottom: '1px solid #94A3B8', width: '80%', margin: '0 auto 6px auto' }}></div>
                <span className="font-['Montserrat']" style={{ fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#091A33' }}>
                  AUTORIZACIÓN DEL CLIENTE
                </span>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR SLOGAN */}
          <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '12px', marginTop: '16px', textAlign: 'center' }}>
            <span className="font-['Montserrat']" style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#091A33' }}>
              {quote.slogan || "CALIDAD  |  CONFIANZA  |  RESULTADOS"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
