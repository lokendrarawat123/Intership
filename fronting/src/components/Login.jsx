import { useState } from "react";
import { Input } from "./shared/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("please fill all the fields");
      return;
    }
    // console.log(formData);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      toast.success(`${data.message}`);
      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("something went wrong ");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <label className="flex flex-col text-left">
            Email:
            <Input
              type="text"
              placeholder="Enter the email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col text-left">
            Password:
            <Input
              type="text"
              placeholder="Enter your password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
