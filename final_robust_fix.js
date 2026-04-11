const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Robust Notes Panel Fix (Catch text-black anywhere in the same tag as id="notesPanel")
    const notesPanelRegex = /<div[^>]*id="notesPanel"[^>]*>/g;
    content = content.replace(notesPanelRegex, (match) => {
        if (match.includes('text-black')) {
            dirty = true;
            return match.replace('text-black', 'text-white');
        }
        return match;
    });

    // Also check the inverse (id after text-black)
    const notesPanelRegexInverse = /<div[^>]*text-black[^>]*id="notesPanel"[^>]*>/g;
    content = content.replace(notesPanelRegexInverse, (match) => {
        dirty = true;
        return match.replace('text-black', 'text-white');
    });

    // 2. Ensure NO confirmation for Clear Notes
    if (content.includes('confirm("Clear all notes?")')) {
        // Find the clearBtn listener block and strip the if(confirm)
        content = content = content.replace(/clearBtn\.addEventListener\("click",\s*\(\)\s*=>\s*\{[\s\S]*?if\s*\(confirm\("Clear all notes\?"\)\)\s*\{([\s\S]*?)\}\s*\}\);/g, (match, body) => {
             dirty = true;
             return `clearBtn.addEventListener("click", () => {${body}});`;
        });
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Finalized ${file}`);
    }
});

console.log("Global fixes finalized!");
