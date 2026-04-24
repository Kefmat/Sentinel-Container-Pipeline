const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

try {
    const data = JSON.parse(fs.readFileSync('output.json', 'utf8'));

    let html = fs.readFileSync('template.html', 'utf8');

    html = html.replace('{{status}}', data.status)
               .replace('{{nodes}}', data.nodes)
               .replace('{{score}}', data.security_score)
               .replace('{{timestamp}}', new Date().toLocaleString());

    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    fs.copyFileSync('style.css', path.join(outputDir, 'style.css'));

    console.log("[NODE] Dashboard er generert med ekstern CSS!");
} catch (err) {
    console.error("[NODE] Feil:", err.message);
    process.exit(1);
}