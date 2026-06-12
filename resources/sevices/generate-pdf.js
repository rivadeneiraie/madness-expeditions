const puppeteer = require("puppeteer");
const path = require("path");

const htmlFile = path.resolve(__dirname, "servicios-madness.html");
const pdfFile  = path.resolve(__dirname, "servicios-madness.pdf");

(async () => {
  console.log("Iniciando browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const fileUrl = "file:///" + htmlFile.replace(/\\/g, "/");
  console.log("Cargando:", fileUrl);

  await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 60000 });

  console.log("Generando PDF...");
  await page.pdf({
    path: pdfFile,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const fs = require("fs");
  const sizeKB = Math.round(fs.statSync(pdfFile).size / 1024);
  console.log(`✓ PDF generado: ${pdfFile} (${sizeKB} KB)`);
})();
