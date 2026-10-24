import { useEffect, useState } from 'react';
import { Search, Fingerprint, FileText, ChevronDown } from 'lucide-react';
import { useTypewriter } from '@/lib/hooks';

const CASE_LINE = '> CASE #1947-NOIR // STATUS: OPEN';
const ROLE_LINES = [
  'Frontend Developer',
  'UI/UX Plek Ketiplek',
  'Bug Hunter Plenger',
];

export default function Hero() {
  const { display: caseDisplay } = useTypewriter(CASE_LINE, 38, 200);
  const { display: nameDisplay, done: nameDone } = useTypewriter('RAYYAN AUDITORE', 90, 600);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleDisplay, setRoleDisplay] = useState('');

  useEffect(() => {
    if (!nameDone) return;
    let i = 0;
    const role = ROLE_LINES[roleIdx];
    const t = setInterval(() => {
      i += 1;
      setRoleDisplay(role.slice(0, i));
      if (i >= role.length) {
        clearInterval(t);
        setTimeout(() => {
          setRoleIdx((r) => (r + 1) % ROLE_LINES.length);
        }, 2200);
      }
    }, 55);
    return () => clearInterval(t);
  }, [roleIdx, nameDone]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center paper-grain pt-28 pb-16 px-4"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-6 font-terminal text-base md:text-xl opacity-70">
          <Search className="w-4 h-4 animate-flicker" />
          <span className="tracking-widest">{caseDisplay}</span>
        </div>

        <div className="relative inline-block mb-4">
          <span className="font-terminal text-sm tracking-[0.3em] uppercase opacity-60 block mb-2">
            Confidential Personnel File
          </span>
          <h1 className="font-typewriter text-6xl sm:text-7xl md:text-9xl uppercase tracking-tight leading-none">
            {nameDisplay}
            <span className="type-cursor inline-block" />
          </h1>
        </div>

        <div className="h-10 flex items-center font-terminal text-2xl md:text-3xl tracking-wide mb-8">
          <span className="opacity-50 mr-2">&gt;</span>
          <span>{roleDisplay}</span>
          <span className="animate-blink ml-1">▋</span>
        </div>

        <div className="max-w-xl border-l-4 border-ink pl-4 mb-10 font-courier text-base md:text-lg leading-relaxed">
          <p>
            A code-slinger working the dim-lit back-alleys of the web. I take
            broken interfaces, cold leads, and unsolved bugs — and close the
            case before sunrise.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => go('projects')}
            className="group flex items-center gap-2 bg-ink text-paper px-5 py-3 font-typewriter uppercase tracking-widest text-sm shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <FileText className="w-4 h-4" />
            Open Case Files
          </button>
          <button
            onClick={() => go('contact')}
            className="flex items-center gap-2 border-2 border-ink px-5 py-3 font-typewriter uppercase tracking-widest text-sm hover:bg-ink hover:text-paper transition-colors"
          >
            <Fingerprint className="w-4 h-4" />
            Leave a Tip
          </button>
        </div>

        <div className="mt-16 flex items-center gap-6 font-terminal text-sm uppercase tracking-widest opacity-60">
          <span>Est. 1990</span>
          <span className="w-px h-4 bg-current" />
          <span>Licensed &amp; Bonded</span>
          <span className="w-px h-4 bg-current" />
          <span>24hr Service</span>
        </div>
      </div>

      <button
        onClick={() => go('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-terminal text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
      >
        Begin Investigation
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
