package org.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Logging {

    private static final Logger logger = LoggerFactory.getLogger(Logging.class);

    public void logString(StringBuilder str){
        if(str!=null) {
            logger.info(str.toString());
        }
    }

    public void logString(String str){
        logger.info(str);
    }

}
