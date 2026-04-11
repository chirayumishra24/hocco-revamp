const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Refine Card Text Colors by Side
    const refinedCardCss = `
  /* Refined Card Text Colors: Dark on Front, Light on Back */
  body.course-page .flip-card-front *, 
  body.course-page .card-front * {
    color: #1f2937 !important; /* Dark Navy for White Fronts */
  }
  body.course-page .flip-card-back *, 
  body.course-page .card-back * {
    color: whitesmoke !important; /* Light for Dark Gradient Backs */
  }
`;

    if (!content.includes('/* Refined Card Text Colors')) {
        // Append to the end of the style block or before the card height fix
        if (content.includes('/* Fix: Remove extra space below cards')) {
             content = content.replace('/* Fix: Remove extra space below cards', refinedCardCss + '\n  /* Fix: Remove extra space below cards');
        } else {
             content = content.replace('</style>', refinedCardCss + '\n</style>');
        }
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated front-side text color in ${file}`);
    }
});

console.log("Global text color adjustments complete!");
