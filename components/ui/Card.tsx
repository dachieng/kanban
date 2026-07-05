import type { HTMLAttributes } from "react";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      "radius-lg border border-secondary-200 bg-white shadow-sm",
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
    className={cx("flex flex-col gap-spacing-sm p-spacing-3xl", className)}
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
      "flex items-center gap-spacing-md px-spacing-3xl pb-spacing-3xl",
      className,
    )}
    {...props}
  />
);
