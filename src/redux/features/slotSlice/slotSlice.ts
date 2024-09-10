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
    // Add a new slot to the state
    addSlot: (state, action: PayloadAction<Slot>) => {
      const newSlot = action.payload;
      state.slots.push(newSlot);
    },

    // Update an existing slot
    updateSlot: (state, action: PayloadAction<Slot>) => {
      const updatedSlot = action.payload;
      const index = state.slots.findIndex(
        (slot) => slot._id === updatedSlot._id
      );
      if (index !== -1) {
        state.slots[index] = updatedSlot;
      }
    },

    // Remove a slot from the state
    removeSlot: (state, action: PayloadAction<string>) => {
      state.slots = state.slots.filter((slot) => slot._id !== action.payload);
    },
  },
});

// Export actions to use in components
export const { addSlot, updateSlot, removeSlot } = slotSlice.actions;

// Selector to get all slots
export const selectSlots = (state: { slot: SlotState }) => state.slot?.slots;

export default slotSlice.reducer;
