/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@mui/material";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../../../../../redux/features/room/roomApi";
import EditRoomForm from "./EditRoomForm";

const RoomListitem = ({ room }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (roomData:any) => {
    console.log(roomData);
    try {
      await updateRoom({ id: room._id, ...roomData }).unwrap();
      Swal.fire({
        title: "Updated!",
        text: "Room details have been updated.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update room details.",
        icon: "error",
      });
    }
    close();
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRoom(room._id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The room has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the room.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <tr className="bg-white border-b text-center">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {room.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {room.roomNo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {room.floorNo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {room.capacity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {room.pricePerSlot}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex gap-5 justify-center">
            <button
              onClick={open}
              className="flex items-center text-blue-500 hover:text-blue-700 transition duration-300"
            >
              <FaRegEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
            >
              <RiDeleteBinLine className="mr-1" /> Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Dialog for editing room */}
      <Dialog
        open={isOpen}
        onClose={close}
        sx={{
          "& .MuiDialog-paper": {
            width: "90%", // Set the dialog width to 70% of the screen
            maxWidth: "none", // Disable the default maxWidth
            overflowY: "auto",
          },
        }}
      >
        <div className="relative bg-white rounded-lg p-6 w-full">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={close}
          >
            <RxCross1 size={20} />
          </button>
          <h3 className="text-xl font-semibold text-center mb-4">Edit Room</h3>

          <EditRoomForm defaultValues={room} onHandleSubmit={handleFormSubmit} isLoading={false} />
        </div>
      </Dialog>
    </>
  );
};

export default RoomListitem;
