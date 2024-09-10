import { baseApi } from "../../../redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: ({
        search,
        capacity,
        minPrice,
        maxPrice,
        sortBy,
        page = 1,
        limit = 6,
      }) => ({
        url: "/rooms",
        method: "GET",
        params: {
          search,
          capacity,
          minPrice,
          maxPrice,
          sortBy,
          page,
          limit,
        },
      }),
      providesTags: ["Room"],
    }),
    getSingleRoom: builder.query({
      query: (id: string) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Room", id }],
    }),
    createRoom: builder.mutation({
      query: (roomInfo) => ({
        url: "/rooms",
        method: "POST",
        body: roomInfo,
      }),
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation({
      query: ({ id, ...roomInfo }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: roomInfo,
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetSingleRoomQuery, // Add this for single room fetching
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
