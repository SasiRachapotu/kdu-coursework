import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomType } from "../../interfaces/ApiResponse";

export const getRooms = createAsyncThunk(
    'get-rooms',
    async ()=>{
        try{
            const rooms= await fetch("https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/assessment-3.json");
            const data:RoomType[] = await rooms.json();
            return data;
        }
        catch(err){
            throw new Error("There was an error fetching the api: "+err)
        }
    }
)