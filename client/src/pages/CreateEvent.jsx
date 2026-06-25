import { useState } from "react";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        clubId: "",
        visibility: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
        ...prev,
            [name]:
                type === "checkbox"
                ? checked
                : value
            }));

        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
                Create Event
            </h1>

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

                <input
                type="number"
                name="clubId"
                placeholder="Club ID"
                value={formData.clubId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                />

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
                className="px-6 py-3 rounded-lg bg-black text-white"
                >
                Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
