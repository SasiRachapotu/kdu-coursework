package org.example;

import java.util.Arrays;

public class SentimentAnalyzer {

    public static int[] detectProsAndCons(String review, String[][] featureSet, String [] posOpinionWords, String [] negOpinionWords){

        int featureSetLength = featureSet.length;
        int[] featureOpinions = new int[featureSetLength];

        for(int i=0;i<featureSetLength;i++){
            int subFeaturesLength = featureSet[i].length;
            int opinion =0;
            for(int j=0;j<subFeaturesLength;j++){

                //calling  getOpinionFeature
                opinion = getOpinionOnFeature(review,featureSet[i][j],posOpinionWords,negOpinionWords);
                if(opinion==1 || opinion ==-1){
                    break;
                }
            }
            featureOpinions[i]=opinion;
        }
        return featureOpinions;
    }


    private static String [] splitString(String review){
        String[] words = review.split(" ");
        for(int i=0;i<words.length;i++){
            words[i]=words[i].replaceAll("[^a-zA-Z0-9]","").toLowerCase();
        }
        return words;
    }
    private static int getOpinionOnFeature(String review, String feature, String[] posOpinionWords, String[] negOpinionWords) {

        // First calling the first method which checks for pattern "feature was Opinion"
        int first = checkForWasPhrasePattern(review,feature,posOpinionWords,negOpinionWords);

        // if we get the value we will return
        if(first!=0){
            return first;
        }
        // if we don't get the value we will call the other function which checks other type of pattern "Opinion Feature"
        else{
            return checkForOpinionFirstPattern(review,feature,posOpinionWords,negOpinionWords);
        }
    }


    // This function is to check if the opinion is present in the posOpinion words or negOpinion words according to the parameter (created same function for both opinion words)
    private static int checkForOpinion(String opinion, String [] OpinionWords){
        for(String word: OpinionWords){
            if(word.equals(opinion)){
                return 1;
            }
        }
        return 0;
    }

    // Function to check for pattern "feature was opinion"
    private static int checkForWasPhrasePattern(String review, String feature, String[] posOpinionWords, String[] negOpinionWords) {
        String [] words = splitString(review);
        for(int i=0;i<words.length;i++){
            if(words[i].equals(feature) && i+2<words.length){
                if(words[i+1].equals("was") && checkForOpinion(words[i+2],posOpinionWords)==1 ){
                    return 1;
                }
                else if(words[i+1].equals("was") && checkForOpinion(words[i+2],negOpinionWords)==1){
                    return -1;
                }
            }
        }


        return 0;
    }


    // Function to check for pattern "opinion feature"
    private static int checkForOpinionFirstPattern(String review, String feature, String[] posOpinionWords, String[] negOpinionWords) {


        String [] words = splitString(review);
        for(int i=0;i<words.length;i++){
            if(words[i].equals(feature) && i-1>=0){
                if(checkForOpinion(words[i-1],posOpinionWords)==1){
                    return 1;
                }
                else if(checkForOpinion(words[i-1],negOpinionWords)==1){
                    return -1;
                }
            }
        }


        return 0;
    }

    public static void main(String[] args) {

        // defined all the features,opinions and words
        String review = "Haven't been here in years! Fantastic service and the food was delicious! Definetly will be a frequent flyer! Francisco was very attentive";
        String[][] featureSet = {{ "ambiance", "ambience", "atmosphere", "decor" }, { "dessert", "ice cream", "desert" }, { "food" }, { "soup" }, { "service", "management", "waiter", "waitress", "bartender", "staff", "server" } };
        String[] posOpinionWords = { "good", "fantastic", "friendly", "great", "excellent", "amazing", "awesome", "delicious" };
        String[] negOpinionWords = { "slow", "bad", "horrible", "awful", "unprofessional", "poor" };
        int[] featureOpinions = detectProsAndCons(review, featureSet, posOpinionWords, negOpinionWords);
        logging logging = new logging();
        StringBuilder stringBuilder = new StringBuilder("Opinions on Features: ");
        stringBuilder.append(Arrays.toString(featureOpinions));
        logging.logString(stringBuilder);
    }
}
