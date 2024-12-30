// src/components/ui/select.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'outlined' | 'ghost';
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    children, 
    className, 
    variant = 'default', 
    onValueChange, 
    onChange,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      
      // Call both onChange and onValueChange if provided
      if (onChange) {
        onChange(e);
      }
      
      if (onValueChange) {
        onValueChange(value);
      }
    };

    const variantStyles = {
      default: 'border border-gray-300 focus:ring-2 focus:ring-blue-500',
      outlined: 'border-2 border-gray-400 bg-transparent',
      ghost: 'border-transparent hover:border-gray-300 focus:border-blue-500'
    };

    return (
      <select
        ref={ref}
        className={cn(
          'w-full px-3 py-2 rounded-md text-sm',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none appearance-none',
          'bg-no-repeat bg-right',
          variantStyles[variant],
          className
        )}
        onChange={handleChange}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em'
        }}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';