import ClubStats from "./ClubStats";
import LeadershipCard from "./LeadershipCard";
import UpcomingEvents from "./UpcomingEvents";
import MembersList from "./MembersList";
import Announcements from "./Announcements";
import RecentActivity from "./RecentActivity";
import PendingRequests from "./PendingRequests";
import CoordinatorPanel from "./CoordinatorPanel";
import ActivityTimeline from "./ActivityTimeline";

const ClubDetails = ({ club }) => {

    if (!club) {
        return (
            <div className="rounded-2xl bg-zinc-900 p-6">
                <h2 className="text-xl font-bold">
                    Select a club
                </h2>

                <p className="text-zinc-400 mt-3">
                    Click any club to view details.
                </p>
            </div>
        );
    }

    const approvedMembers =
        club.memberships.filter(
            m => m.status === "APPROVED"
        );

    const upcomingEvents =
        club.events.filter(
            event =>
                new Date(event.startTime) >
                new Date()
        );

    const announcements = [
        {
            id:1,
            title:"Orientation Meeting",
            content:"All new members must attend Sunday's meeting.",
            createdAt:new Date()
        },

        {
            id:2,
            title:"Hackathon Registration",
            content:"Registrations close tomorrow.",
            createdAt:new Date()
        }

    ];

    const activities = [
        {
            id:1,
            text:"Aarav joined the club.",
            time:"2 hours ago"
        },

        {
            id:2,
            text:"AI Workshop event created.",
            time:"Yesterday"
        },

        {
            id:3,
            text:"Hackathon announcement posted.",
            time:"3 days ago"
        }

    ];

    return (

        <div className="space-y-6">
            <div className="rounded-2xl bg-zinc-900 overflow-hidden">
                <img
                    src={
                        club.bannerImage ||
                        "https://placehold.co/800x300?text=Club+Banner"
                    }
                    alt=""
                    className="w-full h-48 object-cover"
                />

                <div className="flex justify-between items-start">

                  <div>

                      <h1 className="text-3xl font-bold">
                          {club.name}
                      </h1>

                      <p className="text-zinc-400 mt-2">
                          {club.description}
                      </p>

                  </div>

                  <button
                      className="
                      bg-violet-600
                      hover:bg-violet-700
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      transition"
                  >
                      Join Club
                  </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-zinc-900 p-5">

                    <h2 className="text-zinc-400">
                        Members
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {approvedMembers.length}
                    </p>

                </div>

                <div className="rounded-xl bg-zinc-900 p-5">

                    <h2 className="text-zinc-400">
                        Upcoming Events
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {upcomingEvents.length}
                    </p>
                </div>
            </div>

            <ClubStats club={club} 
            />

            <LeadershipCard
                members={approvedMembers}
            />

            <ClubUpcomingEvents
                events={upcomingEvents}
            />

            <MembersList
                members={approvedMembers}
            />

            <ActivityTimeline 
                clubId={club.id} 
            />
            
            <CoordinatorPanel
                membership={membership}
                club={club}
            />

            <PendingRequests
                clubId={club.id}
            />

            <Announcements
                announcements={announcements}
            />
        </div>
    );
};

export default ClubDetails;