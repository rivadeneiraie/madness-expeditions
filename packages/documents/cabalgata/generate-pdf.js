/**
 * Genera el PDF de la propuesta Cabalgata 2026.
 *
 * Uso:
 *   node packages/documents/cabalgata/generate-pdf.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const htmlFile = path.resolve(__dirname, "propuesta-cabalgata-2026.html");
const pdfFile = path.resolve(__dirname, "propuesta-cabalgata-2026.pdf");

async function main() {
  if (!fs.existsSync(htmlFile)) {
    console.error("No se encontró el archivo HTML:", htmlFile);
    process.exit(1);
  }

  console.log("Iniciando Puppeteer...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const fileUrl = "file:///" + htmlFile.replace(/\\/g, "/");
  console.log("Cargando:", fileUrl);

  await page.goto(fileUrl, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  console.log("Generando PDF...");
  await page.pdf({
    path: pdfFile,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();
  await browser.close();

  const sizeKB = Math.round(fs.statSync(pdfFile).size / 1024);
  console.log(`✓ PDF generado: ${pdfFile} (${sizeKB} KB)`);
}

main().catch((err) => {
  console.error("Error al generar PDF:", err);
  process.exit(1);
});
