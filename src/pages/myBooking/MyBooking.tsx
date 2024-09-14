/* eslint-disable @typescript-eslint/no-explicit-any */

import MyBookingList from "./MyBookingList";
import { useGetMyBookingsQuery } from "../../redux/features/booking/bookingApi";
import SyncLoader from "react-spinners/SyncLoader";
import './style.css'

const MyBooking = () => {
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  const bookingData = data?.data;
  return (
    <div className="h-screen pt-24 max-w-7xl mx-auto overflow-y-auto">
      <h1 className="text-secondary dark:text-white text-2xl font-semibold mb-5 text-center">All Booking Rooms</h1>
      <table className="min-w-full bg-white border-gray-200">
        <thead className="border-y-2">
          <tr>
            <th className="p-4 text-center font-bold text-gray-700">
              Room Name
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              Date
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              Start Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              End Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="text-primary flex justify-center mt-10">
              <SyncLoader />
            </div>
          ) : (
            bookingData?.map((room: any) => <MyBookingList room={room} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooking;
