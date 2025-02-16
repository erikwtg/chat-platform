interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      className={`w-full bg-green-400 text-gray-900 p-2 rounded-md hover:bg-green-500 transition duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}