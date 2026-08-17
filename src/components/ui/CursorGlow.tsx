import { useEffect, useState } from 'react';

/** Soft radial glow that follows the pointer. Desktop only. */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}
