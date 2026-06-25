const ClubDetails = ({ club }) => {
  if (!club) {
    return (
      <div
        className="
        bg-zinc-900
        rounded-xl
        p-6"
      >

        Select a club to view details

      </div>
    );
  }

  return (
    <div
      className="
      bg-zinc-900
      rounded-xl
      p-6
      space-y-4"
    >

      <h2
        className="
        text-3xl
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
        className="
        bg-green-600
        px-4
        py-2
        rounded-lg"
      >
        Join Club
      </button>
    </div>
  );
};

export default ClubDetails;