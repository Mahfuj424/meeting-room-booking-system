import React from "react";

import RoomListitem from "./RoomListitem";
import { useGetAllRoomsQuery } from "../../../../../redux/features/room/roomApi";

type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
};

const RoomList: React.FC = () => {
  const { data } = useGetAllRoomsQuery(undefined);
  const roomData = data?.data;

  return (
    <div>
      <table className="min-w-full bg-white border-gray-200">
        <thead className="border-y-2">
          <tr>
            <th className="p-4 text-center font-bold text-gray-700">Name</th>
            <th className="p-4 text-center font-bold text-gray-700">Room No</th>
            <th className="p-4 text-center font-bold text-gray-700">
              Floor No
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              Capacity
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              Price Per Slot
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomData?.map((room: TRoom) => (
            <RoomListitem room={room}></RoomListitem>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
