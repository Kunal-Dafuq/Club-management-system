import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="h-16 border-b border-gray-700 bg-black px-6 flex items-center justify-between">
      <div className="text-2xl font-bold">
        ClubPlanet
      </div>

      <div className="w-1/3">

        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg bg-gray-900 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">

        <button>
          🔔
        </button>
        <span>
          {user?.name}
        </span>

        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;