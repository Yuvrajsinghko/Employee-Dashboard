import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div className="flex justify-between items-center p-4 border-b-2">
      <h1 className="text-lg font-semibold">Employee Dashboard</h1>
      <div className="flex gap-10">
        <Link to="/list" className="text-zinc-500 text-lg font-semibold border p-2 rounded-2xl hover:bg-zinc-400">
          List
        </Link>

        <Link to="/details/1" className="text-zinc-500 text-lg font-semibold border p-2 rounded-2xl hover:bg-zinc-400">
          Details
        </Link>

        <Link to="/results" className="text-zinc-500 text-lg font-semibold border p-2 rounded-2xl hover:bg-zinc-400">
          Results
        </Link>
      </div>
      <button
        onClick={logout}
        className="p-3 bg-red-500 text-white rounded-2xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
