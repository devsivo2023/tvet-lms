// src/components/ui/input.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for combining classNames

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outlined' | 'ghost';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'border border-gray-300 focus:ring-2 focus:ring-blue-500',
      outlined: 'border-2 border-gray-400 bg-transparent',
      ghost: 'border-transparent hover:border-gray-300 focus:border-blue-500'
    };

    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2 rounded-md text-sm',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';