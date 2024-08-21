package details;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import logger.Logging;

import java.io.File;
import java.io.IOException;

public class TransactionsParsing {

    public static JsonNode jsonArray;
    private TransactionsParsing(){}

    public static JsonNode loadTransactions(String filepath) {

        try {

            File file = new File(filepath);

            ObjectMapper objectMapper = new ObjectMapper();

            jsonArray = objectMapper.readTree(file);
        }
        catch(JsonMappingException e){
            Logging.logString("Exception occured: "+e);
        }
        catch(JsonProcessingException e){
            Logging.logString("Exception Occured: "+e);
        }
        catch (IOException e) {
            Logging.logString("Exception Occured: "+e);
            Thread.currentThread().interrupt();
        }

        return jsonArray;
    }
}

