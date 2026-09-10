interface GhostProps {
  text: string;
  className?: string;
  dark?: boolean;
}

/** Giant pale ghost section title, per the KPMLXR Figma design language. */
export default function Ghost({ text, className = '', dark = false }: GhostProps) {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`whitespace-nowrap font-lxrtitle text-[16vw] font-extrabold leading-[0.85] tracking-tight lg:text-[11rem] ${
          dark ? 'text-white/[0.05]' : 'text-lxr-ghost'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
