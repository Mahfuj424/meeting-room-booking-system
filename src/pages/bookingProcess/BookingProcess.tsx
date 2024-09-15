/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useGetAllSlotQuery } from "../../redux/features/slot/slotsApi";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import CustomButton2 from "../../components/customButton/CustomButton";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSlot } from "../../redux/features/slotSlice/slotSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Add custom styles for the date picker if necessary

interface Slot {
  _id: string;
  room: {
    _id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
}

interface User {
  name: string;
  email: string;
  address: string;
  phone: string;
  image?: string;
}

const BookingProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetAllSlotQuery(undefined);
  const slots: Slot[] = data?.data || [];
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const user: User = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (date: Date | string): string => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  // Get the earliest available slot date from the slots array
  const getEarliestSlotDate = () => {
    if (slots.length === 0) return new Date(); // Fallback to today if no slots available

    const sortedSlots = slots
      .filter((slot) => slot.room._id === id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return new Date(sortedSlots[0].date); // Get the earliest date from sorted slots
  };

  const minSelectableDate = getEarliestSlotDate(); // Dynamically set min selectable date
  const today = new Date();

  useEffect(() => {
    if (slots.length > 0) {
      const roomSlots = slots.filter((slot) => slot.room._id === id);
      const availableDates = roomSlots.map((slot) => dayjs(slot.date).date());
      setHighlightedDays(availableDates);
    }
  }, [slots, id]);

  const handleSlotSelection = (slot: Slot) => {
    const isSelected = selectedSlots.some((s) => s._id === slot._id);
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s._id !== slot._id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const filteredSlots = slots.filter(
    (slot) =>
      slot?.room?._id === id &&
      formatDate(slot?.date) === formatDate(selectedDate)
  );

  const handleMonthChange = (date: Date) => {
    const roomSlots = slots.filter(
      (slot) =>
        slot.room._id === id && dayjs(slot.date).month() === dayjs(date).month()
    );
    const availableDates = roomSlots.map((slot) => dayjs(slot.date).date());
    setHighlightedDays(availableDates);
  };

  const handleDateChange = (date: any) => {
    // Ensure that the selected date is today or later
    if (date >= today) {
      setSelectedDate(date);
    }
  };

  const handleAddSlot = () => {
    const mappedSlots = selectedSlots.map((slot) => ({
      ...slot,
      user, // Optionally add user data if required
    }));

    // Dispatch the updated slots array to the Redux store
    if (mappedSlots.length > 0) {
      dispatch(addSlot(mappedSlots));
      navigate("/booking-summary"); // Navigate to the booking summary page
    }
  };

  return (
    <div className="dark:bg-darkBg dark:text-gray-300">
      <ScrollRestoration />
      <div className="pt-24 max-w-7xl mx-auto pb-20 px-4">
        <div className="md:flex justify-between mb-4">
          {/* Date Picker */}
          <div className="w-full md:w-[500px] p-6">
            <label className="block mb-3 text-2xl font-semibold dark:text-white text-gray-900">
              Select Date
            </label>
            <DatePicker
              className="w-[800px]"
              selected={selectedDate}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange}
              minDate={minSelectableDate} // Set the minimum date to the earliest available slot date
              inline
              highlightDates={highlightedDays.map(
                (day) =>
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    day
                  )
              )}
              calendarClassName="shadow-md  rounded-lg dark:bg-darkCard p-3"
              dayClassName={(date: any) =>
                highlightedDays.includes(date.getDate())
                  ? "highlighted-day"
                  : ""
              }
            />
          </div>

          {/* User Information Section */}
          <div className="border shadow-md dark:bg-darkCard dark:border-none p-4 rounded-md w-full md:w-1/2 mb-10">
            <h3 className="text-lg text-secondary dark:text-gray-300 font-semibold text-center">
              User Information
            </h3>
            <div className="flex justify-center my-5">
              <img
                src={user?.image}
                className="w-20 h-20 rounded-full"
                alt="User profile"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 items-center">
              {["name", "email", "address", "phone"].map((field) => (
                <p className="flex-col flex" key={field}>
                  <TextField
                    defaultValue={user?.[field as keyof User]}
                    label={field}
                  />
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Table showing available slots */}
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Room Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSlots.map((slot) => (
              <tr key={slot._id} className="text-center">
                <td className="border px-4 py-2">{slot.room.name}</td>
                <td className="border px-4 py-2">{formatDate(slot.date)}</td>
                <td className="border px-4 py-2">{slot.startTime}</td>
                <td className="border px-4 py-2">{slot.endTime}</td>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedSlots.some((s) => s._id === slot._id)}
                    onChange={() => handleSlotSelection(slot)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display selected slots */}
        <div className="flex justify-end">
          <div className="mt-4">
            <h3 className="text-xl">Selected Slots:</h3>
            {selectedSlots.map((slot, index) => (
              <div key={slot._id} className="flex gap-2 items-center">
                <h1 className="font-bold">{index + 1}.</h1>
                <div>{`${slot.room.name} - ${slot.startTime} to ${slot.endTime}`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add selected slots to store and navigate */}
        <div
          onClick={handleAddSlot}
          className={`text-right mt-5 ${
            selectedSlots.length > 0 ? "" : "hidden"
          }`}
        >
          <CustomButton2 name="Proceed To Booking" />
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
