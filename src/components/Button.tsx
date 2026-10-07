import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement } from "react";
import { cn } from "../lib/cn";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border bg-card hover:bg-secondary",
};
const sizes = {
  sm: "h-8 px-3",
  default: "h-9 px-4",
  lg: "h-11 px-6 text-base",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Style the single child element (a link) instead of rendering a <button>. */
  asChild?: boolean;
};

export function Button({ variant = "default", size = "default", asChild, className, children, ...rest }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, { className: cn(classes, child.props.className) });
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
