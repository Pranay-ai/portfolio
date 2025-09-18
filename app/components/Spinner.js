"use client";

export default function Spinner({ className = "" }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={
        "inline-block h-6 w-6 animate-spin rounded-full border-2 " +
        "border-current border-t-transparent align-[-0.125em] " +
        "motion-reduce:animate-[spin_1.5s_linear_infinite] " +
        className
      }
    />
  );
}
