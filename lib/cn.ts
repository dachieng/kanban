import { twMerge } from "tailwind-merge";

const cn = (...classes: Array<string | false | undefined>) => {
  return twMerge(classes.filter(Boolean).join(" "));
};

export { cn };
