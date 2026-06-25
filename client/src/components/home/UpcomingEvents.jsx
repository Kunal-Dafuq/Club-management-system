const UpcomingEvents = () => {
  return (
    <section className="py-32 px-10">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">

          Upcoming Events

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[1,2,3].map((item)=>(

            <div
              key={item}
              className="
              h-80
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8"
            >
              <h3 className="text-2xl font-bold">

                Event {item}

              </h3>

              <p className="mt-6 text-zinc-400">

                Event description

              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;