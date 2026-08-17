/** Cheap static glow used on mobile / reduced-motion — no three.js involved. */
export default function StaticGlowBackground() {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background:
          'radial-gradient(circle at 30% 20%, rgba(56,217,245,0.10), transparent 45%), radial-gradient(circle at 75% 70%, rgba(123,140,222,0.10), transparent 45%)',
      }}
    />
  );
}
