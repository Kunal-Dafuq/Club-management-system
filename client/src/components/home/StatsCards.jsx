const StatsCards = () => {
  return (
    <section className="py-32">
      <div
        className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-4
        gap-8"
      >
        <div className="text-center">
          <h2 className="text-6xl font-bold">
            
            25+

          </h2>

          <p className="text-zinc-400 mt-3">

            Clubs

          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold">

            150+

          </h2>

          <p className="text-zinc-400 mt-3">

            Events

          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold">

            3000+

          </h2>

          <p className="text-zinc-400 mt-3">

            Students

          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold">

            95%

          </h2>

          <p className="text-zinc-400 mt-3">

            Participation

          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsCards;