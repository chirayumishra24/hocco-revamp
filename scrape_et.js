const https = require('https');
https.get('https://m.economictimes.com/industry/cons-products/food/havmor-founders-make-a-comeback-with-hocco-ice-creams/articleshow/108608240.cms', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^"']+\.(jpg|jpeg|png|webp)/ig);
    if(urls) {
        console.log(urls.filter(url => url.toLowerCase().includes('ankit') || url.toLowerCase().includes('chona') || url.toLowerCase().includes('havmor')));
    }
  });
});
