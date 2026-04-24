#!/bin/sh
set -e

echo "--- Sentinel Pipeline Starter (Ryddig Modus) ---"

# Gå til app-roten hvis vi er i scripts
cd "$(dirname "$0")/.."

# 1. Kompiler
javac src/ModelExtractor.java src/ModelTest.java

# 2. Kjør
java -cp src ModelExtractor
java -cp src ModelTest

# 3. Rapport
node scripts/report_generator.js

echo "--- Pipeline Fullført ---"