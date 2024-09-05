import { baseApi } from "../../../redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: ["Room"], // Add providesTags for automatic refetch
    }),
    createRoom: builder.mutation({
      query: (roomInfo) => ({
        url: "/rooms",
        method: "POST",
        body: roomInfo,
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
    updateRoom: builder.mutation({
      query: ({ id, ...roomInfo }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: roomInfo,
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
