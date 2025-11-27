import { indexSlice } from "./indexSlice";
export const teacherApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get all teacher   // for query =get data amd moutation =post delete update

    getAllTeacher: builder.query({
      query: () => ({
        url: "/teacher/get-teacher",
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),
    addTeacher: builder.mutation({
      query: () => ({
        url: "/teacher/add-teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});
export const { useGetAllTeacherQuery, useAddTeacherMutation } = teacherApi;
