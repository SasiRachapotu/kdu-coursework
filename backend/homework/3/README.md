Homework 3

In Question 1 of the homework, a Hospital Management System was implemented. The implementation began with the creation of a User class, followed by the Staff class. The Patient class extended the User class, while the Doctor and Nurse classes extended the Staff class. The structure of the classes was designed to encapsulate relevant attributes and behaviors for each role in the hospital management system. Additionally, appropriate getter and setter functions were implemented to manage the class properties.

Moving on to Question 2, a Billing class and HealthInsurancePlan class were introduced. Subsequently, specific insurance plan classes (Platinum, Gold, Silver, Bronze) were created as extensions of the HealthInsurancePlan class. The billing logic was structured around the coverage variable in the HealthInsurancePlan class, providing a comprehensive approach to handling different health insurance plans with varying coverage levels.

Question 3 involved the abstraction of the HealthInsurancePlan class. The class was marked as abstract, and an abstract method named computeMonthlyPremium was declared. This abstract method was later implemented in the child classes (Platinum, Gold, Silver, Bronze), offering a framework for computing monthly premiums based on specific insurance plans.

In Question 4, an InsuranceBrand interface was introduced. The BlueCrossBlueShield class implemented this interface, providing a concrete implementation of the computeMonthlyPremium function as required by the InsuranceBrand interface. Additionally, an offeredBy variable of type InsuranceBrand was added to the HealthInsurancePlan class. This variable was utilized to calculate premiums based on the company offering the insurance, showcasing a dynamic relationship between health insurance plans and the insurance company providing them.


