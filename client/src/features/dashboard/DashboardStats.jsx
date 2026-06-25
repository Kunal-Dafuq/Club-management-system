const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title:"Clubs",
      value:stats.clubs
    },

    {

      title:"Events",
      value:stats.events
    },

    {
      title:"Notifications",
      value:stats.notifications
    },

    {
      title:"RSVPs",
      value:stats.rsvps
    }
  ];

  return (

    <div
      className="
      grid
      md:grid-cols-4
      gap-6"
    >

      {
        cards.map((card)=>(

          <div
            key={card.title}
            className="
            bg-zinc-900
            rounded-xl
            p-6"
          >

            <h3
              className="
              text-zinc-400"
            >

              {card.title}

            </h3>

            <p
              className="
              text-4xl
              font-bold
              mt-3"
            >

              {card.value}

            </p>
          </div>
        ))
      }
    </div>
  );
};

export default DashboardStats;