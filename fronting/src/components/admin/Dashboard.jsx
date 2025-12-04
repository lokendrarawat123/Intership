import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authState";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signout] = useSignOutMutation();
  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, []);
  const handleLogout = async () => {
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "logout");
      navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "logout failed");
    }
    dispatch(logout());
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="bg-blue-950 pt-4">
          <Link
            to="/dashboard/teacher"
            className="text-white text-xl p-3 bg-amber-400 m-1 rounded-md"
          >
            Teacher
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto">
          <h1 className="font bold text-3xl">Welcome {email}</h1>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
