'use client';

import { useEffect, useState } from 'react';

interface CopyLinkButtonProps {
  /** id якоря карточки, например `place-vana-tara`. */
  anchorId: string;
}

/**
 * Копирует ссылку прямо на карточку места: https://сайт/страница#place-<id>.
 * Если буфер обмена недоступен — просто ставит якорь в адресную строку, оттуда ссылку можно скопировать.
 */
export const CopyLinkButton = ({ anchorId }: CopyLinkButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'in-address-bar'>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), 2500);
    return () => clearTimeout(timer);
  }, [status]);

  const handleClick = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    // Ставим якорь в адрес без прыжка страницы — чтобы ссылку было видно и в адресной строке.
    window.history.replaceState(null, '', `#${anchorId}`);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      setStatus('in-address-bar');
    }
  };

  const label =
    status === 'copied' ? 'Ссылка скопирована' : status === 'in-address-bar' ? 'Ссылка — в адресной строке' : 'Ссылка на это место';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex cursor-pointer items-center gap-2 self-start rounded-full border-[1.5px] border-dashed border-ink px-5 py-3 font-bold text-ink transition-colors hover:bg-paper-deep sm:self-auto"
    >
      {status === 'copied' ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-jade" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m5 12 5 5L20 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
        </svg>
      )}
      <span aria-live="polite">{label}</span>
    </button>
  );
};
