/**
 * @file presets.js
 * @description Catálogo de datos predeterminados, códigos de falla OBD-II, plantillas de servicios y cotización inicial de prueba para MAHER Mecánica Especializada.
 * 
 * @module data/presets
 */

/**
 * Cotización de demostración basada en el documento físico original.
 * Sirve como estado inicial de la aplicación y plantilla de referencia 1:1.
 * 
 * @type {Object}
 */
export const DEFAULT_QUOTE = {
  folio: "CM-250728-01",
  fecha: "28 DE JULIO DE 2026",
  tallerSubtitulo: "MECÁNICA ESPECIALIZADA",
  slogan: "CALIDAD  |  CONFIANZA  |  RESULTADOS",
  estado: "PENDIENTE", // PENDIENTE | APROBADO | CANCELADO
  
  // Datos del Cliente y Vehículo
  cliente: "",
  unidad: "VOLKSWAGEN SAVEIRO",
  modelo: "2015",
  placas: "HX-9350-A",
  vin: "9BWKB05U5XP056838",
  kilometraje: "—",
  
  // Desglose de Servicios y Refacciones
  items: [
    {
      id: "item-1",
      cant: 1,
      concepto: "MANO DE OBRA REPARACIÓN DE MOTOR Y REMPLAZO DE BOMBA DE ACEITE Y RETÉN DE CIGÜEÑAL",
      descripcion: "Desarmado general de motor, diagnóstico interno de presión, reemplazo de bomba de aceite, sellos y retén de cigüeñal con torque especificado por fabricante.",
      importe: 7500.00
    },
    {
      id: "item-2",
      cant: 1,
      concepto: "REFACCIONES PARA REPARACIÓN DE MOTOR",
      descripcion: "Kit de bomba de aceite original VW, retén de cigüeñal en alta temperatura, juego de empaques, aceite sintético 5W-30 y filtro de aceite de alto flujo.",
      importe: 6386.91
    }
  ],

  // Cálculos de Descuento e Impuestos
  descuento: 0, // Monto de descuento en MXN
  incluirIva: true,
  tasaIva: 16,

  // Diagnóstico Técnico
  diagnostico: [
    "SE DETECTA BAJA PRESIÓN DE ACEITE EN MARCHA MÍNIMA Y SONIDO DE BUZOS.",
    "CÓDIGO P0202 PRESENTE EN MEMORIA DE LA COMPUTADORA DE VIAJE.",
    "SE OBSERVA FUGA DE ACEITE POR RETÉN DE CIGÜEÑAL TRASERO."
  ],

  // Códigos OBD-II Registrados
  codigosActivos: [
    {
      codigo: "P0202",
      descripcion: "Fallo en el circuito del inyector del cilindro 2 - Presión irregular"
    }
  ],

  // Elementos Incluidos en el Servicio
  incluye: [
    "DIAGNÓSTICO CON ESCÁNER AUTOMOTRIZ OBD-II",
    "LIMPIEZA DE COMPONENTES Y LAVADO DE MOTOR",
    "REVISIÓN DE NIVELES Y PRUEBA DE CAMINO DE 15 KM"
  ],

  // Observaciones y Notas Técnicas
  observaciones: [
    "SE REQUIERE DEJAR LA UNIDAD 3 DÍAS HÁBILES EN TALLER PARA PRUEBAS DE PRESIÓN.",
    "SE OTORGA GARANTÍA DE 6 MESES O 10,000 KM EN MANO DE OBRA Y REFACCIONES INSTALADAS."
  ],

  // Condiciones Comerciales
  condiciones: [
    "PRECIOS SUJETOS A CAMBIO SIN PREVIO AVISO.",
    "50% DE ANTICIPO AL AUTORIZAR LA REPARACIÓN Y 50% CONTRA ENTREGA.",
    "ESTA COTIZACIÓN TIENE UNA VIGENCIA DE 15 DÍAS NATURALES."
  ]
};

/**
 * Catálogo estándar de servicios y mantenimientos automotrices preconfigurados.
 * Permite la inserción rápida de conceptos en 1 solo clic.
 * 
 * @type {Array<{concepto: string, descripcion: string, importe: number}>}
 */
export const SERVICE_PRESETS = [
  {
    concepto: "AFINACIÓN MAYOR DE MOTOR 4 CILINDROS",
    descripcion: "Cambio de bujías de iridio, filtro de aire, filtro de gasolina, filtro de aceite, cambio de aceite sintético 5W-30 y lavado de cuerpo de aceleración por ultra sonido.",
    importe: 2850.00
  },
  {
    concepto: "MANTENIMIENTO DE FRENOS DELANTEROS Y TRASEROS",
    descripcion: "Rectificación de discos/tambores, cambio de balatas cerámicas de alta fricción, purga de líquido de frenos DOT4 y lubricación de herrajes de caliper.",
    importe: 2400.00
  },
  {
    concepto: "DIAGNÓSTICO COMPUTARIZADO OBD-II Y LECTURA DE SENSORES",
    descripcion: "Escaneo completo de módulos (ECM, ABS, Airbag, BCM), prueba de actuadores en vivo y reporte impreso de parámetros de operación.",
    importe: 600.00
  },
  {
    concepto: "REMPLAZO DE EMBRAGUE / CLUTCH COMPLETO",
    descripcion: "Instalación de kit de embrague (disco, plato prensor y collarín de empuje), rectificado de volante motriz y ajuste de chicote/hidráulico.",
    importe: 4200.00
  },
  {
    concepto: "CAMBIO DE KIT DE DISTRIBUCIÓN Y BOMBA DE AGUA",
    descripcion: "Remplazo de banda de distribución, polea tensora, polea loca, bomba de agua y anticongelante orgánico concentrado.",
    importe: 3900.00
  },
  {
    concepto: "REPARACIÓN DE SUSPENSIÓN DELANTERA",
    descripcion: "Reemplazo de amortiguadores a gas, rotulas, terminales de dirección, bujes de horquilla y alineación/balanceo.",
    importe: 5100.00
  }
];

/**
 * Catálogo de códigos de falla OBD-II más frecuentes en diagnóstico automotriz.
 * 
 * @type {Array<{codigo: string, descripcion: string}>}
 */
export const COMMON_DTC_CODES = [
  { codigo: "P0202", descripcion: "Fallo en el circuito del inyector del cilindro 2" },
  { codigo: "P0300", descripcion: "Fallo de encendido múltiple / aleatorio detectado" },
  { codigo: "P0301", descripcion: "Fallo de encendido en el cilindro 1" },
  { codigo: "P0171", descripcion: "Sistema demasiado pobre (Banco 1)" },
  { codigo: "P0420", descripcion: "Eficiencia del sistema catalítico por debajo del umbral (Banco 1)" },
  { codigo: "P0135", descripcion: "Mal funcionamiento del circuito del calentador del sensor de O2 (Banco 1, Sensor 1)" },
  { codigo: "P0113", descripcion: "Entrada alta en el circuito de temperatura del aire de admisión (IAT)" },
  { codigo: "P0507", descripcion: "RPM del sistema de control de aire de marcha mínima más altas de lo esperado" }
];
