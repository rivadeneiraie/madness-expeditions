/**
 * Genera el PDF de la propuesta Peru 2026.
 *
 * Uso:
 *   node resources/trips/peru/generate-pdf.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const htmlFile = path.resolve(__dirname, "propuesta-peru-2026.html");
const pdfFile = path.resolve(__dirname, "propuesta-peru-2026.pdf");

async function main() {
  if (!fs.existsSync(htmlFile)) {
    console.error("No se encontro el archivo HTML:", htmlFile);
    process.exit(1);
  }

  try {
    fs.accessSync(htmlFile, fs.constants.R_OK);
  } catch (err) {
    console.error("No se puede leer el archivo HTML:", err.message);
    process.exit(1);
  }

  let browser;
  let page;

  try {
    console.log("Iniciando Puppeteer...");
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    const fileUrl =
      "file://" +
      (process.platform === "win32" ? "/" : "") +
      encodeURI(htmlFile.replace(/\\/g, "/"));
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

    const sizeKB = Math.round(fs.statSync(pdfFile).size / 1024);
    console.log(`PDF generado: ${pdfFile} (${sizeKB} KB)`);
  } catch (err) {
    console.error("Error al generar PDF:", err);
    process.exitCode = 1;
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

main();
