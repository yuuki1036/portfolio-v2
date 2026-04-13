import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg font-bold hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(200,162,90,0.28)] relative overflow-hidden",
  outline:
    "border border-border2 text-sub font-bold hover:-translate-y-0.5 hover:border-sub hover:text-text",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-7 py-3 text-xs",
  lg: "px-8 py-3.5 text-sm",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
