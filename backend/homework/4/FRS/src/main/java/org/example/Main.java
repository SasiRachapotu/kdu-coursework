package org.example;


import java.util.List;

public class Main {

    public static final Logging LOGGING = new Logging();
    public static void printConfirmedList(List<Passenger> confirmedList){
        StringBuilder stringBuilder = new StringBuilder("Confirmed List: ");
        for (Passenger passenger : confirmedList) {
            stringBuilder.append(passenger.getConfirmationNumber());
            stringBuilder.append(" ");
        }
        LOGGING.logString(stringBuilder);

    }
    public static void main(String[] args) {
        TicketReservation ticketReservation = new TicketReservation();


        // Book flights using a loop
        for (int i = 1; i <= 14; i++) {
            String confirmationNumber = "C" + i;
            LOGGING.logString(String.format("Booking Status: %b",ticketReservation.bookFlight("Sasi", "Rachapotu", 21, "Male", "business", confirmationNumber)));
        }

        // Display confirmed passengers
        printConfirmedList(ticketReservation.getConfirmedList());

        // Cancel a flight and display confirmed passengers again
        ticketReservation.cancel("C1");
        printConfirmedList(ticketReservation.getConfirmedList());
    }
}