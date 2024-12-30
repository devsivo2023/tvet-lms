interface ProgressProps {
    value?: number;
    className?: string;
  }
  
  export const Progress = ({ value = 0, className = '' }: ProgressProps) => {
    return (
      <div className={`bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
        <div 
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    );
  };