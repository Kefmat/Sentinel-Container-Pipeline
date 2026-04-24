#!/bin/sh
set -e # Stopper skriptet umiddelbart ved feil

echo "--- Sentinel Pipeline Starter ---"

# 1. Bygg
javac ModelExtractor.java ModelTest.java

# 2. Kjør Logikk
java ModelExtractor

# 3. KJØR TEST
java ModelTest

# 4. Kjør Rapportering (skjer kun hvis testen passerer)
node report_generator.js

echo "--- Pipeline Fullført ---"