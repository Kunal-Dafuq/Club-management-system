import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-4">

      <button

        onClick={()=>navigate("/clubs")}
        className="bg-blue-600 px-4 py-2 rounded-lg"

      >
        Explore Clubs
      </button>

      <button

        onClick={()=>navigate("/events")}
        className="bg-green-600 px-4 py-2 rounded-lg"

      >
        View Events
      </button>

      <button

        onClick={()=>navigate("/profile")}
        className="bg-purple-600 px-4 py-2 rounded-lg"

      >
        My Profile
      </button>
    </div>
  );
};

export default QuickActions;