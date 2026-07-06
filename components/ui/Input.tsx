import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      startIcon,
      endIcon,
      hint,
      error,
      id,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const message = error ?? hint;

    const inputClasses = cn(
      "radius-md w-full border bg-white py-spacing-sm px-spacing-lg text-sm leading-sm text-secondary-900 transition-colors placeholder:text-secondary-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-secondary-50 disabled:text-secondary-400",
      startIcon ? "pl-9" : "",
      endIcon ? "pr-9" : "",
      error
        ? "border-error focus:border-error focus:ring-1 focus:ring-error"
        : "border-secondary-light focus:border-brand focus:ring-1 focus:ring-brand",
      className,
    );

    return (
      <div className="flex flex-col gap-spacing-xs">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm leading-sm font-medium text-secondary-900"
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <span className="pointer-events-none absolute left-spacing-lg flex items-center text-secondary-400">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          {endIcon && (
            <span className="pointer-events-none absolute right-spacing-lg flex items-center text-secondary-400">
              {endIcon}
            </span>
          )}
        </div>
        {message && (
          <p
            className={
              error
                ? "text-sm leading-sm text-error"
                : "text-sm leading-sm text-secondary-500"
            }
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
