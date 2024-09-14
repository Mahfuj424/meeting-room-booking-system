/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "../../../../redux/features/booking/bookingApi";
import { BiCheck } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const BookingListItem = ({ room }:any) => {
  const slots = room?.slots || [];

  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const firstStartTime = slots.length > 0 ? slots[0]?.startTime : "N/A";
  const lastEndTime =
    slots.length > 0 ? slots[slots.length - 1]?.endTime : "N/A";

  const handleApprove = async () => {
    try {
      await updateBooking({
        bookingId: room?._id,
        updatedData: { isConfirmed: "confirmed" },
      });
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleReject = async () => {
    try {
      await updateBooking({
        bookingId: room?._id,
        updatedData: { isConfirmed: "cancel" },
      });
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const handleDelete = async () => {
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
          await deleteBooking(room?._id);
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting booking:", error);
        }
      }
    });
  };



  return (
    <tr className="bg-white border-b text-center">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {room?.room?.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {room?.user?.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {room?.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {firstStartTime}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {lastEndTime}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          room?.isConfirmed === "pending"
            ? "text-orange-400"
            : room?.isConfirmed === "cancel"
            ? "text-red-500"
            : room?.isConfirmed === "confirmed"
            ? "text-green-500"
            : room?.isConfirmed === "Time-Expired!"
            ? "text-red-600"
            : ""
        }`}
      >
        {room?.isConfirmed}
      </td>
      <td className="py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex gap-5 justify-center">
          {room?.isConfirmed === "Time-Expired!" ||
          room?.isConfirmed === "cancel" ? (
            ""
          ) : (
            <button
              onClick={handleApprove}
              className="flex items-center text-green-500 transition duration-300"
            >
              <BiCheck /> Approve
            </button>
          )}
          {room?.isConfirmed === "confirmed" ||
          room?.isConfirmed === "Time-Expired!" ||
          room?.isConfirmed === "cancel" ? (
            ""
          ) : (
            <button
              onClick={handleReject}
              className="flex items-center text-blue-500 transition duration-300"
            >
              <RxCross2 /> Reject
            </button>
          )}
          {room?.isConfirmed === "confirmed" ? (
            ""
          ) : (
            <button
              onClick={handleDelete}
              className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
            >
              <RiDeleteBinLine className="mr-1" /> Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookingListItem;
