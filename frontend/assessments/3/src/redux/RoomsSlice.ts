import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { AddOn, RoomType } from "../interfaces/ApiResponse";
import { getRooms } from "./thunk/getItems";

interface IItemsTemplate {
  roomTypes: RoomType[];
  currentSelected: string;
  addOns: AddOn[];
  price: number;
  startDate: Date;
  endDate: Date;
  selectedAddon:string[];
}

const initialState: IItemsTemplate = {
  roomTypes: [],
  currentSelected: "",
  addOns: [],
  price: 0,
  startDate: new Date(),
  endDate: new Date(),
  selectedAddon:[],
};

export const RoomSlice = createSlice({
  name: "roomslice",
  initialState: initialState,
  reducers: {
    modifyRoomList: (state, action: PayloadAction<RoomType[]>) => {
      state.roomTypes = action.payload;
    },
    modifyCurrentSelected: (state, action: PayloadAction<string>) => {
      state.currentSelected = action.payload;
      console.log(action.payload);
      state.addOns = state.roomTypes.roomTypes.find(
        (room) => room.name.toLowerCase() === action.payload
      )?.addOns;
      state.price = parseFloat(
        state.roomTypes.roomTypes.find(
          (room) => room.name.toLowerCase() === action.payload
        ).costPerNight
      );
      state.price+=state.price*18/100
    },
    modifyCurrentPrice: (state, action: PayloadAction<number>) => {
      const Difference_In_Time = state.endDate.getTime() - state.startDate.getTime();

      // Calculating the no. of days between
      // two dates
      const Difference_In_Days = Math.round(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      state.price =
      Difference_In_Days * state.price;
        state.price+=state.price*18/100
    },
    modifyStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    modifyEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
    modifySelectedAddon:(state,action:PayloadAction<string>)=>{
        state.selectedAddon=[...state.selectedAddon,action.payload]
        const addon = state.addOns.find((addon)=>addon.name.toLowerCase()===action.payload)
        if(addon!=null){
            state.price+=parseFloat(addon.cost)+parseFloat(addon.cost)*18/100;
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.roomTypes = action.payload;
      console.log(state.roomTypes);
    });
  },
});

export const {
  modifyRoomList,
  modifyCurrentSelected,
  modifyCurrentPrice,
  modifyStartDate,
  modifyEndDate,
  modifySelectedAddon
} = RoomSlice.actions;

export const roomSliceReducer = RoomSlice.reducer;
