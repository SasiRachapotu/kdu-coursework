package org.example;

public class MissingGradeException extends Exception{

    private final int STUDENT_ID;

    MissingGradeException(int studentId){
        this.STUDENT_ID =studentId;
    }

    public int getStudentId() {
        return STUDENT_ID;
    }

    @Override
    public String toString() {
        return "Exception occurred as there is a missing grade for student "+ getStudentId();
    }
}

