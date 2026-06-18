/**
 * Genera el PDF de la presentación Nepal — Everest Base Camp Trek 2027.
 * Formato 16:9 landscape (297×167 mm).
 *
 * Uso:
 *   node packages/pdf-generator/nepal/generate-pdf.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const htmlFile = path.resolve(__dirname, "presentacion-nepal-everest.html");
const pdfFile = path.resolve(__dirname, "presentacion-nepal-everest.pdf");

async function main() {
  if (!fs.existsSync(htmlFile)) {
    console.error("No se encontró el archivo HTML:", htmlFile);
    process.exit(1);
  }

  try {
    fs.accessSync(htmlFile, fs.constants.R_OK);
  } catch (err) {
    console.error("No se puede leer el archivo HTML:", err.message);
    process.exit(1);
  }

  const outDir = path.dirname(pdfFile);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
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
      timeout: 90000,
    });

    console.log("Generando PDF...");
    await page.pdf({
      path: pdfFile,
      width: "297mm",
      height: "167mm",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    const sizeKB = Math.round(fs.statSync(pdfFile).size / 1024);
    console.log(
      `PDF generado: ${path.relative(process.cwd(), pdfFile)} (${sizeKB} KB)`
    );
  } catch (err) {
    console.error("Error al generar el PDF:", err.message);
    process.exit(1);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
  }
}

main();
