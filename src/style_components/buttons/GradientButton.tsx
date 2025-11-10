import React from "react";
import clsx from "clsx";

interface GradientButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  padding?: string;
  margin?: string;
  border?: string;
  rounded?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-1.5",
};

export default function GradientButton({
  children,
  size = "md",
  padding,
  margin,
  border,
  rounded,
  fullWidth,
  disabled,
  onClick,
  className,
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // gradient background
        "bg-gradient-to-tr from-orange-400 via-orange-500 to-red-500",
        "text-white font-semibold shadow-md transition active:scale-95",
        "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",

        // dynamic classes
        sizeClasses[size],
        fullWidth && "w-full",
        padding && padding,
        margin && margin,
        border && border,
        rounded ?? "rounded-lg",

        className
      )}
    >
      {children}
    </button>
  );
}

// ex:
// <GradientButton size="sm">Small</GradientButton>
//       <GradientButton size="md">Medium</GradientButton>
//       <GradientButton size="lg">Large</GradientButton>
//       <GradientButton padding="px-10 py-2">Big Padding</GradientButton>
//       <GradientButton margin="mt-40 ml-20">With Margin</GradientButton>
//       <GradientButton border="border border-yellow-400">Border</GradientButton>
//       <GradientButton rounded="rounded-full">Full Round</GradientButton>
//       <GradientButton fullWidth>Create Account</GradientButton>
//       <GradientButton disabled>Loading...</GradientButton>