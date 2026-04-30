# Sentinel Pipeline

Sentinel Pipeline er et automatisert system for sikkerhetsskanning og rapportgenerering. Systemet kombinerer Java for datauthenting og validering med Node.js for generering av visuelle dashboards.

## Arkitektur

Prosjektet er delt inn i tre hovedfaser som styres av en sentral pipeline:

1. **Datauthenting (Java):** `ModelExtractor` simulerer en skanning og genererer `output.json`. Denne støtter konfigurasjon via miljøvariabler.
2. **Validering (Java):** `ModelTest` verifiserer at genererte data er logiske (f.eks. at sikkerhetsscore er mellom 0 og 100) før prosessen fortsetter.
3. **Rapportgenerering (Node.js):** `report_generator.js` leser validert data og produserer et HTML-dashboard i `output/`-mappen.

## Krav til programvare

For å kjøre dette prosjektet trenger du enten:
* Docker (anbefalt)
* Java JDK 17 og Node.js 18+ (for lokal kjøring uten Docker)


## Prosjektstruktur

*   **`app/src/`**: Inneholder Java-kildekoden.
    *   `ModelExtractor.java`: Hovedlogikk som henter systemdata og genererer JSON.
    *   `ModelTest.java`: Valideringsmotor som sikrer dataintegritet før rapporten bygges.
*   **`app/scripts/`**: Inneholder Node.js-skript for rapportgenerering.
*   **`infrastructure/`**: Inneholder konfigurasjon for Docker.
*   **`.github/workflows/`**: Inneholder CI-pipelinen for GitHub Actions.

## Funksjonalitet

### Dynamisk Konfigurasjon
Systemet støtter miljøvariabler, slik at man kan simulere ulike sikkerhetsscenarioer uten å endre kildekoden.

| Variabel | Beskrivelse | Standardverdi |
| :--- | :--- | :--- |
| `SENTINEL_SCORE` | Sikkerhetsscore (0-100) | 95 |
| `SENTINEL_STATUS` | Statusmelding (f.eks. "Suksess", "Kritisk") | Suksess |
| `SENTINEL_NODES` | Antall noder skannet | 5 |

### Automatisk Validering
`ModelTest.java` fungerer som en portvakt. Den sjekker `output.json` og stopper prosessen umiddelbart dersom:
*   Sikkerhetsscoren er utenfor lovlig område (0-100).
*   Antall noder er negativt.
*   Nødvendige datafiler mangler.

## Demo (Snapshot)

<img width="751" height="467" alt="image" src="https://github.com/user-attachments/assets/9e0ddb18-2b07-4475-a3f2-ced63ec05c37" />


## Installasjon og kjøring

### Med Docker 
For å bygge og kjøre hele pipelinen i en isolert container:
```powershell
# Bygg bildet
docker build -t sentinel-app -f infrastructure/Dockerfile .

# Kjør med egendefinert score
docker run -e SENTINEL_SCORE=75 sentinel-app

## Manuelt oppsett
Dersom du vil kjøre komponentene manuelt, må du ha **Java JDK 17** og **Node.js 18+** installert.

1.  **Kompiler**:  
    `javac src/ModelExtractor.java src/ModelTest.java`
2.  **Kjør logikk**:  
    `java -cp src ModelExtractor`
3.  **Test**:  
    `java -cp src ModelTest`
4.  **Generer rapport**:  
    `node scripts/report_generator.js`

---

## Vedlikehold for neste programmerer
For å sikre kontinuitet og kvalitet i prosjektet, skal følgende retningslinjer følges:

*   **Javadoc**: All Java-kode skal inkludere Javadoc-kommentarer for å forklare metoders hensikt.
*   **Feilhåndtering**: Systemet bruker `System.exit(1)` ved kritiske feil for å sikre at defekte rapporter ikke lastes opp som artifakter i CI-løpet.
*   **Stil**: Bruk aldri emojis i systemlogger eller kodekommentarer.

---

## CI/CD Pipeline
Pipelinen i **GitHub Actions** kjører automatisk ved hver push til `main`. Den utfører følgende oppgaver:
*   Validerer koden via enhetstester.
*   Lagrer den ferdige rapporten som en nedlastbar artifakt (`pipeline-report`).
