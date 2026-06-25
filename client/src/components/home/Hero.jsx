import AnimatedButton from "../AnimatedGrid";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <div
        className="
        absolute
        top-20
        left-20
        h-72
        w-72
        rounded-full
        bg-violet-700/30
        blur-[120px]"
      />

      <div
        className="
        absolute
        bottom-20
        right-20
        h-72
        w-72
        rounded-full
        bg-cyan-500/30
        blur-[120px]"
      />

      <div
        className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
        min-h-screen"
      >

        <div
          className="
          mb-6
          rounded-full
          border
          border-white/10
          bg-white/5
          px-5
          py-2"
        >
          🚀 College Club Ecosystem
        </div>

        <h1
          className="
          max-w-5xl
          text-6xl
          font-bold
          leading-tight"
        >
          Transform Student Communities Into A Digital Universe
        </h1>

        <p
          className="
          mt-8
          max-w-3xl
          text-lg
          text-zinc-400"
        >
          Discover clubs, manage events, track participation and build an engaging campus experience.
        </p>

        <div className="mt-10 flex gap-6">

          <AnimatedButton>
            Explore Clubs
          </AnimatedButton>

          <AnimatedButton>
            View Events
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;