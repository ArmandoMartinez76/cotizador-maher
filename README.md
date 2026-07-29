# 🚗 MAHER PRO — Cotizador Técnico Automotriz Especializado

> **Sistema de Generación de Cotizaciones Automotrices de Alta Precisión Vectorial A4**, diseñado para **MAHER Mecánica Especializada**. Permite crear, modificar, previsualizar en tiempo real y exportar cotizaciones profesionales directamente a PDF y WhatsApp con soporte para dispositivos móviles y de escritorio.

---

## 📋 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Arquitectura del Proyecto y Tecnologías](#-arquitectura-del-proyecto-y-tecnologías)
3. [Estructura del Código y Módulos](#-estructura-del-código-y-módulos)
4. [Instalación y Configuración Local](#-instalación-y-configuración-local)
5. [Guía Completa de Despliegue en Múltiples Escenarios](#-guía-completa-de-despliegue-en-múltiples-escenarios)
   - [Escenario A: Netlify (GitHub CI/CD & Drag-and-Drop)](#escenario-a-netlify-github-cicd--drag-and-drop)
   - [Escenario B: Vercel (Vercel CLI & GitHub)](#escenario-b-vercel-vercel-cli--github)
   - [Escenario C: GitHub Pages (gh-pages)](#escenario-c-github-pages-gh-pages)
   - [Escenario D: Cloudflare Pages](#escenario-d-cloudflare-pages)
   - [Escenario E: Docker + Nginx (Servidor Privado / VPS)](#escenario-e-docker--nginx-servidor-privado--vps)
6. [Roadmap y Futuras Funcionalidades](#-roadmap-y-futuras-funcionalidades)

---

## ⚡ Características Principales

- 🎯 **Replicación 1:1 de Hoja Física A4**: Renderizado vectorial exacto de 794px × 1123px (estándar A4 a 96 DPI) que garantiza que el documento exportado sea una copia idéntica del formato impreso oficial.
- 📥 **Descarga Directa de PDF (Sin Cuadro de Impresora)**: Utiliza `html2pdf.js` y `html2canvas` para transformar el DOM en un archivo `.pdf` que se descarga directamente al dispositivo sin intermediación del navegador.
- 🖨️ **Impresión estricta en 1 Sola Página**: Reglas CSS `@media print` optimizadas que garantizan que el documento impreso nunca se desborde a una segunda hoja sobrante.
- 📱 **Diseño Adaptativo UI/UX (Smartphone / Tablet / Desktop)**: 
  - **Modo Desktop**: Vista balanceada en 2 columnas (Formulario Asistido + Vista Previa en Vivo).
  - **Modo Móvil**: Barra de comando inferior tipo iOS (*Dock Bar*) con conmutador táctil `[Formulario]` / `[Hoja A4]`.
- ⚡ **Catálogos de Inserción Rápida en 1-Clic**:
  - **Presets de Servicios**: Afinaciones, Mantenimiento de Frenos, Embrague, Distribución, Suspensión.
  - **Códigos de Falla OBD-II**: P0202, P0300, P0171, P0420 y diagnóstico computarizado.
- 💬 **Compartir por WhatsApp**: Genera un mensaje formateado con Folio, Cliente, Vehículo, Placas y Total con enlace directo a WhatsApp Web o App.
- 💾 **Historial de Cotizaciones y Guardado Local**: Persistencia automática mediante `localStorage` para almacenar múltiples cotizaciones con opción de recuperación y eliminación.

---

## 🛠️ Arquitectura del Proyecto y Tecnologías

El proyecto fue construido utilizando herramientas modernas de desarrollo web bajo el paradigma de Single Page Application (SPA):

| Tecnología | Descripción / Propósito |
| :--- | :--- |
| **React 19** | Biblioteca principal de JavaScript para el renderizado declarativo de la interfaz. |
| **Vite 8** | Bundler ultra-rápido de desarrollo y compilación para producción. |
| **Tailwind CSS v4** | Motor de estilos de utilidad para la estructuración de componentes. |
| **Vanilla CSS3 Custom Properties** | Sistema de diseño de colores (Hex, RGB), sombras y reglas `@media print`. |
| **html2pdf.js / html2canvas / jsPDF** | Motor de conversión DOM a Canvas e impresión directa de PDF vectorial. |
| **Lucide React** | Conjunto de iconos vectoriales ligeros para acciones de interfaz. |
| **Google Fonts** | `Plus Jakarta Sans` (UI moderna), `Outfit` (números/totales), `Montserrat` (branding). |

---

## 📁 Estructura del Código y Módulos

```text
cotizador-maher/
├── public/
│   ├── _redirects            # Reglas de enrutamiento SPA para Netlify
│   └── favicon.svg           # Icono vectorial de la pestaña
├── src/
│   ├── components/
│   │   ├── HeaderNav.jsx         # Barra de navegación principal y controles móviles
│   │   ├── QuoteFormEditor.jsx   # Formulario por pasos (Stepper Wizard) y catálogos
│   │   ├── QuoteDocumentView.jsx # Hoja de cotización en formato físico A4 (794px)
│   │   ├── HistoryModal.jsx      # Modal de gestión de historial local
│   │   └── NetlifyGuideModal.jsx # Guía interactiva de despliegue en Netlify
│   ├── data/
│   │   └── presets.js            # Estado por defecto, servicios predefinidos y DTC OBD-II
│   ├── App.jsx                   # Orquestador de estado global y generador de PDF
│   ├── main.jsx                  # Punto de entrada de React 19
│   └── index.css                 # Sistema de diseño, Glassmorphic Mesh y @media print
├── netlify.toml              # Configuración de compilación para Netlify
├── index.html                # Documento HTML5 raíz con fuentes Google Fonts
└── package.json              # Dependencias del proyecto
```

### 🔍 Descripción de Módulos Clave

#### 1. `src/App.jsx`
Punto central de la aplicación. Maneja el estado principal de la cotización actual (`quote`), el historial de cotizaciones guardadas (`savedQuotes`), y la pestaña móvil activa (`mobileTab`).
- **`handleDownloadPDF()`**: Función asíncrona que conmuta temporalmente la vista a preview si está en móvil, invoca `html2pdf.js` con resolución `scale: 2` y `windowWidth: 794` para garantizar que la descarga del PDF sea idéntica al render A4 nativo.
- **`handleShareWhatsApp()`**: Construye el texto encriptado para la API de WhatsApp con el desglose del servicio.

#### 2. `src/components/QuoteDocumentView.jsx`
Representación exacta en pantalla de la hoja de cotización A4 (`width: 794px`, `minHeight: 1123px`, `padding: 40px 44px`).
- **Colores Hex Estrictos**: Utiliza estilos en línea (`#091A33`, `#E5A900`, `#EEF2F7`) para garantizar compatibilidad total con el lienzo de `html2canvas` sin errores de funciones de color `oklch()`.
- **Clase `.mobile-paper-scaler`**: Aplica un escalado adaptativo (`transform: scale(0.48)`) en dispositivos móviles para visualizar la hoja A4 completa en la pantalla del celular.

#### 3. `src/components/QuoteFormEditor.jsx`
Formulario asistido dividido en 4 pasos estratégicos (*1. Vehículo, 2. Precios, 3. Diagnóstico, 4. Notas*).
- **Catálogos Desplegables**: Inserción de servicios típicos y códigos DTC OBD-II en 1 solo clic.
- **Cálculo de IVA y Totales**: Actualización en tiempo real del Subtotal, IVA (opcional al 16%) y Total en Moneda Nacional ($ MXN).

---

## 💻 Instalación y Configuración Local

### Requisitos Previos
- **Node.js**: Versión 18.0.0 o superior.
- **npm**: Versión 9.0.0 o superior.

### Pasos de Ejecución
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ArmandoMartinez76/cotizador-maher.git
   cd cotizador-maher
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo local**:
   ```bash
   npm run dev
   ```
   *El servidor se abrirá en `http://localhost:5173/` o `http://localhost:5174/`.*

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   *Los archivos optimizados para producción se generarán en la carpeta `/dist`.*

---

## 🚀 Guía Completa de Despliegue en Múltiples Escenarios

### Escenario A: Netlify (Recomendado — Gratis $0)

#### Opción 1: Despliegue Continuo desde GitHub (Automático)
1. Inicia sesión en [Netlify](https://app.netlify.com/).
2. Haz clic en **"Add new site"** ➔ **"Import an existing project"**.
3. Selecciona **GitHub** y autoriza tu cuenta `ArmandoMartinez76`.
4. Elige el repositorio **`cotizador-maher`**.
5. Configura los parámetros de Build:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
6. Haz clic en **"Deploy cotizador-maher"**. Netlify compilará y desplegará tu sitio automáticamente con certificado SSL HTTPS gratuito.

#### Opción 2: Despliegue Manual por Arrastre (Netlify Drop)
1. Compila el proyecto en local: `npm run build`.
2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastra la carpeta `dist` generada (o el archivo `cotizador-maher-dist.zip`).
4. ¡Tu sitio estará en vivo en 5 segundos!

---

### Escenario B: Vercel (Gratis $0)

#### Opción 1: Mediante la Interfaz Web de Vercel
1. Ingresa a [Vercel](https://vercel.com/) y haz clic en **"Add New Project"**.
2. Importa el repositorio **`ArmandoMartinez76/cotizador-maher`**.
3. Vercel detectará Vite automáticamente. Asegúrate de que el directorio de salida sea `dist`.
4. Presiona **"Deploy"**.

#### Opción 2: Mediante Vercel CLI (Línea de Comandos)
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

### Escenario C: GitHub Pages (gh-pages)

1. Instala el paquete de GitHub Pages como dependencia de desarrollo:
   ```bash
   npm install -D gh-pages
   ```

2. Añade las siguientes propiedades a tu `package.json`:
   ```json
   "homepage": "https://ArmandoMartinez76.github.io/cotizador-maher",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Ejecuta el comando de despliegue:
   ```bash
   npm run deploy
   ```

---

### Escenario D: Cloudflare Pages (Gratis & Ultra-Rápido)

1. Inicia sesión en la consola de [Cloudflare Pages](https://pages.cloudflare.com/).
2. Conecta tu cuenta de GitHub y selecciona `cotizador-maher`.
3. Selecciona el preset **Vite**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Presiona **Save and Deploy**.

---

### Escenario E: Docker + Nginx (Servidor Privado / VPS / AWS EC2)

Si deseas alojar la aplicación en tu propio servidor VPS (DigitalOcean, AWS, Linode), puedes usar Docker:

1. **Crear un archivo `Dockerfile` en la raíz del proyecto**:
   ```dockerfile
   # Etapa 1: Build de la aplicación con Node.js
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Etapa 2: Servir archivos estáticos con Nginx
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY public/_redirects /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Construir y ejecutar el contenedor**:
   ```bash
   docker build -t cotizador-maher .
   docker run -d -p 80:80 --name cotizador-maher-app cotizador-maher
   ```

---

## 🔮 Roadmap y Futuras Funcionalidades

- [ ] **Soporte para Múltiples Monedas (USD / EUR)** con conversión de tipo de cambio en tiempo real.
- [ ] **Módulo de Firma Digital Táctil**: Permitir que el cliente firme directamente en la pantalla de la tablet o celular antes de descargar el PDF.
- [ ] **Integración con Base de Datos Firebase / Supabase**: Sincronización en la nube de inventarios de refacciones y catálogo de clientes.
- [ ] **Envío Automático de Correos Electrónicos (SendGrid / Resend API)**: Enviar la cotización directamente al correo del cliente con un clic.

---

### 👨‍💻 Autor y Licencia
Desarrollado para **MAHER Mecánica Especializada**.  
*Todos los derechos reservados © 2026.*
