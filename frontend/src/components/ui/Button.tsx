import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-gold text-ink hover:bg-goldSoft active:scale-[0.98]"
      : "bg-transparent border border-line text-white hover:border-ink2 active:scale-[0.98]";

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
