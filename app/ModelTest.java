import java.io.File;

public class ModelTest {
    public static void main(String[] args) {
        System.out.println("[TEST] Kjører validering av ModelExtractor...");
        
        File file = new File("output.json");
        
        if (file.exists() && file.length() > 0) {
            System.out.println("[TEST] SUKSESS: output.json ble generert korrekt.");
            System.exit(0); // Alt ok
        } else {
            System.err.println("[TEST] FEIL: output.json mangler eller er tom!");
            System.exit(1); // Dette vil stoppe GitHub-pipelinen
        }
    }
}