import { Fingerprint, Briefcase, Coffee, Skull, Award } from 'lucide-react';
import { useReveal } from '@/lib/hooks';
import MemoryBoard from './MemoryBoard';

const SKILLS = [
  { name: 'TypeScript', level: 60 },
  { name: 'React / Next.js', level: 95 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Tailwind CSS', level: 96 },
  { name: 'Forensic Debugging', level: 89 },
];

const FACTS = [
  { icon: Briefcase, label: 'Years on the Beat', value: '7+' },
  { icon: Coffee, label: 'Cases Closed', value: '142' },
  { icon: Skull, label: 'Bugs Eliminated', value: '2,840' },
  { icon: Award, label: 'Commendations', value: '11' },
];

export default function About() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 px-4 bg-aged paper-grain">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader code="02" title="Personnel Dossier" subtitle="Subject: N. Holmes — P.I." />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* ID Card */}
          <div className={`md:col-span-1 ${visible ? 'animate-stampIn' : 'opacity-0'}`}>
            <div className="bg-ink text-paper p-5 border-4 border-ink shadow-hard relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-terminal text-sm uppercase tracking-widest opacity-70">I.D. No.</span>
                <span className="font-terminal text-sm">1947-NOIR</span>
              </div>
              <div className="aspect-[3/4] bg-paper border-2 border-paper/30 mb-4 relative overflow-hidden">
                <img
                  src="src/public/profile.jpg"
                  alt="Noah Holmes seated on a motorcycle"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-paper/10 pointer-events-none" />
                <div className="absolute top-2 right-2 stamp text-[10px] px-2 py-1 bg-paper">
                  Confidential
                </div>
              </div>
              <dl className="space-y-2 font-terminal text-base">
                <Row label="Name" value="Noah Holmes" />
                <Row label="Alias" value="The Bug Whisperer" />
                <Row label="Base" value="Downtown, Internet" />
                <Row label="Status" value="Active" />
              </dl>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="font-courier text-lg leading-relaxed">
                Subject is a seasoned frontend operative with a reputation for
                taking on the cases others walk away from. Trained in the
                classics — semantic HTML, untangled CSS, and the lost art of the
                zero-dependency solution. Known to work late, speak plainly,
                and never leave a console error behind.
              </p>
              <p className="font-courier text-lg leading-relaxed mt-4">
                Current MO: <span className="redact"> ███████ </span> building
                interfaces that feel inevitable — fast, accessible, and a little
                suspicious of unnecessary abstractions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`bg-paper border-2 border-ink p-3 shadow-hard-sm transition-all duration-500 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <f.icon className="w-5 h-5 mb-2" />
                  <div className="font-typewriter text-2xl">{f.value}</div>
                  <div className="font-terminal text-xs uppercase tracking-wider opacity-70">{f.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-typewriter text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-ink" /> Known Associates (Skills)
              </h3>
              <div className="space-y-2">
                {SKILLS.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between font-terminal text-base mb-0.5">
                      <span>{s.name}</span>
                      <span className="opacity-60">{s.level}%</span>
                    </div>
                    <div className="h-3 border border-ink bg-paper overflow-hidden">
                      <div
                        className="h-full bg-ink transition-all duration-1000 ease-out"
                        style={{ width: visible ? `${s.level}%` : '0%', transitionDelay: `${300 + i * 120}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Memory Board */}
        <MemoryBoard />
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-paper/20 pb-1">
      <dt className="opacity-60 uppercase text-xs tracking-wider pt-0.5">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

export function SectionHeader({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-terminal text-sm uppercase tracking-[0.3em] opacity-50">File {code}</span>
      <h2 className="font-typewriter text-4xl md:text-5xl uppercase tracking-wide mt-1">{title}</h2>
      <p className="font-courier italic text-base md:text-lg opacity-70 mt-2">{subtitle}</p>
      <div className="flex items-center gap-2 mt-4">
        <span className="w-16 h-px bg-ink" />
        <Fingerprint className="w-4 h-4" />
        <span className="w-16 h-px bg-ink" />
      </div>
    </div>
  );
}
