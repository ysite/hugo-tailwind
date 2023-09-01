const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

// Helper function to extract font-family and font-weight from CSS declarations
function extractFontInfo(css) {
  const fontInfo = {
    families: new Set(),
    weights: new Set(),
  };

  const regex = /font-family:([^;]+);|font-weight:([^;]+);/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    if (match[1]) {
      const fonts = match[1].split(',').map((font) => font.trim());
      fonts.forEach((font) => fontInfo.families.add(font));
    }
    if (match[2]) {
      fontInfo.weights.add(match[2].trim());
    }
  }

  return fontInfo;
}

async function analyzeCSS(cssFilePath) {
  try {
    const css = await fs.promises.readFile(cssFilePath, 'utf-8');
    const processedCSS = await postcss([tailwindcss]).process(css, { from: undefined });

    const fontInfo = extractFontInfo(processedCSS.css);

    return fontInfo;
  } catch (error) {
    console.error(`Error while processing ${cssFilePath}: ${error.message}`);
    return null;
  }
}

async function main() {
    const pages = ['./resources/_gen/assets/css/css/styles.css_26ed82591f548334db866351c69dc648.content'];
  const fontFamilies = new Set();
  const fontWeights = new Set();

  for (const page of pages) {
    const fontInfo = await analyzeCSS(page);
    if (fontInfo) {
      fontInfo.families.forEach((family) => fontFamilies.add(family));
      fontInfo.weights.forEach((weight) => fontWeights.add(weight));
    }
  }

  console.log('Unique Font Families:');
  console.log(Array.from(fontFamilies).join(', '));

  console.log('\nUnique Font Weights:');
  console.log(Array.from(fontWeights).sort().join(', '));
}

main();
