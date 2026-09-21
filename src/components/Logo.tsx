/**
 * Invictus Properties mark.
 *
 * {{PROVIDE}} the supplied logo files. Drop them in /public/assets/logo as
 * invictus-mark.svg and invictus-wordmark.svg, then this component will use
 * them. Until they land, the wordmark below is set in the display face so the
 * header is never empty and no third-party mark is used as a stand-in.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`display text-lg leading-none tracking-[0.04em] ${className}`}>
      Invictus
      <span className="ml-2 font-normal tracking-[0.2em] text-[0.7em] opacity-70">
        Properties
      </span>
    </span>
  );
}
