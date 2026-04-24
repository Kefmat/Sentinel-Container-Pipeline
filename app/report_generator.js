const fs = require('fs');

console.log("[NODE] Genererer rapport basert på Java-data...");

try {
    const rawData = fs.readFileSync('output.json');
    const data = JSON.parse(rawData);

    console.log("-------------------------------");
    console.log(`Systemstatus: ${data.status}`);
    console.log(`Antall Noder: ${data.nodes}`);
    console.log(`Sikkerhetsscore: ${data.security_score}%`);
    console.log("-------------------------------");
    
    console.log("[NODE] Rapportering fullført.");
} catch (err) {
    console.error("[NODE] Kunne ikke lese data fra Java: ", err.message);
}