const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Removing the image container for Ankit Chona.
    // The structure looks like: <div class="w-full"><img decoding="async" loading="lazy" alt="Ankit Chona" class="w-full" src="..." /></div>
    const regex = /<div class="w-full">\s*<img[^>]*alt="Ankit Chona"[^>]*>\s*<\/div>/g;
    
    // Also remove just the img tag in case it isn't wrapped exactly like that
    const fallbackRegex = /<img[^>]*alt="Ankit Chona"[^>]*>/g;

    let updated = content;
    
    if (regex.test(updated)) {
        updated = updated.replace(regex, '');
    } else if (fallbackRegex.test(updated)) {
        updated = updated.replace(fallbackRegex, '');
    }

    if (content !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`Removed image from ${file}`);
    }
});
