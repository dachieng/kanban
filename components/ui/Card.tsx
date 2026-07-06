import type { HTMLAttributes, Ref } from "react";

import { cn as cx } from "@/lib/cn";

export const Card = ({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cx(
      "radius-sm border border-secondary-200 bg-white shadow-sm",
      className,
    )}
    {...props}
  />
);

export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      "flex flex-col gap-spacing-sm border-b border-secondary-light p-spacing-3xl",
      className,
    )}
    {...props}
  />
);

export const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cx(
      "text-lg leading-lg font-semibold text-secondary-900",
      className,
    )}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cx("text-sm leading-sm text-secondary-500", className)}
    {...props}
  />
);

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("px-spacing-3xl pb-spacing-3xl", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      "flex items-center gap-spacing-md border-t border-secondary-light px-spacing-3xl pt-spacing-md pb-spacing-3xl",
      className,
    )}
    {...props}
  />
);
