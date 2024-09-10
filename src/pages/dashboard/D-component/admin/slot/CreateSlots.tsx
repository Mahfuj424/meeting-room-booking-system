/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetAllRoomsQuery } from "../../../../../redux/features/room/roomApi";
import { useCreateSlotMutation } from "../../../../../redux/features/slot/slotsApi";
import { toast } from "sonner";
import { BiLoaderCircle } from "react-icons/bi";

const CreateSlot: React.FC = () => {
  const { data } = useGetAllRoomsQuery({ sortby: "Default" });
  const roomData = data?.data || [];
  const [createSlot, { isLoading }] = useCreateSlotMutation();

  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const room = roomData.find((room) => room.name === selectedRoom);
    console.log(room?._id);

    if (room) {
      const slotInfo = {
        room: room._id,
        date,
        startTime,
        endTime,
      };

      try {
        await createSlot(slotInfo).unwrap();
        toast.success("Slot created successfully!");
        setSelectedRoom("");
        setDate("");
        setStartTime("");
        setEndTime("");
      } catch (error) {
        console.error("Error creating slot:", error);
        const errorMessage =
          (error as any).data?.message ||
          "Failed to create slot. Please try again.";
        toast.error(errorMessage);
      }
    } else {
      toast.error("Selected room not found.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-secondary">
        Create Slot
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-2xl mx-auto">
        <div>
          <label
            htmlFor="room"
            className="block text-lg font-medium text-gray-700"
          >
            Select Room
          </label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="mt-1 py-3 ps-3 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select a room
            </option>
            {roomData.map((room) => (
              <option key={room.id} value={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 py-3 ps-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-lg font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 py-3 ps-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="block text-lg font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 py-3 ps-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="bg-primary text-white py-3 px-4 rounded-md w-full"
          >
            {isLoading ? (
              <BiLoaderCircle className="mx-auto animate-spin text-white" />
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
