import { useEffect, useRef, useState } from 'react';

export function useTypewriter(text: string, speed = 45, startDelay = 0): { display: string; done: boolean } {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        idx.current += 1;
        setDisplay(text.slice(0, idx.current));
        if (idx.current >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { display, done };
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}
