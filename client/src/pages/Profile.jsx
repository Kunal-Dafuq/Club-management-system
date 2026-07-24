import { useState, useEffect } from "react";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, authLogin, token } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    let isMounted = true;
    const fetchFreshProfile = async () => {
      try {
        const res = await authService.getProfile();
        const userData = res.data?.data || res.data?.user || res.data;
        if (isMounted && userData) {
          setProfile(userData);
        }
      } catch (err) {
        console.error("Failed to sync profile:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFreshProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await authService.updateProfile?.(profile) || { data: profile };
      const updatedUser = res.data?.data || res.data;
      
      setProfile(updatedUser);
      authLogin(token, updatedUser); 
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to save profile changes." 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Profile</h1>
        <p className="text-sm text-zinc-400">Manage your personal account settings and identity details.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-md">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Full Name
              </label>
              <input
                type="text"
                value={profile?.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full mt-2 p-3.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={profile?.email || ""}
                className="w-full mt-2 p-3.5 rounded-xl bg-black/20 border border-white/5 text-zinc-500 text-sm cursor-not-allowed select-none"
              />
            </div>
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-xs font-medium border ${
              message.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 font-semibold text-sm text-white hover:bg-blue-500 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;