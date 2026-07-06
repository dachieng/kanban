"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn as cx } from "@/lib/cn";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerRect: DOMRect | null;
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
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (controlledOpen === undefined) setUncontrolledOpen(next);
  };

  // The popover portals into document.body (see PopoverContent) so it can't
  // be clipped by an ancestor's overflow-x-auto — a scrolling row of Kanban
  // columns would otherwise cut it off whenever a column is short. Since it's
  // no longer positioned relative to its trigger via CSS, we compute the
  // trigger's on-screen position ourselves and use `position: fixed`.
  useLayoutEffect(() => {
    if (open && containerRef.current) {
      setTriggerRect(containerRef.current.getBoundingClientRect());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideTrigger = containerRef.current?.contains(target);
      const insideContent = document.getElementById(contentId)?.contains(target);
      if (!insideTrigger && !insideContent) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contentId]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, contentId, triggerRect }}>
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

const GAP = 4;

export const PopoverContent = ({
  align = "start",
  className,
  style,
  ...props
}: PopoverContentProps) => {
  const { open, contentId, triggerRect } = usePopoverContext("PopoverContent");

  if (!open || !triggerRect || typeof document === "undefined") return null;

  const position: CSSProperties = {
    position: "fixed",
    top: triggerRect.bottom + GAP,
    ...(align === "end"
      ? { right: window.innerWidth - triggerRect.right }
      : align === "center"
        ? { left: triggerRect.left + triggerRect.width / 2, transform: "translateX(-50%)" }
        : { left: triggerRect.left }),
    ...style,
  };

  return createPortal(
    <div
      id={contentId}
      role="dialog"
      style={position}
      className={cx(
        "radius-md z-[100] min-w-55 border border-secondary-light bg-white p-spacing-lg text-sm leading-sm text-secondary-900 shadow-md",
        className,
      )}
      {...props}
    />,
    document.body,
  );
};
