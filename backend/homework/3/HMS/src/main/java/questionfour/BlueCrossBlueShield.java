package questionfour;

import questionthree.*;

public class BlueCrossBlueShield implements InsuranceBrand{

    @Override
    public double computeMonthlyPremium(HealthInsurancePlan insurancePlan, int age, boolean smoking) {
        if (age > 55) {
            if (insurancePlan instanceof Platinum) {
                return smoking ? 300 : 200;
            } else if (insurancePlan instanceof Gold) {
                return smoking ? 240 : 150;
            } else if (insurancePlan instanceof Silver) {
                return smoking ? 180 : 100;
            } else if (insurancePlan instanceof Bronze) {
                return smoking ? 120 : 50;
            }
        }
        return 0;
    }
}
