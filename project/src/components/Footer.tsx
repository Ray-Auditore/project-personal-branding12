import { Fingerprint } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-10 px-4 border-t-4 border-ink">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-typewriter uppercase tracking-widest">
          <Fingerprint className="w-5 h-5" />
          N. Holmes — P.I.
        </div>
        <p className="font-terminal text-sm opacity-60 text-center">
          Case files sealed {new Date().getFullYear()}. No bugs were harmed in the making of this site.
        </p>
        <span className="font-terminal text-sm opacity-60">EST. 1990</span>
      </div>
    </footer>
  );
}
