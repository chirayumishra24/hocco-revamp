const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove the custom fullscreen buttons often found next to iframes
    // Pattern: <button class="fullscreen-button" onclick="goFullscreen(...)">...</button>
    content = content.replace(/<button[^>]*class=\"[^\"]*fullscreen-button[^\"]*\"[^>]*>.*?<\/button>/gi, '');
    
    // Also remove the Gustora global fullscreen button if it's there, 
    // though the user specifically said "from youtube iframe". 
    // However, usually "no fullscreen" means none. 
    // I'll stick to the ones on the iframes for now unless it's clear they want all.
    // The screenshot suggests the ones on the videos.
    
    // Remove the goFullscreen function if it exists in script tags
    content = content.replace(/\/\/ Fullscreen Functionality[\s\S]*?function goFullscreen[\s\S]*?}\{1,2\}/gi, '');
    // And any calls to it in DOM etc. (Wait, I already removed the buttons calling it)

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Removed fullscreen buttons from ${file}`);
    }
});
