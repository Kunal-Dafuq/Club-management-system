const clubs = [

  "AI Club",

  "Coding Club",

  "Music Club",

  "Dance Club",

  "Sports Club",

  "Photography Club"

];

const ClubUniverse = () => {
  return (
    <section className="py-32 px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20">

          Explore Club Universe

        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          {clubs.map((club) => (

            <div
              key={club}
              className="
              h-64
              rounded-3x
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              flex
              items-center
              justify-center
              text-2xl
              transition-all
              duration-300
              hover:-translate-y-3
              hover:scale-105
              cursor-pointer"
            >
              {club}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubUniverse;