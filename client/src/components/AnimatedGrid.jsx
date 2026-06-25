const AnimatedButton = ({ children }) => {

  return (

    <button
      className="
      px-6
      py-3
      rounded-full
      bg-violet-600
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-lg
      cursor-pointer"
    >
      {children}
    </button>
  );
};

export default AnimatedButton;