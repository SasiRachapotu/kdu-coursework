package org.example;


public class APIResponseParser {


    // defined final variables as there are 6 tags defined
    final static String authorStart = "<name>";
    final static String authorEnd = "</name>";

    final static String publicationStart = "<original_publication_year type=\"integer\">";

    final static String publicationEnd = "</original_publication_year>";

    final static String avgRatingStart = "<average_rating>";
    final static String avgRatingEnd = "</average_rating>";

    final static String ratingCountStart = "<ratings_count type=\"integer\">";
    final static String ratingCountEnd = "</ratings_count>";

    final static String imageStart = "<image_url>";
    final static String imageEnd = "</image_url>";
    public static Book parse(String response) {
        Book book = new Book();

        // Rules for title
        String endRule = "</title>";
        String startRule = "<title>";

        // call parse for title
        String title = parse(response, startRule, endRule);
        //set book title
        book.setTitle(title);

        //call parse for author
        String author = parse(response,authorStart,authorEnd);
        // set author
        book.setAuthor(author);

        //call parse for publication
        String publication  = parse(response,publicationStart,publicationEnd);
        //set publication
        book.setPublicationYear(Integer.parseInt(publication));

        //call parse for average rating
        String averageRating = parse(response,avgRatingStart,avgRatingEnd);
        //set average rating
        book.setAverageRating(Double.parseDouble(averageRating.trim()));

        //call parse for rating count
        String ratingCount = parse(response,ratingCountStart,ratingCountEnd);
        //set rating count
        book.setRatingsCount(Integer.parseInt(ratingCount.replaceAll(",","")));

        //call parse for imageURL
        String image = parse(response,imageStart,imageEnd);
        //set imageURL
        book.setImageUrl(image);

        return book;
    }

    public static String parse(String response, String startRule, String endRule){

        int idxStart=response.indexOf(startRule);
        int idxEnd = response.indexOf(endRule);


        return response.substring(idxStart+startRule.length(),idxEnd);
    }

    public static void main(String[] args) {

        //XML code to be parsed
        String response = "<work>" +
                "<id type=\"integer\">2361393</id>" +
                "<books_count type=\"integer\">813</books_count>" +
                "<ratings_count type=\"integer\">1,16,315</ratings_count>" +
                "<text_reviews_count type=\"integer\">3439</text_reviews_count>" +
                "<original_publication_year type=\"integer\">1854</original_publication_year>" +
                "<original_publication_month type=\"integer\" nil=\"true\"/>" +
                "<original_publication_day type=\"integer\" nil=\"true\"/>" +
                "<average_rating>3.79</average_rating>" +
                "<best_book type=\"Book\">" +
                "<id type=\"integer\">16902</id>" +
                "<title>Walden</title>" +
                "<author>" +
                "<id type=\"integer\">10264</id>" +
                "<name>Henry David Thoreau</name>" +
        "</author>" +
                "<image_url>" +
                "http://images.gr-assets.com/books/1465675526m/16902.jpg" +
                "</image_url>" +
                "<small_image_url>" +
                "http://images.gr-assets.com/books/1465675526s/16902.jpg" +
                "</small_image_url>" +
                "</best_book>" +
                "</work>";

        //function call
        Book book = APIResponseParser.parse(response);
        book.printBook();
    }
}
