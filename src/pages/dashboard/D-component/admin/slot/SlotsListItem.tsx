/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import { format, toZonedTime } from "date-fns-tz";
import {
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} from "../../../../../redux/features/slot/slotsApi";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "sonner"; // Importing the toast

interface Slot {
  _id: string;
  room: {
    _id:string
    name: string;
    roomNo: string;
  };
  date: string;
  startTime: string;
  endTime: string;
}

interface SlotListItemProps {
  Slot: Slot;
  roomData: { id: string; name: string }[];
}

const SlotListItem: React.FC<SlotListItemProps> = ({ Slot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot, { isLoading }] = useUpdateSlotMutation();

  // State for form inputs
  const [date, setDate] = useState(Slot?.date || "");
  const [startTime, setStartTime] = useState(Slot?.startTime || "");
  const [endTime, setEndTime] = useState(Slot?.endTime || "");

  useEffect(() => {
    // Convert ISO date string to 'YYYY-MM-DD' format for date input
    const formattedDate = Slot?.date ? Slot?.date.split("T")[0] : "";
    setDate(formattedDate);
    setStartTime(Slot?.startTime || "");
    setEndTime(Slot?.endTime || "");
  }, [Slot, isOpen]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // Format date to only show year, month, and day in Bangladesh Time Zone
  const formatDate = (dateString: string) => {
    const timeZone = "Asia/Dhaka";
    const date = new Date(dateString);
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "yyyy-MM-dd", { timeZone });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSlotData = {
      room: Slot?.room?._id,
      date,
      startTime,
      endTime,
    };
    try {
      await updateSlot({ id: Slot?._id, ...updatedSlotData }).unwrap();
      Swal.fire({
        title: "Updated!",
        text: "Slot details have been updated.",
        icon: "success",
      });
      close();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to update Slot details.";

      // Displaying the error using toast
      toast.error(errorMessage);
    }
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
          await deleteSlot(Slot?._id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The Slot has been deleted.",
            icon: "success",
          });
        } catch (error: any) {
          const errorMessage =
            error?.data?.message || "Failed to delete the Slot.";

          // Displaying the error using toast
          toast.error(errorMessage);
        }
      }
    });
  };

  return (
    <>
      <tr className="bg-white border-b text-center">
        {/* Table Data */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {Slot?.room?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {Slot?.room?.roomNo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(Slot?.date)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {Slot?.startTime}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {Slot?.endTime}
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

      {/* Dialog for editing Slot */}
      <Dialog
        open={isOpen}
        onClose={close}
        sx={{
          "& .MuiDialog-paper": {
            width: "50%",
            maxWidth: "none",
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
          <h3 className="text-xl font-semibold text-center mb-4">Edit Slot</h3>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 p-4 max-w-2xl mx-auto"
          >
            {/* Form Inputs */}
            <div>
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-700"
              >
                Room Name
              </label>
              <input
                type="text"
                readOnly
                id="date"
                value={Slot?.room?.name}
                className="mt-1 py-3 ps-3 block w-full border border-gray-300 rounded-md shadow-sm"
              />
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
                className="bg-primary text-white py-3 w-full rounded-md"
              >
                {isLoading ? (
                  <BiLoaderCircle className="animate-spin w-5 h-5 mx-auto" />
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default SlotListItem;
