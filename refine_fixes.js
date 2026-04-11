const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Fix Notes Panel Text Color
    if (content.includes('id="notesPanel"') && content.includes('text-black')) {
        content = content.replace(/id="notesPanel"([^>]*?)text-black/g, 'id="notesPanel"$1text-white');
        dirty = true;
    }
    // Ensure the textarea itself has white text
    if (content.includes('id="notesArea"') && !content.includes('text-white')) {
        content = content.replace('id="notesArea"', 'id="notesArea" style="color: white !important;"');
        dirty = true;
    }

    // 2. Fix Back-to-Top Mobile Responsiveness
    // Ensure it's not hidden behind safe areas or too small
    const bttStylePatch = `
  #back-to-top {
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    padding: 12px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #c71545, #2d2b7e);
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  @media (max-width: 768px) {
    #back-to-top {
      bottom: 85px !important; /* Move above Bottom Nav if present */
      right: 20px !important;
      width: 44px !important;
      height: 44px !important;
    }
  }
`;
    if (!content.includes('/* Back to Top Responsiveness */')) {
        content = content.replace('</style>', '/* Back to Top Responsiveness */\n' + bttStylePatch + '\n</style>');
        dirty = true;
    }

    // 3. Final Check for YouTube Height
    if (content.includes('src="https://www.youtube.com/embed') && !content.includes('height: 600px')) {
        // Find iframes with youtube links and ensure they have a good height
        content = content.replace(/(<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed[^>]*>)/g, (match) => {
             if (!match.includes('height=')) return match.replace('<iframe', '<iframe height="600"');
             return match;
        });
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Refined ${file}`);
    }
});

console.log("Global refinements complete!");
