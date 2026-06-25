import ClubCard from "./ClubCard";

const ClubGrid = ({clubs, onSelect}) => {
  if(!clubs.length){
    return (
      <div>
        No clubs found
      </div>
    );
  }

  return (

    <div
      className="
      grid
      md:grid-cols-2
      lg:grid-cols-3
      gap-6"
    >

      {

        clubs.map((club)=>(

          <ClubCard
            key={club.id}
            club={club}
            onSelect={onSelect}
          />
        ))
      }
    </div>
  );
};

export default ClubGrid;