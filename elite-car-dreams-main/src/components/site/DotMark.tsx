export function DotMark({ className = "" }: { className?: string }) {
  const pattern = [1, 0.4, 1, 0.4, 0.4, 1, 0.4, 1, 1, 0.4, 1, 0.4, 0.4, 1, 0.4, 1];
  return (
    <div className={`grid w-6 shrink-0 grid-cols-4 gap-1 ${className}`} aria-hidden="true">
      {pattern.map((opacity, i) => (
        <span
          key={i}
          className="size-1 rounded-full bg-current"
          style={{ opacity }}
        />
      ))}
    </div>
  );
}
