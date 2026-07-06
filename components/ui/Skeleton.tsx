import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("radius-sm animate-pulse bg-secondary-light", className)}
    {...props}
  />
);

export default Skeleton;
