FROM eclipse-temurin:17-jdk-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . .

CMD ["sh", "./run_pipeline.sh"]