interface InputProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({ placeholder, onChange, value }: InputProps) {
  return (
    <input
      className="bg-transparent border-b-[1px] pb-[2px] w-full text-light px-[6px] outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
