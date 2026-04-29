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

## Installasjon og kjøring med Docker

Dette er den enkleste metoden for å sikre et identisk kjøremiljø.

