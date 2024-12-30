import React from 'react';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => onOpenChange?.(false)} />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg shadow-lg pointer-events-auto max-w-md w-full mx-4">
          {children}
        </div>
      </div>
    </>
  );
};

export const AlertDialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export const AlertDialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const AlertDialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const AlertDialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-gray-500 mt-2">{children}</p>;
};

export const AlertDialogAction: React.FC<{ onClick?: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    >
      {children}
    </button>
  );
};

export const AlertDialogCancel: React.FC<{ onClick?: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    >
      {children}
    </button>
  );
};