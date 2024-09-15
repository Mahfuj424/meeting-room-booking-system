import { useSelector } from "react-redux";
import { selectSlots } from "../../redux/features/slotSlice/slotSlice";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { BiLoaderCircle } from "react-icons/bi";
import { ScrollRestoration } from "react-router-dom";

// Define types for Slot, Room, and User
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

interface Room {
  _id: string;
  name: string;
  pricePerSlot: number;
}

interface Slot {
  _id: string;
  room: Room;
  user: User;
  date: string;
  startTime: string;
  endTime: string;
}

// Redux selector should return an array of Slot
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
  });
};

// Merging date and time into a valid Date object
const mergeDateAndTime = (date: string, time: string): Date => {
  return new Date(`${date.split("T")[0]}T${time}:00`);
};

const formatTime = (date: string, time: string): string => {
  const dateTime = mergeDateAndTime(date, time);
  return dateTime.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const calculateDurationInHours = (
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): string => {
  const startDateTime = mergeDateAndTime(startDate, startTime);
  const endDateTime = mergeDateAndTime(endDate, endTime);
  const differenceInMs = endDateTime.getTime() - startDateTime.getTime();
  const hours = differenceInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  return hours.toFixed(2); // Rounded to 2 decimal places
};

const BookingSummary: React.FC = () => {
  const slots: Slot[] = useSelector(selectSlots);
  console.log(slots);
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  if (!slots?.length) {
    return <div>No slots available</div>;
  }

  // Assuming all slots have the same room name and date
  const roomName = slots[0]?.room?.name;
  const roomId = slots[0]?.room?._id;
  const user = slots[0]?.user;
  const pricePerSlot = slots[0]?.room?.pricePerSlot;
  const formattedDate = formatDate(slots[0]?.date);

  // Get the number of slots
  const selectedSlotsCount = slots.length;

  // Find the first and last time
  const startTime = formatTime(slots[0]?.date, slots[0]?.startTime);
  const endTime = formatTime(slots[0]?.date, slots[slots.length - 1]?.endTime);

  // Calculate the total duration in hours
  const totalDuration = calculateDurationInHours(
    slots[0]?.date,
    slots[0]?.startTime,
    slots[slots.length - 1]?.date,
    slots[slots.length - 1]?.endTime
  );

  // Calculate total price for all slots
  const totalPrice = slots?.reduce((total, slotItem) => {
    return total + (slotItem?.room?.pricePerSlot || 0);
  }, 0);

  const slotId = slots.map((slot) => slot?._id);

  const handleBooking = async () => {
    const bookingData = {
      date: formattedDate,
      slots: slotId,
      room: roomId,
      user: user?._id,
    };

    try {
      const res = await createBooking(bookingData).unwrap();
      console.log(res);
      window.location.href = res?.data?.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-24 dark:bg-darkBg">
      <ScrollRestoration />
      <div className="max-w-7xl mx-auto">
        <div className="md:w-2/3 shadow-md border dark:border-none dark:bg-darkCard dark:text-gray-300 rounded-md flex justify-around mx-auto px-8 py-5">
          {/* User Information */}
          <div className="space-y-3">
            <h1>User Information</h1>
            <div className="ms-5">
              <img
                src={user?.image}
                className="w-20 h-20 mt-3 rounded-full"
                alt="User profile"
              />
            </div>
            <h1>
              <span className="text-lg">Name:</span> {user?.name}
            </h1>
            <h1>
              <span className="text-lg">Email:</span> {user?.email}
            </h1>
            <h1>
              <span className="text-lg">Phone:</span> {user?.phone}
            </h1>
            <h1>
              <span className="text-lg">Address:</span> {user?.address}
            </h1>
          </div>

          {/* Booking Summary */}
          <div className="space-y-3 text-xl">
            <h1 className="text-xl font-bold">Booking Summary</h1>
            <h1>
              <span className="text-lg">Room Name:</span> {roomName}
            </h1>
            <h1>
              <span className="text-lg">Date:</span> {formattedDate}
            </h1>
            <h1>
              <span className="text-lg">Selected Slot:</span>{" "}
              {selectedSlotsCount}
            </h1>
            <h1>
              <span className="text-lg">Price Per Slot:</span> ${pricePerSlot}
            </h1>
            <h1>
              <span className="text-lg">Start Time:</span> {startTime}
            </h1>
            <h1>
              <span className="text-lg">End Time:</span> {endTime}
            </h1>
            <h1>
              <span className="text-lg">Total Duration:</span> {totalDuration}{" "}
              hours
            </h1>
            <h1 className="font-semibold text-secondary dark:text-gray-300">
              <span className="text-lg">Total Cost:</span> ${totalPrice}
            </h1>

            <div onClick={handleBooking}>
              <button
                type="submit"
                className="bg-primary text-white py-3 px-4 rounded-md w-full"
              >
                {isLoading ? (
                  <BiLoaderCircle className="mx-auto animate-spin text-white" />
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
