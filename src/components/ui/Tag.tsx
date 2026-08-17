import type { CSSProperties, ReactNode } from 'react';

/** Small uppercase cyan label with a leading dash (the `.tag` style). */
export default function Tag({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="tag" style={style}>
      {children}
    </span>
  );
}
