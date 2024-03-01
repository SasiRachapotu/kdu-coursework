import React, { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import {
  allSelectContainerStyles,
  dateItemStyle,
  dateTypeStyles,
  mainContainerStyles,
  mainHeaderStyles,
  roomTypeHeadingStyles,
  roomTypesStyle,
  selectRoomTypeContainerStyles,
  submitBtnContainerStyles,
  submitBtnStyles,
} from "../styles/hotelbooking.style";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/thunk/getItems";
import { RootState, store } from "../redux/store";
import { AddOn, RoomType } from "../interfaces/ApiResponse";
import { modifyCurrentPrice, modifyEndDate, modifyStartDate } from "../redux/RoomsSlice";
import SingleItem2 from "./SingleItem2";

function HotelBooking() {
  const roomsDispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const rooms: RoomType[] = useSelector(
    (store: RootState) => store.rooms.roomTypes
  );

  const addOns: AddOn[] = useSelector((store: RootState) => store.rooms.addOns);

  const price: number = useSelector((store: RootState) => store.rooms.price);
  const startDateStore: Date = useSelector((store: RootState) => store.rooms.startDate);
  const endDateStore: Date = useSelector((store: RootState) => store.rooms.endDate);
  const currentSelected: string = useSelector((store: RootState) => store.rooms.currentSelected);
  const selectedaddOns:string[] = useSelector((store: RootState) => store.rooms.selectedAddon);
  const currentprice:number = useSelector((store:RootState)=>store.rooms.price);
  useEffect(() => {
    roomsDispatch(getRooms());
  }, [roomsDispatch]);

  function startDateHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(e.target.valueAsDate!);
    console.log(e.target.valueAsDate);
    roomsDispatch(modifyStartDate(e.target.valueAsDate!))
  }

  function endDateHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(e.target.valueAsDate!);
    console.log(e.target.valueAsDate);
    roomsDispatch(modifyEndDate(e.target.valueAsDate!))
    roomsDispatch(modifyCurrentPrice(0))
  }
  function submitListener(e){
    console.log("room type"+currentSelected);
    console.log("Selected addons"+selectedaddOns);
    console.log("Start date"+startDate);
    console.log("End Date"+endDate);
    console.log("Price:"+price);
  }
  return (
    <div className="main-container" style={mainContainerStyles}>
      <div className="main-header" style={mainHeaderStyles}>
        Hotel Booking
      </div>
      <div className="all-select-containers" style={allSelectContainerStyles}>
        <div
          className="select-room-type-container"
          style={selectRoomTypeContainerStyles}
        >
          <div className="room-type-heading" style={roomTypeHeadingStyles}>
            Select Room Type
          </div>
          <div className="room-types" style={roomTypesStyle}>
            {rooms.roomTypes?.map((room) => {
              return <SingleItem {...{ name: room.name }}></SingleItem>;
            })}
          </div>
        </div>
        <div
          className="select-room-type-container"
          style={selectRoomTypeContainerStyles}
        >
          <div className="room-type-heading" style={roomTypeHeadingStyles}>
            Select Date
          </div>
          <div className="date-types" style={dateTypeStyles}>
            <div className="start-date">
              <input
                type="date"
                className="start-date-input"
                style={dateItemStyle}
                onChange={(e) => {
                  startDateHandler(e);
                }}
              ></input>
            </div>
            <div className="end-date">
              <input
                type="date"
                className="end-date-input"
                style={dateItemStyle}
                onChange={(e) => {
                  endDateHandler(e);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div
          className="select-room-type-container"
          style={selectRoomTypeContainerStyles}
        >
          <div className="room-type-heading" style={roomTypeHeadingStyles}>
            Select additional adds on/ preferences
          </div>
          <div className="room-types" style={roomTypesStyle}>
            {addOns?.map((room) => {
              return <SingleItem2 {...{ name: room.name }}></SingleItem2>;
            })}
          </div>
        </div>

        <div className="submit-btn-conatiner" style={submitBtnContainerStyles}>
          <div className="cost-price">Cost + 18% GST = {price}</div>

          <button className="submit-btn" style={submitBtnStyles} onClick={(e)=>{submitListener(e)}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelBooking;
