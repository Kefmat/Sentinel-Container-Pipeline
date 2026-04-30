# STAGE 1: Build (Kompilering)
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /build
COPY ./app .
RUN javac src/ModelExtractor.java src/ModelTest.java

# STAGE 2: Runtime (Den faktiske containeren som kjører)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Installer Node.js for rapportgenerering
RUN apk add --no-cache nodejs

# Kopierer kun nødvendige filer fra builder-stadiet
COPY --from=builder /build/src/*.class ./src/
COPY --from=builder /build/scripts ./scripts
COPY --from=builder /build/templates ./templates

# Gjør skriptet kjørbart og kjør det
RUN chmod +x scripts/run_pipeline.sh
CMD ["sh", "scripts/run_pipeline.sh"]