import { baseApi } from "../../../redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new booking
    createBooking: builder.mutation({
      query: (bookingData) => {
        console.log("Booking Data=>", bookingData);
        return {
          url: "/bookings",
          method: "POST",
          body: bookingData,
        };
      },
      invalidatesTags: ["Room"],
    }),

    // Get all bookings (admin only)
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),

    // Get bookings for the logged-in user
    getMyBookings: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),

    // Update a booking (admin only)
    updateBooking: builder.mutation({
      query: ({ bookingId, updatedData }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Room"],
    }),

    // Delete a booking (admin only)
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
