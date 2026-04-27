#!/bin/sh
set -e

echo "--- Sentinel Pipeline Starter ---"

# Naviger til app-roten basert på skriptets plassering
cd "$(dirname "$0")/.."

# 1. Kompilering av kildekode og tester
echo "[INFO] Kompilerer Java-filer..."
javac src/ModelExtractor.java src/ModelTest.java

# 2. Utførelse av kjerne-logikk
echo "[INFO] Starter ModelExtractor..."
java -cp src ModelExtractor

# 3. Utførelse av valideringstester
echo "[INFO] Kjører ModelTest..."
java -cp src ModelTest

# 4. Generering av visuell rapport
echo "[INFO] Starter report_generator.js..."
node scripts/report_generator.js

echo "--- Pipeline Fullfort ---"