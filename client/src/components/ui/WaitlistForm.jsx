import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Mail, Building, User } from "lucide-react";
import GlowButton from "./GlowButton";

/**
 * Waitlist Form for Scene 9 ("Join the Orbit").
 * Features glassmorphism inputs, neon glowing borders,
 * magnetic submit button, and animated confirmation states.
 */
const WaitlistForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", university: "", role: "Student" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Ambient Radial Backdrop Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-violet-600/30 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-cyan-500/30 blur-[100px] pointer-events-none" />

      <div className="relative rounded-3xl border border-white/15 bg-white/[0.05] backdrop-blur-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Limited Early Access
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight text-white">
                  Join the Orbit
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Be among the first universities to launch on ClubPlanet OrgOS.
                </p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="University Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Building className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="University / Organization Name"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["Student", "Coordinator", "Faculty"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        formData.role === role
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <GlowButton
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full justify-center text-lg font-bold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Engaging Hyperdrive...
                    </span>
                  ) : (
                    <>
                      Join the Orbit
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </GlowButton>
              </div>

              <p className="text-center text-xs text-zinc-500">
                No spam. Instant verification access token will be delivered to your inbox.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-white">
                  Welcome Aboard, {formData.name || "Explorer"}!
                </h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-sm mx-auto">
                  Your university workspace for <span className="text-cyan-400 font-semibold">{formData.university || "your campus"}</span> has been reserved in our deployment queue.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-zinc-400">
                ORBIT_KEY: <span className="text-cyan-400">CP-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-zinc-400 hover:text-white underline transition-colors cursor-pointer"
              >
                Register another campus email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WaitlistForm;
