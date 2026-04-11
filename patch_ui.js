const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. YouTube Iframe Fullscreen Removal
    // Remove allowfullscreen attributes and append ?fs=0 or &fs=0
    content = content.replace(/<iframe[^>]*youtube\.com\/embed\/[^>]*>/gi, (match) => {
        let updated = match
            .replace(/\sallowfullscreen(=\"\")?/gi, '') // Remove allowfullscreen
            .replace(/src=\"([^\"]+)\"/gi, (srcMatch, srcUrl) => {
                // Append fs=0 to the URL
                const separator = srcUrl.includes('?') ? '&' : '?';
                if (!srcUrl.includes('fs=0')) {
                    return `src="${srcUrl}${separator}fs=0"`;
                }
                return srcMatch;
            });
        return updated;
    });

    // 2. Button Styling Update
    // Targeted buttons: Submit Answers, Submit Quiz, Submit, Submit Reflection
    // We regex for <button ...> containing Submit and add the class hocco-submit-btn
    content = content.replace(/<button([^>]*)>([^<]*[Ss]ubmit[^<]*)<\/button>/gi, (match, attrs, text) => {
        // Strip inline styles starting with style="..." (ignoring spaces)
        let updatedAttrs = attrs.replace(/\sstyle=\"[^\"]*\"/gi, '');
        
        // Add class hocco-submit-btn if not already there
        if (!updatedAttrs.includes('hocco-submit-btn')) {
            if (updatedAttrs.includes('class=\"')) {
                updatedAttrs = updatedAttrs.replace(/class=\"([^\"]*)\"/i, 'class="$1 hocco-submit-btn"');
            } else {
                updatedAttrs += ' class="hocco-submit-btn"';
            }
        }
        
        // Final button construction
        return `<button${updatedAttrs}>${text}</button>`;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched ${file}`);
    }
});
