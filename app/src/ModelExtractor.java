import java.io.FileWriter;
import java.io.IOException;

public class ModelExtractor {
    public static void main(String[] args) {
        System.out.println("[JAVA] Starter datauthenting...");
        
        // Simulerer innsamling av system-data
        String jsonData = "{\"status\": \"Suksess\", \"nodes\": 5, \"security_score\": 95}";

        try (FileWriter file = new FileWriter("output.json")) {
            file.write(jsonData);
            System.out.println("[JAVA] Data lagret til output.json");
        } catch (IOException e) {
            System.err.println("[JAVA] Feil ved skriving av fil: " + e.getMessage());
        }
    }
}