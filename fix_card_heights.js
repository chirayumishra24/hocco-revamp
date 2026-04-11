const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Kill the hardcoded card heights and force 'hug content' behavior
    const cardHeightFix = `
  /* Fix: Remove extra space below cards and force height to fit content */
  body.course-page .flip-card,
  body.course-page .card,
  body.course-page .flip-card-inner,
  body.course-page .card-content,
  body.course-page .flip-card-front,
  body.course-page .flip-card-back,
  body.course-page .card-front,
  body.course-page .card-back {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    position: relative !important;
    inset: auto !important;
  }

  body.course-page .flip-card-inner,
  body.course-page .card-content {
    display: block !important;
    transform: none !important;
    perspective: none !important;
  }

  body.course-page .flip-card-front,
  body.course-page .flip-card-back,
  body.course-page .card-front,
  body.course-page .card-back {
    padding: 2rem !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    backface-visibility: visible !important;
  }

  /* Handle Flipped State with Relative Positioning */
  body.course-page .flip-card .flip-card-back,
  body.course-page .card .card-back {
    display: none !important;
  }
  body.course-page .flip-card.flipped .flip-card-front,
  body.course-page .card.flipped .card-front {
    display: none !important;
  }
  body.course-page .flip-card.flipped .flip-card-back,
  body.course-page .card.flipped .card-back {
    display: flex !important;
  }
`;

    if (!content.includes('/* Fix: Remove extra space below cards')) {
        // Find the existing premium card fix and replace or append
        if (content.includes('/* Premium Card Visibility Fix */')) {
             content = content.replace('/* Premium Card Visibility Fix */', cardHeightFix);
        } else {
             content = content.replace('</style>', cardHeightFix + '\n</style>');
        }
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed card height in ${file}`);
    }
});

console.log("Card height fixes applied globally!");
