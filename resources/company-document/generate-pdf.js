/**
 * Genera los PDFs de la propuesta comercial SeisMiles a partir de los HTML del mismo directorio.
 * Las imágenes se cargan desde GitHub (requiere internet).
 *
 * Uso:
 *   node resources/company-document/generate-pdf.js          → genera los 3 idiomas
 *   node resources/company-document/generate-pdf.js es       → solo español
 *   node resources/company-document/generate-pdf.js en       → solo inglés
 *   node resources/company-document/generate-pdf.js pt       → solo portugués
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const DOCUMENTS = {
  es: {
    html: "propuesta-comercial-seismiles.html",
    pdf: "propuesta-comercial-seismiles.pdf",
    label: "Español",
  },
  en: {
    html: "propuesta-comercial-seismiles-en.html",
    pdf: "propuesta-comercial-seismiles-en.pdf",
    label: "English",
  },
  pt: {
    html: "propuesta-comercial-seismiles-pt.html",
    pdf: "propuesta-comercial-seismiles-pt.pdf",
    label: "Português",
  },
};

async function generatePdf(browser, htmlFile, pdfFile, label) {
  if (!fs.existsSync(htmlFile)) {
    console.error(`[${label}] No se encontró el archivo HTML:`, htmlFile);
    return false;
  }

  const page = await browser.newPage();
  const fileUrl = "file:///" + htmlFile.replace(/\\/g, "/");
  console.log(`[${label}] Cargando:`, fileUrl);

  await page.goto(fileUrl, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  console.log(`[${label}] Generando PDF...`);
  await page.pdf({
    path: pdfFile,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();

  const sizeKB = Math.round(fs.statSync(pdfFile).size / 1024);
  console.log(`✓ [${label}] PDF generado: ${pdfFile} (${sizeKB} KB)`);
  return true;
}

(async () => {
  const langArg = process.argv[2];
  const langs = langArg ? [langArg] : Object.keys(DOCUMENTS);

  const invalid = langs.filter((l) => !DOCUMENTS[l]);
  if (invalid.length) {
    console.error("Idioma(s) no reconocido(s):", invalid.join(", "));
    console.error("Opciones válidas: es, en, pt");
    process.exit(1);
  }

  console.log("Iniciando browser...");
  const browser = await puppeteer.launch({ headless: true });

  for (const lang of langs) {
    const { html, pdf, label } = DOCUMENTS[lang];
    await generatePdf(
      browser,
      path.resolve(__dirname, html),
      path.resolve(__dirname, pdf),
      label
    );
  }

  await browser.close();
  console.log("Listo.");
})();
