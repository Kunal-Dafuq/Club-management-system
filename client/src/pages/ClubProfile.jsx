import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

import { getClubById } from "../services/clubService";

import ClubHero from "../features/clubs/ClubHero";
import ClubStats from "../features/clubs/ClubStats";
import LeadershipCard from "../features/clubs/LeadershipCard";
import MembersList from "../features/clubs/MembersList";
import UpcomingEvents from "../features/clubs/UpcomingEvents";
import AnnouncementBoard from "../features/clubs/AnnouncementBoard";
import ActivityTimeline from "../features/clubs/ActivityTimeline";

const ClubProfile = () => {
    const { id } = useParams();
    const [club,setClub]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchClub=async()=>{
            try{
                const response=await getClubById(id);
                setClub(response.data);
            }

            catch(error){
                console.log(error);
            }

            finally{
                setLoading(false);
            }

        };

        fetchClub();

    },[id]);

    if(loading){
        return <Loader/>;
    }

    return(
        <div className="space-y-8">
            <ClubHero club={club}/>
            <ClubStats club={club}/>
            <LeadershipCard club={club}/>
            <UpcomingEvents club={club}/>
            <AnnouncementBoard announcements={club.announcements}/>
            <ActivityTimeline activities={club.activities}/>
            <MembersList members={club.memberships}/>
        </div>
    );
};

export default ClubProfile;