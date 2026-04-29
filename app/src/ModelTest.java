import java.io.File;
import java.util.Scanner;

/**
 * ModelTest - Validerer at generert data er logisk korrekt.
 * Stopper pipelinen dersom dataene er korrupte eller utenfor grenseverdier.
 */
public class ModelTest {

    public static void main(String[] args) {
        System.out.println("[TEST] Starter validering av output.json...");

        try {
            File file = new File("output.json");
            if (!file.exists()) {
                throw new Exception("output.json ble ikke funnet!");
            }

            Scanner scanner = new Scanner(file);
            String content = scanner.useDelimiter("\\Z").next();
            scanner.close();

            // Enkel manuell parsing av sikkerhetsscore
            if (content.contains("\"security_score\":")) {
                int startIndex = content.indexOf("\"security_score\":") + 17;
                int endIndex = content.indexOf("}", startIndex);
                int score = Integer.parseInt(content.substring(startIndex, endIndex).trim());

                if (score < 0 || score > 100) {
                    throw new Exception("Ugyldig sikkerhetsscore: " + score + ". Ma vare mellom 0 og 100.");
                }
                System.out.println("[TEST] Sikkerhetsscore validert: " + score);
            }

            System.out.println("[TEST] All data er validert. OK.");

        } catch (Exception e) {
            System.err.println("[TEST] FEIL: " + e.getMessage());
            System.exit(1); 
        }
    }
}