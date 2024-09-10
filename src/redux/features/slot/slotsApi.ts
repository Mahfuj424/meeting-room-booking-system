import { baseApi } from "../../../redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
      providesTags: ["Room"], // Add providesTags for automatic refetch
    }),
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/slots",
        method: "POST",
        body: slotInfo,
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
    updateSlot: builder.mutation({
      query: ({ id, ...slotInfo }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: slotInfo,
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"], // Invalidate tags for automatic refetch
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = roomApi;
