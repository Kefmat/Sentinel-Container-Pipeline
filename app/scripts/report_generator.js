/**
 * Sentinel Report Generator
 * Denne modulen leser data fra Java-motoren og genererer et visuelt dashboard.
 * Den setter også fargetema basert på sikkerhetsscore.
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../output');
const templatePath = path.join(__dirname, '../templates/template.html');
const cssPath = path.join(__dirname, '../templates/style.css');
const dataPath = path.join(__dirname, '../output.json');

// Sørger for at utdata-mappen eksisterer
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    console.log("[NODE] Leser data fra:", dataPath);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    let statusClass = 'success'; // Grønn som standard
    if (data.security_score < 50) {
        statusClass = 'danger';  // Rød
    } else if (data.security_score < 80) {
        statusClass = 'warning'; // Gul
    }


    let html = fs.readFileSync(templatePath, 'utf8');

    // Bruker regex /{{var}}/g for å erstatte alle forekomster i fila
    html = html.replace(/{{statusClass}}/g, statusClass)
               .replace('{{status}}', data.status)
               .replace('{{nodes}}', data.nodes)
               .replace('{{score}}', data.security_score)
               .replace('{{timestamp}}', new Date().toLocaleString());

    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    fs.copyFileSync(cssPath, path.join(outputDir, 'style.css'));

    console.log(`[NODE] Dashboard generert med tema: ${statusClass.toUpperCase()}`);
} catch (err) {
    console.error("[NODE] Kritisk feil under rapportgenerering:", err.message);
    process.exit(1);
}