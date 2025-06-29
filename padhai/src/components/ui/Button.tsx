interface ButtonProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type, className, onClick }) => {
  const baseStyles = 'py-2 px-4 rounded-lg font-medium transition-colors duration-200';

  const typeStyles = type === 'primary'
    ? 'bg-purple-600 hover:bg-purple-700 text-white'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white';

  return (
    <button
      className={`${baseStyles} ${typeStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
