const https = require('https');

https.request('https://images.yourstory.com/cs/2/96eabe90392211eb93f18b5de36cae00/Imageeixz-1718361093156.jpg', { method: 'HEAD' }, (res) => {
    console.log("YourStory Status:", res.statusCode);
}).end();

https.request('https://startupstorymedia.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.44.36-PM-1.jpeg', { method: 'HEAD' }, (res) => {
    console.log("StartupStory Status:", res.statusCode);
}).end();

https.request('https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/inventory/product/1bccacba-fdac-46ed-ae21-9e8c3b7b629b.png', { method: 'HEAD'}, (res) => {
   console.log("Zepto fallback:", res.statusCode);
}).end();
