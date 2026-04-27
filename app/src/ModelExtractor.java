import java.io.FileWriter;
import java.io.IOException;

/**
 * ModelExtractor - Genererer systemdata for Sentinel Pipeline.
 * * Denne klassen simulerer en sikkerhetsskanning og lagrer resultatet
 * som en JSON-fil som senere leses av Node.js-rapportøren.
 */
public class ModelExtractor {

    /**
     * Hovedmetode som utfører "skanningen" og skriver til fil.
     * @param args Kommandolinjeargumenter
     */
    public static void main(String[] args) {
        System.out.println("[JAVA] Starter datauthenting...");

        // Simulerte data - her kan du endre score for å teste fargene i rapporten
        // Prøv f.eks. 45 for rød (danger) eller 75 for gul (warning)
        String jsonData = "{\"status\": \"Suksess\", \"nodes\": 5, \"security_score\": 95}";

        // Bruker try-with-resources for automatisk lukking av FileWriter
        try (FileWriter writer = new FileWriter("output.json")) {
            writer.write(jsonData);
            System.out.println("[JAVA] Data lagret til output.json");
        } catch (IOException e) {
            System.err.println("[JAVA] Kritisk feil ved skriving av fil: " + e.getMessage());
        }
    }
}