import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

type RevealProps = {
  children: ReactNode;
  /** delay in ms before the reveal transition kicks in */
  delay?: number;
  style?: CSSProperties;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li';
};

/**
 * Fades + slides its children up when scrolled into view.
 * Uses IntersectionObserver so it only animates once, on demand.
 */
export default function Reveal({ children, delay = 0, style, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
