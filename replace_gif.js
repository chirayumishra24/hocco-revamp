const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background URL with Subtitle.gif
  content = content.replace(/url\("https:\/\/hocco-creativity\.vercel\.app\/Subtitle%20\(4\)\.png"\)/g, 'url("Subtitle.gif")');

  // Just to be safe, also replace single quotes and unquoted variations if they exist
  content = content.replace(/url\('https:\/\/hocco-creativity\.vercel\.app\/Subtitle%20\(4\)\.png'\)/g, 'url("Subtitle.gif")');
  content = content.replace(/url\(https:\/\/hocco-creativity\.vercel\.app\/Subtitle%20\(4\)\.png\)/g, 'url("Subtitle.gif")');

  // Also if any file has generic "hocco-creativity.vercel.app/Subtitle (4).png"
  content = content.replace(/url\("https:\/\/hocco-creativity\.vercel\.app\/[A-Za-z0-9%()._-]+"\)\s+center\/contain/g, 'url("Subtitle.gif") center/contain');

  // Actually, there could be other static assets being targeted if I'm not careful. 
  // Standard is `url("https://hocco-creativity.vercel.app/Subtitle%20(4).png")`
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Replaced with Subtitle.gif!");
