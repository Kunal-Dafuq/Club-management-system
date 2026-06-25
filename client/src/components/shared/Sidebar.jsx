import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-violet-600 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <aside
      className="
      w-64
      min-h-[calc(100vh-64px)]
      border-r
      border-white/10
      p-6"
    >
      <nav className="space-y-3">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/clubs" className={linkClass}>
          Clubs
        </NavLink>

        <NavLink to="/events" className={linkClass}>
          Events
        </NavLink>

        <NavLink to="/notifications" className={linkClass}>
          Notifications
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;