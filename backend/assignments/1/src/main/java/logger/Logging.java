package logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Logging {

    // loggerFactory instance
    private Logging(){

    }
    public static final Logger logger = LoggerFactory.getLogger(Logging.class);

    public static void logString(String s) {
        logger.info(s);
    }
}