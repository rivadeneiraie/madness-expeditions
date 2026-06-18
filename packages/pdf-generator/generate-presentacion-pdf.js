/**
 * Genera los PDFs de la presentación SeisMiles a partir de los HTML del mismo directorio.
 * Formato 16:9 landscape (297×167 mm).
 *
 * Uso:
 *   node resources/company-document/generate-presentacion-pdf.js          → genera los 3 idiomas
 *   node resources/company-document/generate-presentacion-pdf.js es       → solo español
 *   node resources/company-document/generate-presentacion-pdf.js en       → solo inglés
 *   node resources/company-document/generate-presentacion-pdf.js pt       → solo portugués
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const DOCUMENTS = {
  es: {
    html: "presentacion-seismiles.html",
    pdf: "presentacion-seismiles.pdf",
    label: "Español",
  },
  en: {
    html: "presentacion-seismiles-en.html",
    pdf: "presentacion-seismiles-en.pdf",
    label: "English",
  },
  pt: {
    html: "presentacion-seismiles-pt.html",
    pdf: "presentacion-seismiles-pt.pdf",
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
    timeout: 90000,
  });

  console.log(`[${label}] Generando PDF...`);
  await page.pdf({
    path: pdfFile,
    width: "297mm",
    height: "167mm",
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
