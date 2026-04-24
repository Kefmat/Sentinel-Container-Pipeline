/**
 * Sentinel Report Generator
 * Denne modulen leser data fra Java-motoren og genererer et visuelt dashboard.
 */

const fs = require('fs');
const path = require('path');

// Definer stier relativt til denne skript-filen
const outputDir = path.join(__dirname, '../output');
const templatePath = path.join(__dirname, '../templates/template.html');
const cssPath = path.join(__dirname, '../templates/style.css');
const dataPath = path.join(__dirname, '../output.json'); // Fikset sti

// Sørger for at utdata-mappen eksisterer før vi skriver til den
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    console.log("[NODE] Leser data fra:", dataPath);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{status}}', data.status)
               .replace('{{nodes}}', data.nodes)
               .replace('{{score}}', data.security_score)
               .replace('{{timestamp}}', new Date().toLocaleString());

    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    fs.copyFileSync(cssPath, path.join(outputDir, 'style.css'));

    console.log("[NODE] Dashboard er nå generert i app/output/index.html");
} catch (err) {
    console.error("[NODE] Kritisk feil under rapportgenerering:", err.message);
    process.exit(1);
}