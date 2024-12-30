import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`border rounded-lg shadow-sm ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`p-4 border-b ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <h3 
    className={`text-lg font-semibold ${className}`} 
    {...props}
  >
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`p-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);