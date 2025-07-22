const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs').promises;
const path = require('path');

async function buildCSS() {
  try {
    // Read the source CSS
    const css = await fs.readFile('./src/assets/css/main.css', 'utf8');
    
    // Process with PostCSS
    const result = await postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer,
    ]).process(css, { from: './src/assets/css/main.css' });

    // Ensure output directory exists
    await fs.mkdir('./_site/assets/css', { recursive: true });
    
    // Write the output
    await fs.writeFile('./_site/assets/css/main.css', result.css);
    
    console.log('✅ Tailwind CSS compiled successfully!');
  } catch (error) {
    console.error('❌ Error compiling CSS:', error);
    process.exit(1);
  }
}

buildCSS();