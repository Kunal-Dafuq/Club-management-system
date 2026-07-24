import { Pin } from "lucide-react";
import { Link } from "react-router-dom";

const ClubHero = ({ club }) => {
    return (
        <div className="rounded-3xl overflow-hidden bg-zinc-900">

            <div
                className="relative h-72"
                style={{
                    background: `linear-gradient(
                        135deg,
                        ${club.primaryColor},
                        ${club.secondaryColor},
                        ${club.accentColor}
                    )`
                }}
            >

                <img
                    src={
                        club.bannerUrl ||
                        "https://placehold.co/1200x350"
                    }
                    alt={club.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />

                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="p-8">

                <h1 className="text-4xl font-bold">
                    {club.name}
                </h1>

                <p className="text-lg text-zinc-300 mt-2">
                    {club.tagline}
                </p>

                <p className="italic text-zinc-400">
                    {club.motto}
                </p>

                {club.verified && (
                    <span className="mt-4 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                        ✓ Official Club
                    </span>
                )}

                <p className="mt-6 text-zinc-300">
                    {club.description}
                </p>

            </div>

            <div className="relative">
                <img
                    src={
                        club.logoUrl ||
                        "https://placehold.co/120"
                    }
                    className="w-32 h-32 rounded-full border-4 border-white"
                />
            </div>

            <Link
                to={`/chat/${roomId}/pins`}
                className="flex items-center gap-2 hover:text-blue-600"
            >

                <Pin size={18}/>

                Pinned Messages

            </Link>
        </div>
    );
};

export default ClubHero;