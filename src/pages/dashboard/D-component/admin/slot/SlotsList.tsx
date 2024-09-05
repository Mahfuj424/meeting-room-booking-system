/* eslint-disable @typescript-eslint/no-explicit-any */
import SyncLoader from "react-spinners/SyncLoader";
import { useGetAllSlotQuery } from "../../../../../redux/features/slot/slotsApi";
import React from "react";
import SlotListItem from "./SlotsListItem";

const SlotsList: React.FC = () => {
  const { data, isLoading } = useGetAllSlotQuery(undefined);
  const slotData = data?.data;
  return (
    <div>
      <table className="min-w-full bg-white border-gray-200">
        <thead className="border-y-2">
          <tr>
            <th className="p-4 text-center font-bold text-gray-700">
              Room Name
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Room No</th>
            <th className="p-4 text-center font-bold text-gray-700">Date</th>
            <th className="p-4 text-center font-bold text-gray-700">
              Start Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              End Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="text-primary flex justify-center mt-10">
              <SyncLoader />
            </div>
          ) : (
            slotData?.map((slot: any) => <SlotListItem Slot={slot}></SlotListItem>)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlotsList;
