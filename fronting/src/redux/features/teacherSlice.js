import { indexSlice } from "./indexSlice";

export const teacherApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all teacher
    getAllTeacher: builder.query({
      query: ({ page, limit }) => ({
        url: `/teacher/get-teacher?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),

    // ADD teacher
    addTeacher: builder.mutation({
      query: (data) => ({
        url: `/teacher/add-teacher`,
        method: "POST",
        body: data, // FormData
      }),
      invalidatesTags: ["teacher"],
    }),

    // DELETE teacher
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete-teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),

    // UPDATE teacher (fixed)
    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/update-teacher/${id}`,
        method: "PATCH",
        body: data, // FormData or simple object
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});

export const {
  useGetAllTeacherQuery,
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherApi;
