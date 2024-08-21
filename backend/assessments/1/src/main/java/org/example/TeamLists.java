package org.example;

import java.util.ArrayList;

public class TeamLists {
    ArrayList<Teams> teamlist;
    TeamLists(ArrayList<Teams> teamlist){
        this.teamlist=teamlist;
    }


    public void addPlayer(Players player){
        for(Teams team: teamlist){
            if(team.getName().equals(player.getTeam())){
                team.addPlayer(player);
            }
        }
    }

    public void printAllteams(){
        for(Teams team: teamlist){
            System.out.println(team);
        }
    }


}
