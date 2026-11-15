import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    // w-full обязателен: <main> — flex-колонка, и элемент с mx-auto в ней
    // иначе сжимается до ширины содержимого (так карта на /top-places была ~640px).
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
};
