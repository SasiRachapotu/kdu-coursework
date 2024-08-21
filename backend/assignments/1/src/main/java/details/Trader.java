package details;

public class Trader {

    String firstName;
    String lastName;
    String phone;
    String walletAdrress;
    int amount =0;

    public Trader(String firstName, String lastName, String phone, String walletAdrress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.walletAdrress = walletAdrress;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWalletAdrress() {
        return walletAdrress;
    }

    public void setWalletAdrress(String walletAdrress) {
        this.walletAdrress = walletAdrress;
    }

    @Override
    public String toString() {
        return "Traders{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", walletAdrress='" + walletAdrress + '\'' +
                '}';
    }
}
