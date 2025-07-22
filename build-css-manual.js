const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = './_site/assets/css';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the source CSS
const sourceCSS = fs.readFileSync('./src/assets/css/style.css', 'utf8');

// For now, let's just copy the CSS and add basic Tailwind reset
const basicTailwindCSS = `
/* Basic Tailwind CSS Reset and Utilities for fallback */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

body {
  margin: 0;
  line-height: inherit;
}

/* Essential Tailwind utilities */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-50 { z-index: 50; }
.flex { display: flex; }
.hidden { display: none; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.min-h-screen { min-height: 100vh; }
.bg-white { background-color: rgb(255 255 255); }
.text-white { color: rgb(255 255 255); }
.p-4 { padding: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.space-x-3 > * + * { margin-left: 0.75rem; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.rounded-xl { border-radius: 0.75rem; }
.bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
.from-primary-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(59 130 246 / 0)); }
.to-secondary-500 { --tw-gradient-to: #eab308; }

/* Responsive utilities */
@media (min-width: 1024px) {
  .lg\\:flex { display: flex; }
  .lg:hidden { display: none; }
}

/* Custom styles from the source */
${sourceCSS}
`;

// Write the compiled CSS
fs.writeFileSync('./_site/assets/css/style.css', basicTailwindCSS);

console.log('✅ CSS compiled successfully with basic Tailwind utilities!');