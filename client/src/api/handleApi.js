export const handleApi = async (apiCall) => {
    try {
        const response = await apiCall();
        return {
            success: true,
            data: response.data?.data ?? response.data,
            error: null,
        };
    } catch (error) {
        console.error("API Error Execution Failed:", error);
        return {
            success: false,
            data: null,
            error: error.response?.data?.message || error.message || "An unexpected error occurred",
        };
    }
};