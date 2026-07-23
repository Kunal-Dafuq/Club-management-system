import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {
    Upload,
    FileAudio,
    Loader2,
    Trash2,
    CheckCircle,
    AlertCircle,
    FileUp,
    RefreshCw
} from "lucide-react";

import { uploadAudio } from "../../utils/supabaseUpload";
import {
    transcribeMeeting,
    summarizeMeeting,
    createMeeting as saveMeeting
} from "../../services/meetingService";

const ACCEPTED_TYPES = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/mp4",
    "audio/x-m4a",
    "audio/m4a",
    "audio/ogg"
];

const MAX_SIZE = 500 * 1024 * 1024;

const STATUS = {
    IDLE: "idle",
    READY: "ready",
    UPLOADING: "uploading",
    PROCESSING: "processing",
    COMPLETED: "completed",
    ERROR: "error"
};

const MeetingUploader = ({
    committeeId,
    title,
    onCompleted
}) => {
    const inputRef = useRef(null);
    const mountedRef = useRef(true);

    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingStage, setProcessingStage] = useState("");
    const [transcript, setTranscript] = useState("");
    const [summary, setSummary] = useState(null);
    const [meeting, setMeeting] = useState(null);
    const [error, setError] = useState("");

    const validateFile = useCallback((selectedFile) => {
        if (!selectedFile) {
            throw new Error("Please choose an audio file.");
        }

        if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
            throw new Error("Unsupported audio format.");
        }

        if (selectedFile.size > MAX_SIZE) {
            throw new Error("Maximum allowed size is 500 MB.");
        }
    }, []);

    const reset = useCallback(() => {
        setFile(null);
        setStatus(STATUS.IDLE);
        setUploadProgress(0);
        setProcessingStage("");
        setTranscript("");
        setSummary(null);
        setMeeting(null);
        setError("");
    }, []);

    const selectFile = useCallback(
        selectedFile => {
            try {
                validateFile(selectedFile);
                setError("");
                setFile(selectedFile);
                setStatus(STATUS.READY);
            } catch (err) {
                setError(err.message);
                setStatus(STATUS.ERROR);
            }
        },
        [validateFile]
    );

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const onFileChange = event => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            selectFile(selectedFile);
        }
    };

    const onDragEnter = event => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    };

    const onDragLeave = event => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    };

    const onDragOver = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    const onDrop = event => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        const selectedFile = event.dataTransfer.files?.[0];
        if (selectedFile) {
            selectFile(selectedFile);
        }
    };

    const processMeeting = useCallback(async () => {
        if (!file) return;

        try {
            setError("");
            setUploadProgress(0);
            setStatus(STATUS.UPLOADING);
            setProcessingStage("Uploading audio...");

            const upload = await uploadAudio({
                file,
                bucket: "meeting-audio",
                folder: "meetings",
                onProgress: progress => {
                    if (mountedRef.current) {
                        setUploadProgress(progress);
                    }
                }
            });

            setProcessingStage("Generating transcript...");

            const transcriptResult = await transcribeMeeting(upload.publicUrl);

            setProcessingStage("Generating AI summary...");

            const summaryResult = await summarizeMeeting(transcriptResult.transcript);

            setProcessingStage("Saving meeting...");

            const meetingResult = await saveMeeting({
                title,
                committeeId,
                transcript: transcriptResult.transcript,
                summary: summaryResult,
                audioUrl: upload.publicUrl,
                duration: transcriptResult.duration
            });

            if (!mountedRef.current) return;

            setMeeting(meetingResult);
            setTranscript(transcriptResult.transcript);
            setSummary(summaryResult);
            setStatus(STATUS.COMPLETED);
            setProcessingStage("Completed");

            onCompleted?.(meetingResult);
        } catch (err) {
            if (mountedRef.current) {
                setStatus(STATUS.ERROR);
                setProcessingStage("");
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Meeting processing failed."
                );
            }
        }
    }, [
        file,
        title,
        committeeId,
        onCompleted
    ]);

    const fileSize = useMemo(() => {
        if (!file) return "";
        return (file.size / 1024 / 1024).toFixed(2);
    }, [file]);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === "Escape") {
                reset();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [reset]);

    const isUploading = status === STATUS.UPLOADING;
    const isCompleted = status === STATUS.COMPLETED;
    const isReady = status === STATUS.READY;
    const hasError = status === STATUS.ERROR;

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                        Upload Meeting Audio
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Upload an existing recording and let AI generate the transcript and summary.
                    </p>
                </div>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept="audio/*"
                    onChange={onFileChange}
                />

                <div
                    onClick={openFilePicker}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
                        dragActive
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400"
                    }`}
                >
                    <Upload
                        className="mx-auto mb-5"
                        size={48}
                    />
                    <h3 className="text-xl font-semibold">
                        Drag & Drop Audio Here
                    </h3>
                    <p className="mt-3 text-gray-500">
                        or click to browse
                    </p>
                    <p className="mt-6 text-sm text-gray-400">
                        MP3 • WAV • M4A • WEBM • OGG
                    </p>
                    <p className="text-sm text-gray-400">
                        Maximum Size : 500 MB
                    </p>
                </div>
            </div>

            {file && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <FileAudio
                            size={42}
                            className="text-blue-600"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">
                                {file.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {file.type}
                            </p>
                            <p className="text-sm text-gray-500">
                                {fileSize} MB
                            </p>
                        </div>
                        <button
                            onClick={reset}
                            className="rounded-lg bg-red-600 p-3 text-white"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            )}

            {isReady && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <button
                        disabled={isUploading}
                        onClick={processMeeting}
                        className={`flex w-full items-center justify-center gap-3 rounded-xl py-4 text-lg font-semibold text-white transition ${
                            isUploading 
                                ? "cursor-not-allowed bg-gray-400" 
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        <FileUp size={22} />
                        Upload & Process
                    </button>
                </div>
            )}

            {isUploading && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-4">
                        <Loader2
                            className="animate-spin"
                            size={28}
                        />
                        <div>
                            <h3 className="font-semibold">
                                Processing Meeting...
                            </h3>
                            <p className="text-sm text-gray-500">
                                {processingStage || "Uploading"}
                            </p>
                        </div>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${uploadProgress}%`
                            }}
                        />
                    </div>
                    <div className="mt-3 text-right font-semibold">
                        {uploadProgress.toFixed(0)}%
                    </div>
                </div>
            )}

            {transcript && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-5 text-xl font-bold">
                        Transcript
                    </h3>
                    <div className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-5">
                        {transcript}
                    </div>
                </div>
            )}

            {summary && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-5 text-xl font-bold">
                        AI Summary
                    </h3>
                    <pre className="overflow-auto rounded-lg bg-gray-50 p-5 text-sm">
                        {JSON.stringify(summary, null, 2)}
                    </pre>
                </div>
            )}

            {isCompleted && meeting && (
                <div className="rounded-2xl border border-green-300 bg-green-50 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <CheckCircle
                                size={34}
                                className="text-green-700"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-green-700">
                                    Meeting Processed Successfully
                                </h3>
                                <p>
                                    ID : {meeting.id}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >
                            <RefreshCw size={18} />
                            Upload Another
                        </button>
                    </div>
                </div>
            )}

            {hasError && (
                <div className="rounded-2xl border border-red-300 bg-red-50 p-5">
                    <div className="flex items-center gap-3">
                        <AlertCircle
                            className="text-red-700"
                        />
                        <span className="font-medium text-red-700">
                            {error}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(MeetingUploader);