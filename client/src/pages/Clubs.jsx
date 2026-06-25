import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ClubGrid from "../features/clubs/ClubGrid";
import { getClubs } from "../services/clubService";
import ClubDetails from "../features/clubs/ClubDetails";

const Clubs = () => {
  const [clubs,setClubs]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState("");
  const [selectedClub,setSelectedClub] = useState(null);

  useEffect(()=>{
    const fetchClubs=async()=>{
      try{
        const response=
        await getClubs();
        setClubs(response.data);
      }

      catch(err){
        setError(err);
      }

      finally{
        setLoading(false);
      }
    };

    fetchClubs();

  },[]);

  const filteredClubs = clubs.filter(
    (club) =>
      club.name?.toLowerCase().includes(
        search.toLowerCase()
      )
  );

  if(loading){
    return <Loader/>;
  }

  if(error){
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
        Failed to load clubs
      </div>
    );
  }

  return (

    <div className="space-y-8">

      <h1
        className="text-4xl font-bold"
      >

        Clubs

      </h1>

      <input
        type="text"
        placeholder="Search clubs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}

        className="
          w-full
         bg-zinc-900
          p-3
          rounded-xl
          outline-none"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ClubGrid
            clubs={filteredClubs}
            onSelect={setSelectedClub}
          />
        </div>

        <div>
          <ClubDetails
            club={selectedClub}
          />
        </div>
      </div>
    </div>
  )
};

export default Clubs;