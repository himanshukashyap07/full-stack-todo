import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "../api/useCurrentUser";
import { api } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardHeader() {
  const { data:user } = useCurrentUser();
  const [isClick,setIsClick] = useState(false);
  const navigate = useNavigate();
  const handleLogout =async()=>{
    await api.post("/user/logout");
    toast("logout successfully")
    navigate("/")
  }
  return (
    <header className="flex items-center justify-between bg-blue-600 px-6 py-3 z-50 text-white shadow text-center">
      <div className="text-2xl font-bold tracking-wide">TODO</div>

      <div  
        className="relative"
        onClick={() => setIsClick(!isClick)}
      >
        <FaUserCircle className="h-8 w-8 cursor-pointer" />
        {isClick && user && (
          <div className="absolute right-0 mt-2 w-48 rounded bg-white p-3 text-black shadow-lg z-50">
            <p className="font-semibold">{user.username.toUpperCase()}</p>
            <p className="text-sm text-gray-600 mb-2">{user.email}</p>
            <button className="bg-blue-400 text-black font-bold text-sm py-0.5 px-2 w-28 hover:bg-blue-300" onClick={handleLogout}>logout</button>
          </div>
        )}
      </div>
    </header>
  );
}