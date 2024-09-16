package com.example.securitydemo.dao;

import com.example.securitydemo.entity.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AuthenticationDao {
    ArrayList<Person> arrayList;

    public AuthenticationDao(){
        this.arrayList = new ArrayList<>();
    }

    public void addPeople(Person person){
        arrayList.add(person);
    }

    public Person getPersonById(int id){
        return arrayList.get(id);
    }

    public String getRoleById(int id) {
        return arrayList.get(id).getRole();
    }

    public List<Person> getAll(){
        return arrayList;
    }

}
