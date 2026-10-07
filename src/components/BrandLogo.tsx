import { cn } from "../lib/cn";

const sizes = { sm: "h-8", md: "h-14", lg: "h-32" } as const;

export function BrandLogo({ className, size = "md" }: { className?: string; size?: keyof typeof sizes }) {
  return (
    <img
      src="/logo.png"
      alt="ERP"
      width={98}
      height={80}
      className={cn("w-auto max-w-full object-contain select-none", sizes[size], className)}
    />
  );
}
