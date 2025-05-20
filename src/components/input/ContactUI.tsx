import type { ChangeEvent, CSSProperties, ReactNode } from "react";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export function Input({ id, type = "text", placeholder, value, onChange, className = "", style }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded-sm ${className}`}
      style={style}
    />
  );
}

// Custom Label component
interface LabelProps {
  htmlFor: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Label({ htmlFor, className = "", style, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className} style={style}>
      {children}
    </label>
  );
}

// Custom Textarea component
interface TextareaProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  style?: CSSProperties;
  rows?: number;
}

export function Textarea({ id, placeholder, value, onChange, className = "", style, rows = 4 }: TextareaProps) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded-sm ${className}`}
      style={style}
      rows={rows}
    />
  );
}

// Custom Dialog + DialogContent component
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 z-40 bg-black/90 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative z-50">
        {children}
      </div>
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 hover:opacity-70 text-white text-[30px]"
        aria-label="Close dialog"
      >
        &times;
      </button>
    </div>
  );
}

interface DialogContentProps {
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
}

export function DialogContent({ className = "", overlayClassName = "", children }: DialogContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
