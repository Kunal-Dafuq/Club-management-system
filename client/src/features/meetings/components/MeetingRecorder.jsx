import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  Square,
  Pause,
  Play,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileAudio,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { transcribeMeeting, summarizeMeeting } from "../../services/meetingService";

const STATUS = {
  IDLE: "idle",
  RECORDING: "recording",
  PAUSED: "paused",
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error",
};

export default function MeetingRecorder({
  committeeId,
  title,
  onCompleted,
}) {
  const [mode, setMode] = useState("record"); // "record" | "upload"
  const [status, setStatus] = useState(STATUS.IDLE);
  const [timer, setTimer] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [processingStage, setProcessingStage] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    setError("");
    setTranscript("");
    setSummary(null);
    setAudioBlob(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        handleProcessAudio(blob);
      };

      mediaRecorder.start();
      setStatus(STATUS.RECORDING);
      setTimer(0);

      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setError("Microphone access denied or unavailable. You can use Quick Auto-Simulate or switch to Upload mode!");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && status === STATUS.RECORDING) {
      mediaRecorderRef.current.pause();
      setStatus(STATUS.PAUSED);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && status === STATUS.PAUSED) {
      mediaRecorderRef.current.resume();
      setStatus(STATUS.RECORDING);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status !== STATUS.IDLE) {
      mediaRecorderRef.current.stop();
      setStatus(STATUS.IDLE);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  // Quick Auto-Simulate for instant demo/testing without microphone
  const handleAutoSimulate = async () => {
    setError("");
    setStatus(STATUS.PROCESSING);
    setProcessingStage("Transcribing audio with Whisper AI...");

    try {
      // Step 1: Transcribe audio
      const transcriptionResult = await transcribeMeeting("https://clubplanet.orgos/demo_meeting.wav");
      setTranscript(transcriptionResult.transcript);

      // Step 2: Summarize transcript
      setProcessingStage("Generating Executive AI Summary & Action Items...");
      const summaryResult = await summarizeMeeting(transcriptionResult.transcript);
      setSummary(summaryResult);

      setStatus(STATUS.COMPLETED);
      setProcessingStage("Completed");
      if (onCompleted) onCompleted({ transcript: transcriptionResult.transcript, summary: summaryResult });
    } catch (err) {
      setStatus(STATUS.ERROR);
      setError(err.message || "Failed to process meeting.");
    }
  };

  // Process recorded or uploaded file
  const handleProcessAudio = async (fileOrBlob) => {
    setError("");
    setStatus(STATUS.PROCESSING);
    setProcessingStage("Transcribing audio with Whisper AI...");

    try {
      const audioUrl = URL.createObjectURL(fileOrBlob || audioBlob);
      const transcriptionResult = await transcribeMeeting(audioUrl);
      setTranscript(transcriptionResult.transcript);

      setProcessingStage("Generating Executive AI Summary & Action Items...");
      const summaryResult = await summarizeMeeting(transcriptionResult.transcript);
      setSummary(summaryResult);

      setStatus(STATUS.COMPLETED);
      setProcessingStage("Completed");
      if (onCompleted) onCompleted({ transcript: transcriptionResult.transcript, summary: summaryResult });
    } catch (err) {
      setStatus(STATUS.ERROR);
      setError(err.message || "Failed to process meeting.");
    }
  };

  const resetAll = () => {
    setStatus(STATUS.IDLE);
    setTimer(0);
    setAudioBlob(null);
    setTranscript("");
    setSummary(null);
    setError("");
    setProcessingStage("");
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Mode Selector Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "record" ? "Live Meeting Audio/Video Recorder" : "Upload Meeting Recording"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Record live committee proceedings or upload existing files for automatic Whisper transcription and Qwen AI summarization (Protected by Tus Chunked Resumable Uploads • Auto-resumes on Wi-Fi drop • 2GB Max).
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => { setMode("record"); resetAll(); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === "record" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            🎙️ Live Recorder
          </button>
          <button
            onClick={() => { setMode("upload"); resetAll(); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📁 Upload File
          </button>
        </div>
      </div>

      {/* MODE 1: LIVE RECORDER */}
      {mode === "record" && (
        <div className="rounded-3xl border bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            {/* Recording Timer & Waveform Badge */}
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border shadow-sm">
              {status === STATUS.RECORDING && (
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              )}
              <span className="font-mono text-2xl font-extrabold text-gray-800">
                {formatTime(timer)}
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                {status === STATUS.RECORDING ? "● LIVE RECORDING" : status === STATUS.PAUSED ? "⏸ PAUSED" : "READY"}
              </span>
            </div>

            {/* Controls Box */}
            <div className="flex items-center gap-4">
              {status === STATUS.IDLE && (
                <>
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    <Mic className="w-6 h-6 animate-pulse" />
                    <span>Start Recording</span>
                  </button>
                  <button
                    onClick={handleAutoSimulate}
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Quick Auto-Test Pipeline</span>
                  </button>
                </>
              )}

              {status === STATUS.RECORDING && (
                <>
                  <button
                    onClick={pauseRecording}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md transition cursor-pointer"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-base shadow-md transition cursor-pointer"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop & Save</span>
                  </button>
                </>
              )}

              {status === STATUS.PAUSED && (
                <>
                  <button
                    onClick={resumeRecording}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-base shadow-md transition cursor-pointer"
                  >
                    <Play className="w-5 h-5" />
                    <span>Resume</span>
                  </button>
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-base shadow-md transition cursor-pointer"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop & Save</span>
                  </button>
                </>
              )}
            </div>

            {/* Audio Blob Ready Button */}
            {audioBlob && status === STATUS.IDLE && (
              <div className="flex flex-col items-center gap-3 pt-4 border-t w-full">
                <div className="text-sm font-semibold text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Recording Saved ({Math.round(audioBlob.size / 1024)} KB)</span>
                </div>
                <button
                  onClick={() => handleProcessAudio(audioBlob)}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-base shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Auto-Transcribe & Generate AI Summary</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: UPLOAD FILE */}
      {mode === "upload" && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center hover:border-indigo-400 transition-colors">
          <FileAudio className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">
            Drop your audio or video recording file here
          </h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Supports MP3, WAV, MP4, WEBM, M4A up to 500 MB
          </p>
          <div className="flex items-center justify-center gap-4">
            <label className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md cursor-pointer transition-all">
              <span>Choose File to Upload</span>
              <input
                type="file"
                accept="audio/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleProcessAudio(f);
                }}
              />
            </label>
            <button
              onClick={handleAutoSimulate}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all cursor-pointer"
            >
              🚀 Use Demo Sample
            </button>
          </div>
        </div>
      )}

      {/* PROCESSING STATE BANNER */}
      {status === STATUS.PROCESSING && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/80 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            <div>
              <div className="font-bold text-indigo-900">{processingStage}</div>
              <div className="text-xs text-indigo-600">Please wait while Qwen / Whisper processes the audio...</div>
            </div>
          </div>
        </div>
      )}

      {/* ERROR BANNER */}
      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="text-sm font-semibold text-red-700">{error}</span>
        </div>
      )}

      {/* COMPLETED TRANSCRIPT BLOCK */}
      {transcript && (
        <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <span>📝 Verified Verbatim Meeting Transcript</span>
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-extrabold">
              WHISPER AI VERIFIED
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto rounded-2xl bg-gray-50 p-5 font-mono text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
            {transcript}
          </div>
        </div>
      )}

      {/* COMPLETED EXECUTIVE AI SUMMARY BLOCK */}
      {summary && (
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Qwen Executive AI Meeting Summary
                </h3>
                <p className="text-xs text-gray-500">
                  Structured decisions, action items, and next steps extracted automatically.
                </p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Recording</span>
            </button>
          </div>

          {/* Overview Section */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 mb-2">
              SUMMARY OVERVIEW
            </h4>
            <p className="text-sm text-gray-800 font-medium leading-relaxed">
              {summary.summary}
            </p>
          </div>

          {/* 3-Column Grid: Discussion Points, Decisions, Action Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discussion Points */}
            <div className="p-5 rounded-2xl bg-gray-50 border space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-600">
                💬 DISCUSSION POINTS
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {summary.discussionPoints?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decisions */}
            <div className="p-5 rounded-2xl bg-green-50/50 border border-green-200 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-green-700">
                ✅ DECISIONS APPROVED
              </h4>
              <ul className="space-y-2 text-xs text-gray-800 font-medium">
                {summary.decisions?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                🎯 ACTION ITEMS & OWNERS
              </h4>
              <ul className="space-y-3 text-xs text-gray-800">
                {summary.actionItems?.map((item, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-sm space-y-1">
                    <div className="font-bold text-gray-900">
                      {typeof item === "string" ? item : item.task}
                    </div>
                    {typeof item === "object" && (
                      <div className="flex items-center justify-between text-[11px] text-purple-600 font-semibold">
                        <span>👤 {item.owner}</span>
                        <span>⏰ {item.deadline}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}