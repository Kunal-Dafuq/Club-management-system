import { useState } from "react";
import { searchMessages } from "../../../../services/chatService";

export default function useMessageSearch(clubId) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (!search.trim()) {
            setSearchResults([]);
            return;
        }

        try {

            const res = await searchMessages(
                clubId,
                search
            );

            setSearchResults(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    return {
        search,
        setSearch,
        searchResults,
        handleSearch
    };

}