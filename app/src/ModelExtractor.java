import java.io.FileWriter;
import java.io.IOException;

/**
 * ModelExtractor - Genererer systemdata for Sentinel Pipeline.
 * Denne klassen simulerer en sikkerhetsskanning og lagrer resultatet
 * som en JSON-fil. Støtter dynamisk konfigurasjon via miljøvariabler.
 */
public class ModelExtractor {

    /**
     * Hovedmetode som utfører skanningen og skriver til fil.
     * @param args Kommandolinjeargumenter
     */
    public static void main(String[] args) {
        System.out.println("[JAVA] Starter datauthenting...");

        // Henter konfigurasjon fra miljøvariabler eller setter standardverdier
        String status = System.getenv("SENTINEL_STATUS");
        if (status == null) status = "Suksess";

        String nodesRaw = System.getenv("SENTINEL_NODES");
        int nodes = (nodesRaw != null) ? Integer.parseInt(nodesRaw) : 5;
        
        String scoreRaw = System.getenv("SENTINEL_SCORE");
        int score = (scoreRaw != null) ? Integer.parseInt(scoreRaw) : 95;

        // Formaterer JSON-strengen med de dynamiske verdiene
        String jsonData = String.format(
            "{\"status\": \"%s\", \"nodes\": %d, \"security_score\": %d}",
            status, nodes, score
        );

        // Skriver resultatet til fil
        try (FileWriter writer = new FileWriter("output.json")) {
            writer.write(jsonData);
            System.out.println("[JAVA] Data lagret til output.json med score: " + score);
        } catch (IOException e) {
            System.err.println("[JAVA] Kritisk feil ved skriving av fil: " + e.getMessage());
            System.exit(1);
        }
    }
}