# Bruker en lettvekt Java-base
FROM eclipse-temurin:17-jdk-alpine

# Installerer Node.js og npm
RUN apk add --no-cache nodejs npm

# Mappe for applikasjonen
WORKDIR /app

# Kopier ALT fra app-mappen inn til containeren
COPY ./app/ .

# Gjør skriptet kjørbart (Linux/Docker)
RUN chmod +x run_pipeline.sh

# Kjører skriptet
CMD ["sh", "./run_pipeline.sh"]