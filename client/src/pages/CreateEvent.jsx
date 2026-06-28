import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import { getClubs } from "../services/clubService";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        clubId: "",
        visibility: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [clubs, setClubs] = useState([]);
    const [clubSearch, setClubSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        console.log({
            name: e.target.name,
            value: e.target.value
        });

        setFormData((prev) => ({
        ...prev,
            [name]:
                type === "checkbox"
                ? checked
                : value
        }));

    };

    useEffect(() => {
        const fetchClubs = async () => {
            try {
            const response = await getClubs();

            console.log(
                "CLUBS:",
                response.data
            );

            setClubs(response.data);
            } catch (err) {
            console.error(err);
            }
        };
        fetchClubs();
    }, []);

    const filteredClubs = clubs.filter((club) =>
        club.name
            .toLowerCase()
            .includes(
            clubSearch.toLowerCase()
            )
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return setError("Title is required");
        }

        if (!formData.description.trim()) {
            return setError("Description is required");
        }

        if (!formData.location.trim()) {
            return setError("Location is required");
        }

        if (!formData.clubId) {
            return setError("Club ID is required");
        }

        if (
            new Date(formData.endTime) <=
            new Date(formData.startTime)
        ) {
            return setError(
                "End time must be after start time"
            );
        }

        try {
            setLoading(true);
            setError("");

            const start = new Date(formData.startTime);
            const end = new Date(formData.endTime);

            if (isNaN(start.getTime())) {
                return setError("Please select a valid start time");
            }

            if (isNaN(end.getTime())) {
                return setError("Please select a valid end time");
            }

            console.log(formData);

            const payload = {
                ...formData,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                clubId: Number(formData.clubId),
                visibility: Boolean(formData.visibility)
            };

            console.log(
                "SENDING EVENT:",
                JSON.stringify(payload, null, 2)
            );

            await createEvent(payload);

            navigate(
                "/events",
                {
                    state: {
                    refresh: true,
                    success:
                        "Event created successfully"
                    }
                }
            );

        } catch (err) {
            console.log("=========== COMPLETE ERROR ===========");
            console.log(err);

            console.log("MESSAGE:", err.message);
            console.log("NAME:", err.name);
            console.log("CODE:", err.code);
            console.log("CONFIG:", err.config);
            console.log("REQUEST:", err.request);
            console.log("RESPONSE:", err.response);
            console.log("======================================");

            if (
                Array.isArray(
                    err.response?.data?.message
                )
                ) {
                setError(
                    err.response.data.message[0].message
                );
                } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to create event"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
                Create Event
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                    <p className="text-red-700">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

                <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

                <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

                <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

                <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search Club..."
                        value={clubSearch}
                        onChange={(e) => {
                        setClubSearch(
                            e.target.value
                        );

                        setShowSuggestions(
                            true
                        );
                        }}
                        className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        "
                    />

                    {showSuggestions &&
                        clubSearch &&
                        filteredClubs.length > 0 && (

                        <div
                            className="
                            absolute
                            w-full
                            bg-white
                            border
                            rounded-lg
                            shadow-lg
                            mt-1
                            z-50
                            max-h-60
                            overflow-y-auto
                            "
                        >
                            {filteredClubs.map(
                            (club) => (

                                <div
                                key={club.id}
                                onClick={() => {

                                    setFormData(
                                    (prev) => ({
                                        ...prev,
                                        clubId: Number(club.id)
                                    })
                                    );

                                    setClubSearch(
                                    club.name
                                    );

                                    setShowSuggestions(
                                    false
                                    );
                                }}
                                className="
                                    p-3
                                    cursor-pointer
                                    hover:bg-gray-100
                                "
                                >
                                {club.name}
                                </div>
                            )
                            )}
                        </div>
                    )}

                </div>

                {formData.clubId && (
                    <div
                        className="
                        bg-green-50
                        border
                        border-green-300
                        rounded-lg
                        p-3
                        "
                    >
                        Selected Club ID:
                        {" "}
                        {formData.clubId}
                    </div>
                )}

                <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    name="visibility"
                    checked={formData.visibility}
                    onChange={handleChange}
                />

                Public Event
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        px-6
                        py-3
                        rounded-lg
                        bg-black
                        text-white
                        disabled:opacity-50
                    "
                >
                    {loading
                        ? "Creating..."
                        : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
