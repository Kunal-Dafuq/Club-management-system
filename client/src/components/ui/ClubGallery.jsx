import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, X, Calendar, MapPin, Tag } from "lucide-react";

// Curated high-impact campus event & activity gallery items
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "RoboWars Nationals 2025",
    category: "Tech",
    club: "Robotics Club",
    date: "Mar 15, 2025",
    location: "Main Indoor Stadium",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description:
      "Over 40 engineering teams battled in the 60kg combat robotics arena with custom hydraulic flippers and spinners.",
  },
  {
    id: 2,
    title: "All-Night Hackathon 4.0",
    category: "Tech",
    club: "Coding Club",
    date: "Apr 02, 2025",
    location: "Innovation Hub Labs",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description:
      "36 hours of continuous coding, AI prototyping, and Web3 innovation with over 500 student developers.",
  },
  {
    id: 3,
    title: "Symphony Acoustic Night",
    category: "Cultural",
    club: "Music & Acoustics Club",
    date: "Feb 20, 2025",
    location: "Open Air Amphitheatre",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    description:
      "An enchanting evening of live indie orchestral performances, fusion rock, and student originals under the stars.",
  },
  {
    id: 4,
    title: "E-Summit '25 Keynote & Pitch",
    category: "Fests",
    club: "Entrepreneurship Cell",
    date: "Jan 18, 2025",
    location: "University Auditorium",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    description:
      "Leading VC partners and unicorn founders mentored 25 student startups competing for $50K in seed funding.",
  },
  {
    id: 5,
    title: "Street Jam Dance Battle",
    category: "Cultural",
    club: "Dance Crew",
    date: "Mar 28, 2025",
    location: "Student Center Plaza",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
    description:
      "High-energy hip-hop and contemporary dance battles featuring crews from 12 universities.",
  },
  {
    id: 6,
    title: "AI & Neural Art Exhibition",
    category: "Tech",
    club: "AI & Data Science Club",
    date: "Apr 12, 2025",
    location: "Central Library Gallery",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description:
      "Generative art and interactive AI installations created collaboratively by computer science and fine arts students.",
  },
];

const CATEGORIES = ["All", "Tech", "Cultural", "Fests"];

/**
 * ClubGallery Component:
 * Clean, visually stunning showcase of the best campus activities and fests
 * with category filtering, glassmorphic cards, and interactive lightbox modal.
 */
const ClubGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
                isActive
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedImage(item)}
              className="group relative h-80 rounded-3xl overflow-hidden border border-white/15 bg-white/5 cursor-pointer shadow-xl"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-75 group-hover:opacity-90"
              />

              {/* Gradient Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono font-semibold text-cyan-400">
                <Tag className="w-3 h-3" />
                <span>{item.category}</span>
              </div>

              {/* Content on bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-xs font-mono text-violet-400 font-bold mb-1">
                  {item.club}
                </span>
                <h4 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-white group-hover:text-cyan-400 transition-colors font-semibold">
                    <Eye className="w-3.5 h-3.5" />
                    View Fest
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 bg-[#0E131F] shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 space-y-4 -mt-12 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                    {selectedImage.category}
                  </span>
                  <span className="text-xs font-mono text-violet-400 font-semibold">
                    {selectedImage.club}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedImage.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-400" />
                    <span>{selectedImage.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClubGallery;
