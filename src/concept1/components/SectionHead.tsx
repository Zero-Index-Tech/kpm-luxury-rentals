interface SectionHeadProps {
  /** Plain title part (Montserrat semibold). */
  title: string;
  /** Optional accent words rendered in DM Sans italic after the title. */
  accent?: string;
  copy?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

/** Section heading — Montserrat semibold title with optional DM Sans italic accent. No eyebrows. */
export default function SectionHead({
  title,
  accent,
  copy,
  dark = false,
  align = 'left',
  className = '',
}: SectionHeadProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2
        className={`font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem] ${
          dark ? 'text-white' : 'text-lxr-ink'
        }`}
      >
        {title}
        {accent && (
          <>
            {' '}
            <em
              className={`font-lxrbody font-medium italic ${
                dark ? 'text-lxr-sand' : 'text-lxr-olive'
              }`}
            >
              {accent}
            </em>
          </>
        )}
      </h2>
      {copy && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed ${
            dark ? 'text-white/60' : 'text-lxr-muted'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}
