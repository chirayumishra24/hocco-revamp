const https = require('https');
https.get('https://raw.githubusercontent.com/chirayumishra24/hocco-revamp/main/1.1.html', (res) => {
    // If I just want an image, let's use an easy placeholder right now while I scrape for the real one:
});

fetch('https://google.com/search?q=ankit+chona+hocco')
.then(r => r.text())
.then(t => {
    const matches = t.match(/https:\/\/[^"'\s]+\.(jpg|jpeg|png)/ig);
    console.log(matches ? matches.slice(0, 10) : 'No matches');
});
