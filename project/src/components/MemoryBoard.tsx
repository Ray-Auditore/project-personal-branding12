import { useReveal } from "@/lib/hooks";

type Memory = {
  id: string;
  grade: string;
  year: string;
  caption: string;
  note: string;
  img: string;
  rotate: string;
  pinColor: string;
  top: string;
  left: string;
};

const MEMORIES: Memory[] = [
  {
    id: "M-01",
    grade: "Kelas PRA-10",
    year: "Year One",
    caption: "First Day on the Beat",
    note: "The first time I walked into that classroom. Everything smelled of chalk dust and possibility. I didn't know yet that this was where the case would begin.",
    img: "src/public/prasmak.png",
    rotate: "-rotate-3",
    pinColor: "bg-ink",
    top: "3%",
    left: "10%",
  },
  {
    id: "M-02",
    grade: "Kelas 10",
    year: "Semester I",
    caption: "The Squad - Part I",
    note: "Growing up on the beat. The nights in the room get louder, friendships get tighter, and the journey starts taking real shape.",
    img: "src/public/kelas11k.jpg",
    rotate: "rotate-2",
    pinColor: "bg-ink",
    top: "3%",
    left: "58%",
  },
  {
    id: "M-03",
    grade: "Kelas 11",
    year: "Semester II",
    caption: "The Squad - Part II",
    note: "Another angle of the dorm life. Late night talks, laughter, and building memories we'll never forget.",
    img: "src/public/kelas11asli.jpg",
    rotate: "rotate-3",
    pinColor: "bg-ink",
    top: "52%",
    left: "12%",
  },
  {
    id: "M-04",
    grade: "Kelas 12",
    year: "Graduation",
    caption: "Badge Pinned",
    note: "They handed me a piece of paper and shook my hand. But the real certificate was everything between that first day and this one. Case closed. Next.",
    img: "src/public/kelas12k.jpg",
    rotate: "-rotate-1",
    pinColor: "bg-ink",
    top: "52%",
    left: "60%",
  },
];

export default function MemoryBoard() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-16">
      <h3 className="font-typewriter text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
        <span className="w-8 h-px bg-ink" /> Memory Board
      </h3>
      <p className="font-courier italic text-sm opacity-70 mb-6">
        Evidence pinned to the wall — from grades 10 to 12.
      </p>

      {/* The corkboard — pinned layout on desktop, stacked grid on mobile */}
      <div className="relative w-full bg-[#b8a88a] border-4 border-ink shadow-hard overflow-hidden">
        {/* Cork texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(60,40,20,0.25) 1px, transparent 2px), radial-gradient(circle at 65% 55%, rgba(60,40,20,0.2) 1px, transparent 2px), radial-gradient(circle at 85% 15%, rgba(60,40,20,0.22) 1px, transparent 2px), radial-gradient(circle at 35% 75%, rgba(60,40,20,0.18) 1px, transparent 2px)",
            backgroundSize: "12px 12px, 16px 16px, 10px 10px, 14px 14px",
          }}
        />

        {/* String connecting photos (desktop only) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="20"
            y1="14"
            x2="22"
            y2="60"
            stroke="#1a1a1a"
            strokeWidth="0.3"
            opacity="0.5"
          />
          <line
            x1="68"
            y1="14"
            x2="70"
            y2="60"
            stroke="#1a1a1a"
            strokeWidth="0.3"
            opacity="0.5"
          />
        </svg>

        {/* Mobile: stacked grid. Desktop: absolute pinned wall. */}
        <div className="md:hidden relative z-20 p-5 flex flex-col items-center gap-6">
          {MEMORIES.map((m, i) => (
            <PinnedPhoto
              key={m.id}
              mem={m}
              index={i}
              visible={visible}
              pinned={false}
            />
          ))}
        </div>

        <div className="hidden md:block relative h-[900px]">
          {MEMORIES.map((m, i) => (
            <PinnedPhoto
              key={m.id}
              mem={m}
              index={i}
              visible={visible}
              pinned
            />
          ))}
        </div>

        {/* "Evidence" tag in corner */}
        <div className="absolute bottom-3 right-3 stamp text-xs px-3 py-1.5 bg-paper/80 z-30">
          Evidence Wall
        </div>
      </div>

      {/* Legend below the board */}
      <div className="mt-4 flex flex-wrap justify-center gap-6 font-terminal text-sm uppercase tracking-widest opacity-70">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ink" /> Kelas 10 &amp; 11
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ink border border-paper" />{" "}
          Kelas 12
        </span>
      </div>
    </div>
  );
}

function PinnedPhoto({
  mem,
  index,
  visible,
  pinned,
}: {
  mem: Memory;
  index: number;
  visible: boolean;
  pinned: boolean;
}) {
  return (
    <div
      className={`${pinned ? "absolute" : "relative"} z-20 group transition-all duration-700 ${mem.rotate} ${
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 -translate-y-8"
      }`}
      style={
        pinned
          ? {
              top: mem.top,
              left: mem.left,
              transitionDelay: `${300 + index * 150}ms`,
              width: "250px",
            }
          : { transitionDelay: `${300 + index * 120}ms`, width: "260px" }
      }
    >
      {/* Push pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
        <div
          className={`w-4 h-4 rounded-full ${mem.pinColor} shadow-md ring-2 ring-ink/20`}
        />
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-ink/30 rounded-full" />
      </div>

      {/* Polaroid frame */}
      <div className="bg-paper p-3 pb-12 shadow-[4px_6px_8px_rgba(0,0,0,0.35)] border border-ink/10 relative">
        {/* Photo */}
        <div className="aspect-[4/5] overflow-hidden bg-ink/20 relative grayscale contrast-110">
          <img
            src={mem.img}
            alt={mem.caption}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Aged film overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ink/30 pointer-events-none" />
        </div>

        {/* Handwritten caption */}
        <p className="font-typewriter text-xs text-center mt-3 font-semibold leading-tight">
          {mem.caption}
        </p>

        {/* Grade + year stamp */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center font-terminal text-[10px] uppercase tracking-wider opacity-70 border-t border-ink/10 pt-1">
          <span>{mem.grade}</span>
          <span>{mem.year}</span>
        </div>
      </div>

      {/* Sticky note attached (shown on hover, desktop only) */}
      <div className="hidden md:block absolute -bottom-2 -right-3 w-36 bg-aged border border-ink/20 p-2 shadow-md rotate-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
        <p className="font-courier text-[10px] leading-snug italic">
          {mem.note}
        </p>
      </div>

      {/* Note always visible on mobile, below the polaroid */}
      <div className="md:hidden mt-2 bg-aged border border-ink/20 p-2 shadow-sm">
        <p className="font-courier text-[11px] leading-snug italic">
          {mem.note}
        </p>
      </div>
    </div>
  );
}
