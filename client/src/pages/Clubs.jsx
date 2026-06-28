import { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import ClubGrid from "../features/clubs/ClubGrid";
import ClubDetails from "../features/clubs/ClubDetails";
import { getClubs } from "../services/clubService";
import {joinClub, leaveClub, getMyClubs} from "../services/membershipService";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loadingClubId, setLoadingClubId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [clubsResponse, myClubsResponse] = await Promise.all([
                getClubs(),
                getMyClubs()
            ]);

            setClubs(clubsResponse.data);

            setMemberships(myClubsResponse.data.clubs);
        }

        catch (error) {
            console.log(error);
            setError("Failed to load clubs.");
        }

        finally {
            setLoading(false);
        }
    };

    fetchData();

  }, []);

  const getMembership = (clubId) =>
    memberships.find(
        membership => membership.club.id === clubId
    );

  const handleJoinClub = async (clubId) => {
    try {
        setLoadingClubId(clubId);
        const membership = getMembership(clubId);
        if (
            membership &&
            membership.status === "APPROVED"
        ) {

            await leaveClub(clubId);

            setMemberships(prev =>
                prev.filter(
                    m => m.club.id !== clubId
                )
            );
        }

        else {
            const response =
                await joinClub(clubId);

            setMemberships(prev => [
                ...prev,
                response.data.membership
            ]);
        }
    }

    catch (error) {
        console.log(error);
    }
    finally {
        setLoadingClubId(null);
    }
  };

  const filteredClubs = useMemo(() => {
      let data = [...clubs];
      if (search) {
          data = data.filter(club =>
              club.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
          );

      }

      switch (sortBy) {
          case "name":
              data.sort((a, b) =>
                  a.name.localeCompare(b.name)
              );

              break;

          default:

              break;
      }

      return data;

  }, [clubs, search, sortBy]);

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

      <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
          mt-4
          rounded-xl
          bg-zinc-900
          p-3"
      >
          <option value="name">

              Name

          </option>

      </select>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ClubGrid
            clubs={filteredClubs}
            onSelect={setSelectedClub}
            onJoin={handleJoinClub}
            memberships={memberships}
            loadingClubId={loadingClubId}
          />
        </div>

        <div>
          <ClubDetails
              club={selectedClub}
              membership={
                  selectedClub
                      ? getMembership(selectedClub.id)
                      : null
              }
          />
        </div>
      </div>
    </div>
  )
};

export default Clubs;