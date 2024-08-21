package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        // defined Student array and student grades according to the given input
        int [] studentList = {1001,1002};
        char [][] studentsGrades = { { 'A', 'A', 'A', 'B' }, { 'A', 'B', 'B' } };

        // static functions so, no need to make class calling functions directly
        double [] grades = StudentUtil.calculateGPA(studentList,studentsGrades);

        logging logging = new logging();
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Grades for the students are: \n");
        for(double grade: grades){
            stringBuilder.append(grade);
            stringBuilder.append("\n");
        }
        logging.logString(stringBuilder);
        int [] ans = StudentUtil.getStudentsByGPA(3.2,3.5,studentList,studentsGrades);

        stringBuilder = new StringBuilder();
        stringBuilder.append("The students in the range are: \n");
        for(int student:ans){
            stringBuilder.append(student);
        }
        logging.logString(stringBuilder);
        }
}