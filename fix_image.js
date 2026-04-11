const fs = require('fs');
const files = ['1.1.html', '1.3.html', '2.2.html', '3.2.html', '5.2.html']; // derived from grep_search earlier

let oldUrl = 'https://startupstorymedia.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.44.36-PM-1.jpeg';
// Since placehold.co is reliable for dev envs:
let newUrl = 'https://placehold.co/600x400/2B3139/FFFFFF/png?text=Ankit+Chona+Image';

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(oldUrl)) {
            let updated = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
            fs.writeFileSync(file, updated, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
