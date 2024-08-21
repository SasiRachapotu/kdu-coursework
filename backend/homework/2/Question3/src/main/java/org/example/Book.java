package org.example;

public class Book {

    private String title;
    private String author;
    private int publicationYear;
    private double averageRating;

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public void setRatingsCount(int ratingsCount) {
        this.ratingsCount = ratingsCount;
    }

    public String getAuthor() {
        return author;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public int getRatingsCount() {
        return ratingsCount;
    }

    private int ratingsCount;
    private String imageUrl;
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public int getPublicationYear() {
        return publicationYear;
    }
    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    // toString function to print the details of the book

    public void printBook() {
        logging logging = new logging();
        logging.logString("\nTitle: "+getTitle()+"\nAuthor: "+getAuthor()+"\nRating count: "+getRatingsCount()+"\nAverage rating: "+getAverageRating()+"\nImageURL: "+getImageUrl()+"\nPublication year: "+getPublicationYear());
    }
}
