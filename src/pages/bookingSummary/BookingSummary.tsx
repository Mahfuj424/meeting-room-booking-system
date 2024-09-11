import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { selectSlots } from "../../redux/features/slotSlice/slotSlice";
import CustomButton2 from "../../components/customButton/CustomButton";
import { useState } from "react";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
  });
};

// Merging date and time into a valid Date object
const mergeDateAndTime = (date: string, time: string) => {
  return new Date(`${date.split("T")[0]}T${time}:00`);
};

const formatTime = (date: string, time: string) => {
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
) => {
  const startDateTime = mergeDateAndTime(startDate, startTime);
  const endDateTime = mergeDateAndTime(endDate, endTime);
  const differenceInMs = endDateTime.getTime() - startDateTime.getTime();
  const hours = differenceInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  return hours.toFixed(2); // Rounded to 2 decimal places
};

const BookingSummary = () => {
  const user = useAppSelector(selectCurrentUser);
  const slots = useSelector(selectSlots);
  const [showButton, setShowButton] = useState(false);

  const handleShow = () => {
    setShowButton(true);
  };

  if (!slots?.length) {
    return <div>No slots available</div>;
  }

  // Assuming all slots have the same room name and date
  const roomName = slots[0]?.room?.name;
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

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto">
        <div className="md:w-2/3 shadow-md border rounded-md flex justify-around mx-auto px-8 py-5">
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
            <h1 className="font-semibold text-secondary">
              <span className="text-lg">Total Cost:</span> ${totalPrice}
            </h1>
            <div onClick={handleShow}>
              <CustomButton2 name="Proced to Checkout" />
            </div>
            {showButton && (
              <div className="space-x-2">
                <button className="text-white bg-[#635BFF] px-3 py-1 rounded-full">
                  Stripe
                </button>
                <button className="text-white bg-[#FE9900] px-3 py-1 rounded-full">
                  AamarPay
                </button>
                <button className="text-white bg-[#e2136e] px-3 py-1 rounded-full">
                  Bkash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
