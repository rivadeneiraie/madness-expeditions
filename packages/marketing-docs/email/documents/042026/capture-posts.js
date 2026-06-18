const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_FILE = path.resolve(__dirname, 'instagram-posts.html');
const OUTPUT_DIR = path.resolve(__dirname, 'images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const POSTS = [
  { selector: '.post-wrapper:nth-child(2)  .post', name: 'post-01-mendoza' },
  { selector: '.post-wrapper:nth-child(3)  .post', name: 'post-02-bolivia' },
  { selector: '.post-wrapper:nth-child(4)  .post', name: 'post-03-peru' },
  { selector: '.post-wrapper:nth-child(5)  .post', name: 'post-04-kilimanjaro' },
  { selector: '.post-wrapper:nth-child(7)  .post', name: 'post-01b-mendoza-foto2' },
  { selector: '.post-wrapper:nth-child(8)  .post', name: 'post-01c-mendoza-foto3' },
  { selector: '.post-wrapper:nth-child(10) .post', name: 'post-02b-bolivia-foto2' },
  { selector: '.post-wrapper:nth-child(11) .post', name: 'post-02c-bolivia-foto3' },
  { selector: '.post-wrapper:nth-child(13) .post', name: 'post-03b-peru-foto2' },
  { selector: '.post-wrapper:nth-child(14) .post', name: 'post-03c-peru-foto3' },
  { selector: '.post-wrapper:nth-child(16) .post', name: 'post-04b-kilimanjaro-foto2' },
  { selector: '.post-wrapper:nth-child(17) .post', name: 'post-04c-kilimanjaro-safari' },
  { selector: '.post-wrapper:nth-child(18) .post', name: 'post-04d-kilimanjaro-zanzibar' },
];

(async () => {
  console.log('Lanzando Chromium...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport grande para que los posts 600x600 quepan bien
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');
  console.log('Cargando:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Esperar que las imágenes de fondo carguen
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const imgs = Array.from(document.querySelectorAll('img'));
      if (imgs.every(img => img.complete)) return resolve();
      let loaded = 0;
      imgs.forEach(img => {
        img.addEventListener('load', () => { if (++loaded === imgs.length) resolve(); });
        img.addEventListener('error', () => { if (++loaded === imgs.length) resolve(); });
      });
      setTimeout(resolve, 8000);
    });
  });

  // Pequeña espera extra para background-images CSS
  await new Promise(r => setTimeout(r, 2000));

  for (const { selector, name } of POSTS) {
    const el = await page.$(selector);
    if (!el) {
      console.warn(`  ⚠  No encontrado: ${selector} (${name})`);
      continue;
    }

    const outputPath = path.join(OUTPUT_DIR, `${name}.jpg`);
    await el.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 95,
    });
    console.log(`  ✓  ${name}.jpg`);
  }

  await browser.close();
  console.log('\nListo! Imágenes guardadas en:', OUTPUT_DIR);
})();
