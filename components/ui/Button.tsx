import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "primary-outline"
  | "destructive"
  | "destructive-outline"
  | "success"
  | "success-outline"
  | "warning"
  | "warning-outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white border-transparent",
  "primary-outline": "bg-white text-brand border-brand",
  destructive: "bg-error text-white border-transparent",
  "destructive-outline": "bg-white text-error border-error",
  success: "bg-success text-white border-transparent",
  "success-outline": "bg-white text-success border-success",
  warning: "bg-warning text-white border-transparent",
  "warning-outline": "bg-white text-warning border-warning",
  ghost: "bg-transparent text-brand border-transparent hover:bg-brand-light",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "py-spacing-md px-[14px] gap-spacing-md radius-md",
  md: "py-[10px] px-[14px] gap-spacing-xs radius-md",
  lg: "py-[10px] px-spacing-xl gap-spacing-sm radius-md",
  xl: "py-spacing-lg px-[18px] gap-spacing-sm radius-md",
  "2xl": "py-spacing-xl px-[22px] gap-spacing-md radius-lg",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const classes = [
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap border text-sm leading-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
};

export default Button;
