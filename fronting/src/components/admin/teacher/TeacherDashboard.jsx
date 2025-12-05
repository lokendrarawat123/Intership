import React, { useState } from "react";
import {
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useGetAllTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacherSlice";
import { Loading } from "../../shared/Loading";
import { Error } from "../../shared/Error";
import { toast } from "react-toastify";
const intialData = {
  name: "",
  email: "",
  position: "",
  phone: "",
};

export const TeacherDashboard = () => {
  const { data, isLoading, error } = useGetAllTeacherQuery(); // for get teacher api
  const [deleteTeacher] = useDeleteTeacherMutation(); // for delete teacher api
  const [updateTeacher] = useUpdateTeacherMutation();
  const [addTeacher] = useAddTeacherMutation();
  const [teacherId, setTeacherId] = useState(); // for get teacher id
  const [isMoalOpen, setIsModalOpen] = useState(false); // for edit form open or close
  const [selectedTeacher, setSelectedTeacher] = useState({}); // for new input value in edit form

  const [isAdding, setIsAdding] = useState(false); // for update teacher api
  const [formData, setFormData] = useState(intialData);
  // console.log(data);
  const teachers = data?.data;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDelete = async (teacher) => {
    setTeacherId(teacher.id);
    // console.log(teacher.id);
    // toast.error("hey");
    try {
      // await deleteTeacher(teacherId).unwrap(); // for use state
      await deleteTeacher(teacher.id).unwrap(); // for  direct api call.
      toast.success("teacher deleted succesfully");
    } catch (error) {
      toast.error("failed to delete teacher");
    }
  };
  // console.log(teacherId);

  const handleEdit = (teacher) => {
    setIsModalOpen(true);
    setIsAdding(false);
    // setSelectedTeacher(teacher);
    setTeacherId(teacher.id);
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
    });
    // toast.error("hey ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) {
      try {
        const res = await addTeacher(formData).unwrap();
        toast.success(res.message || "teacher added succesfully!!!");
        setFormData(intialData);
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.data?.message || "failed to add");
      }
      return;
    }
    const changedFields = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== selectedTeacher[key]) {
        changedFields[key] = formData[key];
      }
    });
    if (Object.keys(changedFields).length === 0) {
      toast.info("no change detect");
      return;
    }
    try {
      const res = await updateTeacher({
        id: teacherId,
        data: changedFields,
      }).unwrap();
      console.log(res);
      toast.success(res.message || " update teacher succesfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "failed to update teacher");
    }
  };
  const handleAdd = () => {
    setIsModalOpen(true);
    setIsAdding(true);
    setTeacherId(null);
    setSelectedTeacher({});
    setFormData(intialData);
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  if (error) {
    return <Error Error={Error} />;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Teachers List</h1>
        <button
          onClick={handleAdd}
          className="cursor-pointer bg-green-400 text-white px-3 rounded-full"
        >
          Add New Teacher
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${teacher.img}`}
                    alt={teacher.img ? teacher.name : "No Image"}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.phone}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="space-x-4">
                    <button
                      onClick={() => handleDelete(teacher)}
                      className="cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No teacher data found</p>
        )}
      </div>

      {isMoalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "Add" : "Edit"} Teacher
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                value={formData?.name || ""}
                type="text"
                id="name"
                placeholder="Name"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.email || ""}
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.position || ""}
                type="text"
                id="position"
                placeholder="Position"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.phone || ""}
                type="text"
                id="phone"
                placeholder="Phone"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className=" cursor-pointer px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isAdding ? "Add Teacher" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
