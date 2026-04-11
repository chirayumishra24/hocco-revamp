const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Fix Notes Clear Button (Remove confirm)
    if (content.includes('if (confirm("Clear all notes?"))')) {
        content = content.replace(/if\s*\(confirm\("Clear all notes\?"\)\)\s*\{/, '{');
        dirty = true;
    }

    // 2. Standardize Back-to-Top CSS & Logic
    // Ensure display: none and high z-index
    const bttCssRegex = /body\.course-page\s*#back-to-top\s*\{([^}]*)\}/g;
    if (bttCssRegex.test(content)) {
        content = content.replace(bttCssRegex, (match, p1) => {
            if (!p1.includes('display: none')) {
                return `body.course-page #back-to-top { ${p1.trim()} display: none; z-index: 9999 !important; }`;
            }
            return match;
        });
        dirty = true;
    }

    // 3. Apply Card Text Color & Background Gradient for Visibility
    // We target the overrides block or the main style block
    const cardOverride = `
  /* Premium Card Visibility Fix */
  body.course-page .flip-card, 
  body.course-page .card,
  body.course-page .section-bg.learning-insights .flip-card {
    background: linear-gradient(135deg, #2d2b7e, #c71545) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
  body.course-page .flip-card *, body.course-page .card * {
    transition: none !important;
    transform: none !important;
    color: whitesmoke !important;
  }
`;
    if (!content.includes('/* Premium Card Visibility Fix */')) {
        content = content.replace('</style>', cardOverride + '\n</style>');
        dirty = true;
    }

    // 4. Increase Youtube Iframe Heights
    // Standardize min-height and explicit height attributes
    if (content.includes('height="480"')) {
        content = content.replace(/height="480"/g, 'height="650"');
        dirty = true;
    }
    const iframeHeightRegex = /min-height:\s*220px;/g;
    if (iframeHeightRegex.test(content)) {
        content = content.replace(iframeHeightRegex, 'min-height: 450px;');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched ${file}`);
    }
});

console.log("Global UI fixes applied!");
