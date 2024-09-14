import SyncLoader from "react-spinners/SyncLoader";
import { useGetAllBookingsQuery } from "../../../../redux/features/booking/bookingApi";
import BookingListItem from "./BookingListItem";

const Booking: React.FC = () => {

  const {data, isLoading}=useGetAllBookingsQuery(undefined)
  const bookingData = data?.data
  console.log(bookingData);
  return (
    <div>
      <table className="min-w-full bg-white border-gray-200">
        <thead className="border-y-2">
          <tr>
            <th className="p-4 text-center font-bold text-gray-700">
              Room Name
            </th>
            <th className="p-4 text-center font-bold text-gray-700">User Name</th>
            <th className="p-4 text-center font-bold text-gray-700">Date</th>
            <th className="p-4 text-center font-bold text-gray-700">
              Start Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              End Time
            </th>
            <th className="p-4 text-center font-bold text-gray-700">
              Status
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className=" flex justify-center mt-10">
              <SyncLoader color="#1586FD"/>
            </div>
          ) : (
            bookingData?.map((room: any) => (
              <BookingListItem room={room}/>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
