package org.example;

import java.io.*;
import java.sql.Array;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {


    public static void getPlayerwitheickets(String team, HashMap<String,ArrayList<Players>> hm){
        List<Players> players = hm.get("team").stream().filter(player->player.getWickets()==40).collect(Collectors.toList());
        System.out.println(players);

    }
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.

        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader("src/main/resources/IPL_2021-data.csv"));
            ArrayList<Players> playerList = new ArrayList<>();
            ArrayList<Teams> teamList = new ArrayList<>();
            HashSet<String> hashSet=new HashSet<>();
            bufferedReader.readLine();
            HashMap<String,ArrayList<Players>> allTeams = new HashMap<>();
            String entry;
            while((entry = bufferedReader.readLine())!=null){
                String [] entries = entry.split(",");
                Players players1 = new Players(entries[0],entries[1],entries[2],Integer.parseInt(entries[3]),Integer.parseInt(entries[4]),Double.parseDouble(entries[5]),Double.parseDouble(entries[6]),Integer.parseInt(entries[7]));
                hashSet.add(entries[1]);
                playerList.add(players1);

            }
            System.out.println(hashSet);
            for (String team: hashSet){
                Teams team1 = new Teams(team);
                teamList.add(team1);
            }
            for (int i=0;i<playerList.size();i++){
                ArrayList<Players> temp=allTeams.getOrDefault(playerList.get(i).getTeam(),new ArrayList<Players>());
                temp.add(playerList.get(i));
                allTeams.put(playerList.get(i).getTeam(),temp);
            }
            System.out.println(allTeams);
            String teamname= "RCB";
//            getPlayerwitheickets("RCB",allTeams);
            //1
            ArrayList<Players> wantedTeam = allTeams.get("RCB");
            ArrayList<Players> ans=new ArrayList<>();
            for(int i=0;i<wantedTeam.size();i++){
                if(wantedTeam.get(i).getWickets()>=40){
                    ans.add(wantedTeam.get(i));
                }
            }
            System.out.println(ans);

            //2
            String team ="RCB";
            int wickets =0;
            Players player2 = null;
            Players player22=null;
            int runs=0;
            for(int i=0;i<wantedTeam.size();i++){
                if(wantedTeam.get(i).getWickets()>wickets){
                    wickets=wantedTeam.get(i).getWickets();
                    player2=wantedTeam.get(i);
                }if(wantedTeam.get(i).getRuns()>runs){
                    runs=wantedTeam.get(i).getRuns();
                    player22=wantedTeam.get(i);
                }
            }
            System.out.println(player2);
            System.out.println(player22);

            //3
            ArrayList<Players> ans31=new ArrayList<>();
            ArrayList<Players> ans32 = new ArrayList<>();
            playerList.sort((p1,p2)->p2.getRuns()-p1.getRuns());
            for(int i=0;i<3;i++){
                ans31.add(playerList.get(i));
            }
            System.out.println(ans31);
            playerList.sort((p1,p2)->p2.getWickets()-p1.getWickets());
            for(int i=0;i<3;i++){
                ans32.add(playerList.get(i));
            }
            System.out.println(ans32);

            //4

            System.out.println(hashSet);
            int count =0;
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("src/main/resources/output.csv"));
            StringBuilder stringBuilder=new StringBuilder();

            ArrayList<String> teams4=new ArrayList<>();
            for(String team1: hashSet){
                teams4.add(team1);
            }
            System.out.println(teams4);
            HashMap<String,ArrayList<String>> hashMap4=new HashMap<>();
            for(int i=0;i<teams4.size();i++){
                ArrayList<String> team41= new ArrayList<String>();
                for(int j=0;j<teams4.size();j++){
                    if(i!=j){
                        team41.add(teams4.get(j));
                    }
                }
                hashMap4.put(teams4.get(i),team41);
            }
            System.out.println(hashMap4);
            stringBuilder.append("date,");
            stringBuilder.append("matchno,");
            stringBuilder.append("teamhome,");
            stringBuilder.append("teamaway,");
            stringBuilder.append("ground\n");
            LocalDate myObj = LocalDate.now();
            System.out.println(myObj);

            for(String key: hashMap4.keySet().stream().toList()){
                boolean bool = true;
                StringBuilder stringBuilder1 = new StringBuilder();
                for(String key2:hashMap4.get(key)){
                    System.out.println(key +" "+key2);
                    myObj.plusDays(1);
                    if(bool){
                        stringBuilder1.append(myObj+"6:30");
                        bool =false;
                    }
                    else{
                        stringBuilder1.append(myObj+"9:30");
                        bool = true;
                    }
                    stringBuilder1.append(",");
                    count++;
                    stringBuilder1.append(count);
                    stringBuilder1.append(",");
                    stringBuilder1.append(key);
                    stringBuilder1.append(",");
                    stringBuilder1.append(key2);
                    stringBuilder1.append(",");
                    stringBuilder1.append(key);
                    stringBuilder1.append("\n");
                    bufferedWriter.append(stringBuilder1);
                    bufferedWriter.flush();
                }
            }
            bufferedWriter.flush();


        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}