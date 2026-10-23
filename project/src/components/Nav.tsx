import { useEffect, useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const LINKS = [
  { id: 'home', label: 'Home', code: '01' },
  { id: 'about', label: 'Dossier', code: '02' },
  { id: 'projects', label: 'Case Files', code: '03' },
  { id: 'contact', label: 'Tip Line', code: '04' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(LINKS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ink text-paper shadow-hard-sm' : 'bg-transparent text-ink'
      }`}
    >
      <div className="border-b-2 border-current mx-4 md:mx-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-2 py-3">
          <button onClick={() => go('home')} className="flex items-center gap-2 group">
            <Search className="w-6 h-6 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
            <span className="font-typewriter text-lg tracking-widest uppercase">N. Holmes</span>
            <span className="hidden sm:inline font-terminal text-sm opacity-60">// P.I.</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`px-3 py-1.5 font-terminal text-lg tracking-wide uppercase transition-colors ${
                  active === l.id ? 'bg-current text-[#e8e4d8] mix-blend-difference' : 'hover:opacity-60'
                }`}
              >
                <span className="opacity-50 mr-1">{l.code}</span>
                {l.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-ink text-paper border-b-2 border-paper">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left py-3 font-terminal text-xl tracking-wide uppercase border-b border-paper/20 last:border-0"
              >
                <span className="opacity-50 mr-2">{l.code}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
