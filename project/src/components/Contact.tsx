import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { useReveal } from '@/lib/hooks';
import { SectionHeader } from './About';

type FormState = { name: string; email: string; subject: string; message: string };
const EMPTY: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject required';
    if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm(EMPTY);
      setTimeout(() => setStatus('idle'), 4000);
    }, 1400);
  };

  const field = (key: keyof FormState, label: string, type = 'text', textarea = false) => (
    <label className="block">
      <span className="font-terminal text-sm uppercase tracking-widest flex items-center gap-1">
        {label}
        {errors[key] && (
          <span className="flex items-center gap-1 text-xs normal-case text-ink/70">
            <AlertCircle className="w-3 h-3" /> {errors[key]}
          </span>
        )}
      </span>
      {textarea ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={5}
          className="w-full bg-paper border-2 border-ink p-3 font-courier text-base focus:outline-none focus:shadow-hard-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all mt-1 resize-none"
          placeholder="Describe the case..."
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full bg-paper border-2 border-ink p-3 font-courier text-base focus:outline-none focus:shadow-hard-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all mt-1"
        />
      )}
    </label>
  );

  return (
    <section id="contact" className="relative py-24 px-4 bg-aged paper-grain">
      <div ref={ref} className="max-w-5xl mx-auto">
        <SectionHeader code="04" title="Tip Line" subtitle="Got a case? Leave a message — confidential." />

        <div className="grid md:grid-cols-5 gap-8 mt-12">
          {/* Contact intel */}
          <div className={`md:col-span-2 space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
            <div className="bg-ink text-paper p-5 border-4 border-ink shadow-hard relative">
              <div className="absolute top-2 right-2 stamp text-[10px] px-2 py-1 bg-paper text-ink">
                Tip Line
              </div>
              <h3 className="font-typewriter text-xl uppercase mb-4">Reach the Detective</h3>
              <ul className="space-y-4 font-terminal text-base">
                <ContactRow icon={Mail} label="Wire" value="noah@holmes.io" href="mailto:noah@holmes.io" />
                <ContactRow icon={Phone} label="Call" value="+1 (555) 194-7047" href="tel:+15551947047" />
                <ContactRow icon={MapPin} label="Beat" value="Downtown, Internet" />
              </ul>
              <div className="mt-6 pt-4 border-t border-paper/20">
                <span className="font-terminal text-xs uppercase tracking-widest opacity-60">Informant Network</span>
                <div className="flex gap-3 mt-2">
                  {[Github, Linkedin, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 border-2 border-paper flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-2 border-ink p-4 bg-paper">
              <p className="font-courier text-sm leading-relaxed italic">
                "Every tip is followed up. No case too cold, no bug too small.
                Discretion guaranteed — I never read the README either."
              </p>
              <p className="font-typewriter text-xs uppercase tracking-widest mt-2 text-right">— N.H.</p>
            </div>
          </div>

          {/* Form — styled as an intake report */}
          <form
            onSubmit={submit}
            className={`md:col-span-3 bg-paper border-2 border-ink p-6 shadow-hard transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-ink border-dashed">
              <span className="font-typewriter text-sm uppercase tracking-widest">Intake Report</span>
              <span className="font-terminal text-sm opacity-60">FORM 24-A</span>
            </div>

            <div className="space-y-4">
              {field('name', 'Informant Name')}
              {field('email', 'Return Address', 'email')}
              {field('subject', 'Case Subject')}
              {field('message', 'Statement', 'text', true)}
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3 font-typewriter uppercase tracking-widest text-sm shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sent' ? (
                <>
                  <Check className="w-4 h-4" /> Case Filed
                </>
              ) : status === 'sending' ? (
                <>Transmitting...</>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Tip
                </>
              )}
            </button>

            {status === 'sent' && (
              <p className="mt-3 font-terminal text-sm text-center animate-stampIn">
                Your tip has been received. The detective will be in touch. Check your wire.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex items-center gap-2 opacity-60 text-xs uppercase tracking-widest">
        <Icon className="w-4 h-4" /> {label}
      </span>
      <span className="text-lg hover:underline">{value}</span>
    </>
  );
  return (
    <li>
      {href ? <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a> : <div>{content}</div>}
    </li>
  );
}
