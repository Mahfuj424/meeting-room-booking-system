/* eslint-disable @typescript-eslint/no-explicit-any */
const MyBookingList = ({ room }:any) => {
  const slots = room?.slots || [];
  const firstStartTime = slots.length > 0 ? slots[0]?.startTime : "N/A";
  const lastEndTime =
    slots.length > 0 ? slots[slots.length - 1]?.endTime : "N/A";

  return (
    <tr className="bg-white border-b text-center">
      {/* Table Data */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {room?.room?.name}
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
    </tr>
  );
};

export default MyBookingList;
