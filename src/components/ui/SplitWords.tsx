import { Fragment, type CSSProperties } from 'react';

/**
 * Splits a string into masked words for the staggered line-reveal effect.
 * The parent needs `data-reveal`; words animate in when it gains `.is-in`.
 */
export default function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="sw">
            <span className="sw-i" style={{ '--i': i + offset } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
