const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../output');
const templatePath = path.join(__dirname, '../templates/template.html');
const cssPath = path.join(__dirname, '../templates/style.css');
const dataPath = path.join(__dirname, '../../output.json'); // Ligger i app/ rot under kjøring

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{status}}', data.status)
               .replace('{{nodes}}', data.nodes)
               .replace('{{score}}', data.security_score)
               .replace('{{timestamp}}', new Date().toLocaleString());

    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    fs.copyFileSync(cssPath, path.join(outputDir, 'style.css'));

    console.log("[NODE] Dashboard generert i app/output/");
} catch (err) {
    console.error("[NODE] Feil:", err.message);
    process.exit(1);
}