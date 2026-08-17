import type { ReactNode } from 'react';
import Reveal from './Reveal';
import Tag from './Tag';

type SectionHeaderProps = {
  tag: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  titleSize?: string;
};

/** Reusable "tag + heading + subtitle" block used at the top of most sections. */
export default function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
  titleSize = 'clamp(32px, 4vw, 52px)',
}: SectionHeaderProps) {
  return (
    <Reveal style={{ textAlign: center ? 'center' : 'left', marginBottom: 40 }}>
      <Tag style={center ? { justifyContent: 'center' } : undefined}>{tag}</Tag>
      <h2
        className="section-title"
        style={{ fontSize: titleSize, marginTop: 16, maxWidth: center ? undefined : 560 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: 16,
            fontSize: 15,
            color: 'var(--text-dim)',
            maxWidth: 520,
            lineHeight: 1.75,
            margin: center ? '16px auto 0' : '16px 0 0',
          }}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
