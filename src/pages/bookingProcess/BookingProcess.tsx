import React, { useState, useEffect } from "react";
import { useGetAllSlotQuery } from "../../redux/features/slot/slotsApi";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import CustomButton2 from "../../components/customButton/CustomButton";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSlot } from "../../redux/features/slotSlice/slotSlice"; // Import the addSlot action

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
}

const BookingProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Room ID from URL params
  const { data } = useGetAllSlotQuery(undefined); // Fetch all available slots
  const slots: Slot[] = data?.data || []; // Default to empty array if no data is present
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]); // Track selected slots
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // Track selected date
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]); // Track highlighted days
  const user: User = useAppSelector(selectCurrentUser); // Get user data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate to programmatically redirect

  // Function to format the date
  const formatDate = (date: Dayjs | string): string => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  // Extract available dates for highlighting from the slots data
  useEffect(() => {
    const roomSlots = slots.filter((slot) => slot.room._id === id);
    const availableDates = roomSlots.map((slot) => dayjs(slot.date).date());
    setHighlightedDays(availableDates);
  }, [slots, id]);

  // Handle slot selection when a checkbox is clicked
  const handleSlotSelection = (slot: Slot) => {
    const isSelected = selectedSlots.some((s) => s._id === slot._id);
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s._id !== slot._id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  // Filter slots by room ID and selected date
  const filteredSlots = slots.filter(
    (slot) =>
      slot?.room?._id === id &&
      formatDate(slot?.date) === formatDate(selectedDate)
  );

  // Custom PickersDay component to display the highlighted days
  const ServerDay = (
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.includes(day.date());

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "✅" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  // Handle month change to refetch the highlighted days
  const handleMonthChange = (date: Dayjs) => {
    const roomSlots = slots.filter(
      (slot) =>
        slot.room._id === id && dayjs(slot.date).month() === date.month()
    );
    const availableDates = roomSlots.map((slot) => dayjs(slot.date).date());
    setHighlightedDays(availableDates);
  };

  // Function to map and dispatch selected slots
  const handleAddSlot = () => {
    const mappedSlots = selectedSlots.map((slot) => ({
      ...slot,
      user: user, // Optionally add user data if required
    }));

    // Dispatch the updated slots array to the Redux store
    if (mappedSlots.length > 0) {
      dispatch(addSlot(mappedSlots));
      navigate("/booking-summary"); // Navigate to the booking summary page
    }
  };

  return (
    <div className="dark:bg-darkBg">
      <div className="pt-24 max-w-7xl mx-auto pb-20 px-4">
        <div className="md:flex justify-between mb-4">
          {/* Date Picker */}
          <div>
            <label className="block mb-2 text-xl font-medium dark:text-white text-gray-900">
              Select Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className="shadow-md rounded"
                value={selectedDate}
                onChange={(newDate: Dayjs | null) => {
                  if (newDate) setSelectedDate(newDate);
                }}
                onMonthChange={handleMonthChange}
                slots={{ day: ServerDay }}
                slotProps={{ day: { highlightedDays } }}
                renderLoading={() => <DayCalendarSkeleton />}
              />
            </LocalizationProvider>
          </div>

          {/* User Information Section */}
          <div className="border shadow-md p-4 rounded-md w-full md:w-1/2 mb-10">
            <h3 className="text-lg text-secondary font-semibold text-center">
              User Information
            </h3>
            <div className="flex justify-center my-5">
              <img
                src={user?.image}
                className="w-20 h-20 rounded-full"
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 gap-5 items-center">
              {/* User Fields */}
              {["name", "email", "address", "phone"].map((field) => (
                <p className="flex-col flex" key={field}>
                  <TextField
                    defaultValue={user?.[field]}
                    id={`demo-helper-text-misaligned-${field}`}
                    label={field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Table showing available slots */}
        <table className="min-w-full border ">
          <thead className="">
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
          <div className="mt-4 ">
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
          <CustomButton2
            name="Proceed To Booking"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
