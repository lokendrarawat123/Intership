import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authState";
import { Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, [isAuth]);
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
