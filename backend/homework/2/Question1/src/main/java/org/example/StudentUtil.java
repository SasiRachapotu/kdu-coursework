package org.example;

import java.util.HashMap;

public class StudentUtil {

    private StudentUtil(){

    }
    static double[] calculateGPA(int[] studentList,char[][] studentGrades){

        // used Hashmap for storing grades with corresponding values
        HashMap<Character,Integer> hashMap = new HashMap<>();
        hashMap.put('A',4);
        hashMap.put('B',3);
        hashMap.put('C',2);

        // Stored length as it is used multiple times
        int studentListLength = studentList.length;

        double [] grades = new double[studentListLength];

        //Calculation of GPA for all the students
        for(int j=0;j<studentListLength;j++){
            double grade =0;
            int gradesLength = studentGrades[j].length;
            for(int k=0;k<gradesLength;k++){
                grade+=hashMap.get(studentGrades[j][k]);
            }
            grade/=gradesLength;
            grades[j]=grade;
        }

        return grades;
    }

    static int [] getStudentsByGPA(double lower, double higher,int []studentList, char[][] studentGrades){

        // Calling calculate GPA function
        double [] grades = calculateGPA(studentList,studentGrades);
        int studentListLength = studentList.length;
        int [] people = new int[studentListLength];

        //count variable to keep track of people coming in the range
        int count =0;

        for(int i=0;i<studentListLength;i++){
            if(grades[i]>=lower && grades[i]<=higher){
                people[count]=studentList[i];
                count++;
            }
        }
        int[] ans = new int[count];

        // coping the array as we are not supposed to use arrayList here as per the question
        System.arraycopy(people, 0, ans, 0, count);

        return ans;
    }
}
