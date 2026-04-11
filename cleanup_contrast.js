const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Remove the old global whitesmoke override that was causing issues
    if (content.includes('color: whitesmoke !important;')) {
        content = content.replace('color: whitesmoke !important;', '/* color: whitesmoke managed by refined rules below */');
        dirty = true;
    }

    // 2. Ensure the refined rules are present and correct
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
        content = content.replace('</style>', refinedCardCss + '\n</style>');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned up contrast logic in ${file}`);
    }
});

console.log("Contrast cleanup complete!");
