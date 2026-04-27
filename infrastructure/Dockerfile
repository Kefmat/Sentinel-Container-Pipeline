# Bruk et bilde som har Java installert
FROM eclipse-temurin:17-jdk-alpine

# Installer Node.js (alpine bruker apk som pakkebehandler)
RUN apk add --no-cache nodejs

# Sett arbeidskatalog inne i containeren
WORKDIR /app

# Kopier filene fra app-mappen på din PC til /app i containeren
COPY ./app .

# Kompiler Java-filene under bygging
RUN javac src/ModelExtractor.java src/ModelTest.java

# Gjør skriptet kjørbart
RUN chmod +x scripts/run_pipeline.sh

# Kommandoen som kjøres når containeren starter
CMD ["sh", "scripts/run_pipeline.sh"]