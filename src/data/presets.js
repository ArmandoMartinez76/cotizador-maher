export const DEFAULT_QUOTE = {
  folio: "CM-250728-01",
  fecha: "28 DE JULIO DE 2026",
  cliente: "",
  unidad: "VOLKSWAGEN SAVEIRO",
  modelo: "2015",
  placas: "HX-9350-A",
  vin: "9BWKB05U5XP056838",
  kilometraje: "—",
  tallerNombre: "MAHER",
  tallerSubtitulo: "MECÁNICA ESPECIALIZADA",
  items: [
    {
      id: "1",
      cant: 1,
      concepto: "REFACCIONES PARA REPARACIÓN",
      descripcion: "Refacciones necesarias para corrección de fallas detectadas.",
      importe: 10607.00
    },
    {
      id: "2",
      cant: 1,
      concepto: "MANO DE OBRA ESPECIALIZADA",
      descripcion: "Mano de obra para diagnóstico, reparación y pruebas.",
      importe: 3280.00
    }
  ],
  incluirIva: true,
  tasaIva: 16,
  diagnostico: [
    "Baja presión de aceite del motor.",
    "Códigos de falla activos que no permiten su eliminación.",
    "Motor con inclinación hacia la transmisión, requiriendo inspección y corrección de soportes.",
    "Falla en el sistema de limpiaparabrisas."
  ],
  codigosActivos: [
    { codigo: "P0202", descripcion: "Inyector cil. 2 – Falla eléctrica en circuito" },
    { codigo: "P0030", descripcion: "Banco 1 Sensor 1 – Circuito calefactor" },
    { codigo: "P0036", descripcion: "Banco 1 Sensor 2 – Circuito calefactor" },
    { codigo: "P0141", descripcion: "Banco 1 Sensor 2 – Circuito calefactor" }
  ],
  incluye: [
    "Diagnóstico electrónico.",
    "Sustitución de refacciones indicadas.",
    "Corrección de baja presión de aceite.",
    "Revisión y corrección de posición de motor.",
    "Revisión del sistema de limpiaparabrisas.",
    "Borrado de códigos y pruebas de funcionamiento."
  ],
  observaciones: [
    "La cotización se elaboró con base en las fallas detectadas durante la inspección inicial.",
    "En caso de encontrarse daños adicionales durante el desmontaje, se notificará al cliente antes de realizar cualquier trabajo adicional.",
    "La garantía aplica únicamente sobre los trabajos y refacciones suministradas por MAHER."
  ],
  condiciones: [
    "Vigencia de la cotización: 15 días naturales.",
    "Forma de pago: Contado."
  ],
  slogan: "CALIDAD | CONFIANZA | RESULTADOS"
};

export const COMMON_DTC_CODES = [
  { codigo: "P0202", descripcion: "Inyector cil. 2 – Falla eléctrica en circuito" },
  { codigo: "P0030", descripcion: "Banco 1 Sensor 1 – Circuito calefactor" },
  { codigo: "P0036", descripcion: "Banco 1 Sensor 2 – Circuito calefactor" },
  { codigo: "P0141", descripcion: "Banco 1 Sensor 2 – Circuito calefactor" },
  { codigo: "P0300", descripcion: "Fallo de encendido en múltiples cilindros detectado" },
  { codigo: "P0420", descripcion: "Eficiencia del sistema catalizador por debajo del umbral (Banco 1)" },
  { codigo: "P0171", descripcion: "Sistema demasiado pobre (Banco 1)" },
  { codigo: "P0128", descripcion: "Termostato del refrigerante del motor (Falla de temperatura)" },
  { codigo: "P0507", descripcion: "Sistema de control de aire de ralentí RPM más alto de lo esperado" }
];

export const SERVICE_PRESETS = [
  { concepto: "REFACCIONES PARA REPARACIÓN", descripcion: "Refacciones necesarias para corrección de fallas detectadas.", importe: 5000 },
  { concepto: "MANO DE OBRA ESPECIALIZADA", descripcion: "Mano de obra para diagnóstico, reparación y pruebas.", importe: 2500 },
  { concepto: "DIAGNÓSTICO POR ESCÁNER OBD-II", descripcion: "Escaneo computarizado e interpretación de códigos activos y pendientes.", importe: 650 },
  { concepto: "AFINACIÓN MAYOR DE MOTOR", descripcion: "Cambio de bujías, filtros de aire/aceite/gasolina, lavado de inyectores y cuerpo de aceleración.", importe: 2800 },
  { concepto: "MANTENIMIENTO DE SISTEMA DE FRENOS", descripcion: "Rectificado de discos, cambio de balatas delanteras/traseras y purgado de líquido.", importe: 1950 },
  { concepto: "CAMBIO DE ACEITE Y FILTRO", descripcion: "Aceite sintético multigrado de alto rendimiento y filtro de aceite OEM.", importe: 1200 }
];
