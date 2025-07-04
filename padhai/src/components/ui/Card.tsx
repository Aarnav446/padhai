interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
