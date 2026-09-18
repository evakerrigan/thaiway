'use client';

import { useEffect, useId, ReactNode } from 'react';

export type ModalVariant = 'center' | 'panel' | 'sheet';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /**
   * center — окно по центру;
   * panel — боковая панель справа на десктопе и шторка снизу на телефоне;
   * sheet — всегда шторка снизу.
   */
  variant?: ModalVariant;
  /** Доступное имя диалога. */
  label?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<ModalVariant, { wrapper: string; box: string }> = {
  center: {
    wrapper: 'items-center justify-center p-4',
    box: 'tw-slide-up max-w-2xl w-full max-h-[90vh] rounded-2xl',
  },
  panel: {
    wrapper: 'items-end justify-center p-0 md:items-start md:justify-end md:p-4',
    box: 'tw-slide-up md:tw-slide-left w-full max-h-[88vh] rounded-t-2xl md:my-0 md:h-auto md:max-h-full md:w-[440px] md:rounded-2xl',
  },
  sheet: {
    wrapper: 'items-end justify-center p-0',
    box: 'tw-slide-up w-full max-h-[85vh] rounded-t-2xl',
  },
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  variant = 'center',
  label,
  className = '',
}: ModalProps) => {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const classes = VARIANT_CLASSES[variant];

  return (
    <div
      className={`fixed inset-0 z-50 flex ${classes.wrapper}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-describedby={label ? undefined : titleId}
    >
      <div className="tw-fade-in absolute inset-0 bg-[#06282b]/55 backdrop-blur-sm" />

      <div
        className={`relative flex flex-col overflow-hidden bg-surface text-fg shadow-2xl ${classes.box} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-fg shadow-md transition-colors hover:bg-surface"
          aria-label="Закрыть"
        >
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
