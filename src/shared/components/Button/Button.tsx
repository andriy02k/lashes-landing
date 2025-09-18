import { cn } from "@/utils/classNames";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "destructive" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",

        variant === "default" &&
          "bg-primary/80 text-foreground hover:bg-primary",
        variant === "destructive" &&
          "bg-destructive/80 text-foreground hover:bg-destructive",
        variant === "outline" &&
          "border border-muted bg-transparent hover:bg-muted/10",
        variant === "ghost" && "bg-transparent hover:bg-muted/10",
        variant === "link" && "underline underline-offset-4 hover:text-primary",

        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-base",
        size === "lg" && "h-12 px-6 text-lg",
        className
      )}
      {...props}
    />
  );
}
