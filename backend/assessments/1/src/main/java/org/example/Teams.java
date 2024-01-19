package org.example;

import java.util.ArrayList;

public class Teams {

    public ArrayList<Players> players;
    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Teams{" +
                "players=" + players +
                ", name='" + name + '\'' +
                '}';
    }

    public Teams(String name){
        this.name=name;

    }
    public void addPlayer(Players player){
        players.add(player);
    }
}
