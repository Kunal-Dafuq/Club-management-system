import { uploadFileToSupabase } from "../utils/supabaseUpload";

export const uploadAudio = async ({
    file,
    bucket = "meeting-audio",
    folder = "meetings",
    onProgress,
}) => {
    if (!file) {
        throw new Error("Audio file is required.");
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "mp3";
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const result = await uploadFileToSupabase({
        file,
        bucket,
        folder,
        fileName,
        contentType: file.type,
        onProgress,
    });

    return result;
};

export default uploadAudio;