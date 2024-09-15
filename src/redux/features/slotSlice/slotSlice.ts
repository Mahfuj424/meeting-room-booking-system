/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Room type
type Room = {
  _id: string;
  name: string;
};

// Define the Slot type
type Slot = {
  _id: string | any;
  date: string | any;
  startTime: string | any;
  endTime: string | any;
  room: Room[] | any; // Updated to reflect an array of Room objects instead of strings
};

// Define the initial state with slots
type SlotState = {
  slots: Slot[] | any;
};

const initialState: SlotState = {
  slots: [],
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    // Add a new array of slots to the state (replace existing slots)
    addSlot: (state, action: PayloadAction<Slot[]>) => {
      state.slots = action.payload; // Directly set the new array of slots
    },
  },
});

// Export actions to use in components
export const { addSlot } = slotSlice.actions;

// Selector to get all slots
export const selectSlots = (state: { slot: SlotState }) => state.slot?.slots;

export default slotSlice.reducer;
