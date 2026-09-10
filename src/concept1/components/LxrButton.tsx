import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type Variant = 'dark' | 'light' | 'outline' | 'outlineLight' | 'olive';

interface LxrButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}

const STYLES: Record<Variant, string> = {
  dark: 'bg-lxr-black text-white hover:bg-lxr-panel',
  light: 'bg-white text-lxr-ink hover:bg-lxr-gray',
  outline: 'border border-lxr-ink/25 text-lxr-ink hover:border-lxr-ink hover:bg-lxr-ink hover:text-white',
  outlineLight:
    'border border-white/30 text-white hover:border-white hover:bg-white hover:text-lxr-ink',
  olive: 'bg-lxr-olive text-white hover:bg-lxr-olivedeep',
};

export default function LxrButton({
  to,
  children,
  variant = 'dark',
  arrow = true,
  className = '',
}: LxrButtonProps) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 rounded-[4px] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${STYLES[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
