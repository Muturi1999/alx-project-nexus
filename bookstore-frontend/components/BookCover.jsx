// No "use client" needed (no hooks) – works on server or client.
export default function BookCover({
  title = "Untitled",
  author = "",
  seed,                 // pass book.id (for consistent colors)
  width = 160,
  height = 240,
  rounded = "rounded-xl",
  className = "",
}) {
  // palettes (from/to)
  const palettes = [
    ["from-fuchsia-400", "to-pink-600"],
    ["from-indigo-400", "to-blue-600"],
    ["from-emerald-400", "to-green-600"],
    ["from-amber-400", "to-orange-600"],
    ["from-cyan-400", "to-sky-600"],
    ["from-rose-400", "to-red-600"],
    ["from-violet-400", "to-purple-600"],
    ["from-teal-400", "to-emerald-600"],
  ];

  // stable pick by seed/id
  const idx = Math.abs(Number(seed ?? 0)) % palettes.length;
  const [from, to] = palettes[idx];

  const initials = author
    ? author
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase() ?? "")
        .join("")
    : "BK";

  // small helper: break long titles nicely
  const displayTitle =
    title.length > 22 ? title.slice(0, 19).trim() + "…" : title;

  return (
    <div
      className={`relative shadow-2xl overflow-hidden ${rounded} ${className}`}
      style={{ width, height }}
      aria-label={`${title} by ${author}`}
    >
      {/* Color slab */}
      <div className={`h-full w-full bg-gradient-to-br ${from} ${to}`} />

      {/* Subtle top glow */}
      <div className="absolute inset-0 bg-white/0 [mask-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,.25),transparent)]" />

      {/* Spine */}
      <div className="absolute left-0 top-0 h-full w-2 bg-black/10" />

      {/* Footer band with title/author */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <p className="text-white/80 text-[10px] tracking-widest">{author || "Unknown"}</p>
        <h4 className="text-white text-lg font-semibold leading-tight">
          {displayTitle}
        </h4>
      </div>

      {/* Corner badge with initials */}
      <div className="absolute right-2 top-2 h-7 w-7 rounded-full bg-white/90 text-gray-900 text-xs font-bold grid place-items-center">
        {initials}
      </div>
    </div>
  );
}
