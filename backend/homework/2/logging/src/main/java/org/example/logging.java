package org.example;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class logging {

    private static final Logger logger = LoggerFactory.getLogger(logging.class);

    void logString(StringBuilder str){
        if(str!=null) {
            logger.info(str.toString());
        }
    }

    void logString(String str){
        logger.info(str);
    }


}
