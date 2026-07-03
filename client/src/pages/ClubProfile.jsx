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

import ClubChat from "../features/clubs/chat/ClubChat";

import { useAuth } from "../context/AuthContext";

const ClubProfile = () => {
    const { id } = useParams();
    const [club,setClub]=useState(null);
    const [loading,setLoading]=useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const { user, token } = useAuth();

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

    return (
        <div className="space-y-6">

            <ClubHero club={club} />

            <div className="flex gap-3 border-b pb-3">

                <button onClick={() => setActiveTab("overview")}>
                    Overview
                </button>

                <button onClick={() => setActiveTab("events")}>
                    Events
                </button>

                <button onClick={() => setActiveTab("announcements")}>
                    Announcements
                </button>

                <button onClick={() => setActiveTab("members")}>
                    Members
                </button>

                <button onClick={() => setActiveTab("committees")}>
                    Committees
                </button>

                <button onClick={() => setActiveTab("chat")}>
                    Chat
                </button>

            </div>

            {activeTab === "overview" && (
                <>
                    <ClubStats club={club} />
                    <LeadershipCard club={club} />
                    <ActivityTimeline activities={club.activities} />
                </>
            )}

            {activeTab === "events" && (
                <UpcomingEvents club={club} />
            )}

            {activeTab === "announcements" && (
                <AnnouncementBoard
                    announcements={club.announcements}
                />
            )}

            {activeTab === "members" && (
                <MembersList
                    members={club.memberships}
                />
            )}

            {activeTab === "committees" && (
                <div>
                    Committees Coming Soon
                </div>
            )}

            {activeTab === "chat" && (
                <ClubChat
                    clubId={club.id}
                    token={token}
                    user={user}
                />
            )}
        </div>
    );
};

export default ClubProfile;