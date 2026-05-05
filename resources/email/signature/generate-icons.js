/**
 * Genera los íconos de la firma de correo como PNG y los guarda en icons/
 * Uso: node resources/email/signature/generate-icons.js
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.join(__dirname, "icons");
if (!fs.existsSync(ICONS_DIR)) fs.mkdirSync(ICONS_DIR);

const COLOR = "#4a9fd4";

const icons = [
  {
    name: "icon-mail.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 20 20">
      <rect x="2" y="4.5" width="16" height="11" rx="1.5" fill="none" stroke="${COLOR}" stroke-width="1.5"/>
      <polyline points="2,6 10,12 18,6" fill="none" stroke="${COLOR}" stroke-width="1.5"/>
    </svg>`,
  },
  {
    name: "icon-phone.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.8 2.2z" fill="none" stroke="${COLOR}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    name: "icon-facebook.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="none" stroke="${COLOR}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    name: "icon-instagram.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 20 20">
      <rect x="3" y="3" width="14" height="14" rx="4" fill="none" stroke="${COLOR}" stroke-width="1.5"/>
      <circle cx="10" cy="10" r="3.2" fill="none" stroke="${COLOR}" stroke-width="1.5"/>
      <circle cx="14" cy="6" r="1" fill="${COLOR}"/>
    </svg>`,
  },
];

async function generateIcons() {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  for (const icon of icons) {
    const size = icon.name === "icon-mail.png" || icon.name === "icon-instagram.png" ? 48 : 40;
    const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${icon.svg}</body></html>`;

    const p = await browser.newPage();
    await p.setViewport({ width: size, height: size, deviceScaleFactor: 2 });
    await p.goto("data:text/html," + encodeURIComponent(html));

    const element = await p.$("svg");
    await element.screenshot({
      path: path.join(ICONS_DIR, icon.name),
      omitBackground: true,
    });
    await p.close();

    console.log(`✓ ${icon.name}`);
  }

  await browser.close();
  console.log("\nÍconos generados en resources/email/signature/icons/");
  console.log("Ahora subí los archivos a GitHub (git add, commit, push) y ejecutá update-signature.js");
}

generateIcons().catch(console.error);
