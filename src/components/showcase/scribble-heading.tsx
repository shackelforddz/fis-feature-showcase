import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
};

export function ScribbleHeading({ children, rotate = -2.5, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block w-fit self-start font-handwritten text-white text-[1.25vw] leading-none whitespace-nowrap",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
