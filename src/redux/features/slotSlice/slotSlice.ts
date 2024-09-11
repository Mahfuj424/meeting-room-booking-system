import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Slot type
type Slot = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string[];
};

// Define the initial state with slots
type SlotState = {
  slots: Slot[];
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
