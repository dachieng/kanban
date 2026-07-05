"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string) {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within a <Popover>`);
  }
  return ctx;
}

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (controlledOpen === undefined) setUncontrolledOpen(next);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, contentId }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  children: ReactElement<{ onClick?: (event: React.MouseEvent) => void }>;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { open, setOpen, contentId } = usePopoverContext("PopoverTrigger");

  return cloneElement(children, {
    onClick: (event: React.MouseEvent) => {
      children.props.onClick?.(event);
      setOpen(!open);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": contentId,
  } as Record<string, unknown>);
};

export type PopoverAlign = "start" | "center" | "end";

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: PopoverAlign;
}

const alignClasses: Record<PopoverAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export const PopoverContent = ({
  align = "start",
  className,
  ...props
}: PopoverContentProps) => {
  const { open, contentId } = usePopoverContext("PopoverContent");

  if (!open) return null;

  return (
    <div
      id={contentId}
      role="dialog"
      className={cx(
        "radius-md absolute top-full z-50 mt-spacing-xs min-w-55 border border-secondary-light bg-white p-spacing-lg text-sm leading-sm text-secondary-900 shadow-md",
        alignClasses[align],
        className,
      )}
      {...props}
    />
  );
};
