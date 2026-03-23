import React from "react";

const SIZE_CLASSES = {
  sm: "h-4 w-4 border-2",
  md: "h-10 w-10 border-4",
};

export default function Loader({ size = "md", text, centered = false, className = "" }) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (centered) {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${className}`.trim()}>
        <div
          className={`${sizeClass} animate-spin rounded-full border-zinc-700 border-t-violet-400`}
          aria-label="Loading"
        />
        {text ? <p className="text-zinc-300">{text}</p> : null}
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <span
        className={`${sizeClass} animate-spin rounded-full border-zinc-700 border-t-violet-400`}
        aria-label="Loading"
      />
      {text ? <span>{text}</span> : null}
    </span>
  );
}
