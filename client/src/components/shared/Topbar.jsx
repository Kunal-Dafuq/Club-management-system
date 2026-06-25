import { useAuth } from "../../contexts/AuthContext";

const Topbar = () => {

  const { user, logout } = useAuth();

  return (

    <header
      className="
      h-16
      border-b
      border-white/10
      flex
      justify-between
      items-center
      px-8"
    >

    <input
      type="text"
      placeholder="Search..."
      className="
       bg-zinc-900
        px-4
        py-2
        rounded-lg
        outline-none"
      />

      <h1 className="font-bold text-xl">

        ClubPlanet

      </h1>

      <div className="flex items-center gap-4">

        <span>

          {user?.name || "User"}

        </span>

        <button

          onClick={logout}
          className="
          bg-red-600
          px-4
          py-2
          rounded-lg"

        >

          Logout

        </button>
      </div>
    </header>
  );
};

export default Topbar;