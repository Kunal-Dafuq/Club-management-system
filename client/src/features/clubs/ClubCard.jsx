const ClubCard = ({ club, onSelect }) => {
  return (
    <div
      className="
      bg-zinc-900
      rounded-xl
      p-6
      hover:scale-105
      transition
      space-y-4"
    >

      <h2
        className="
        text-2xl
        font-bold"
      >
        {club.name}
      </h2>

      <p
        className="
        text-zinc-400"
      >
        {club.description}
      </p>

      <button
        onClick={() => onSelect(club)}
        className="
        bg-violet-600
        px-4
        py-2
        rounded-lg"
      >
        View Details
      </button>
    </div>
  );
};

export default ClubCard;