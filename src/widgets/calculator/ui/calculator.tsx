'use client';

import { useState } from 'react';

interface CalculatorProps {
  className?: string;
  /** Стартовые значения полей (по умолчанию все нули). */
  initialAdults?: number;
  initialChildren?: number;
  initialDays?: number;
}

const toCount = (value: string) => Math.max(0, parseInt(value, 10) || 0);
const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const Calculator = ({
  className = '',
  initialAdults = 0,
  initialChildren = 0,
  initialDays = 0,
}: CalculatorProps) => {
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [days, setDays] = useState(initialDays);

  // Формула: итог = взрослых *45000 + детей * 45000 + (взрослых /2)* дней * 2000 + (взрослых + детей)*3000
  const total = Math.round(
    adults * 45000 + children * 45000 + (adults / 2) * days * 2000 + (adults + children) * 3000
  );

  const fields = [
    { id: 'calc-adults', label: 'Взрослые', value: adults, set: setAdults },
    { id: 'calc-children', label: 'Дети', value: children, set: setChildren },
    { id: 'calc-days', label: 'Дней', value: days, set: setDays },
  ];

  return (
    <div className={`flex flex-col gap-6 bg-paper-light p-6 text-ink shadow-paper sm:p-8 ${className}`}>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {fields.map((field) => (
          <div key={field.id} className="flex min-w-0 flex-col gap-2">
            <label htmlFor={field.id} className="text-sm font-semibold">
              {field.label}
            </label>
            <input
              id={field.id}
              type="number"
              inputMode="numeric"
              min="0"
              value={field.value}
              onChange={(e) => field.set(toCount(e.target.value))}
              className="w-full min-w-0 border-[1.5px] border-ink bg-white px-3 py-3 text-2xl font-bold text-ink focus:border-terracotta focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-dashed border-[#9C8E7B] pt-5">
        <span className="text-[15px] text-ink-soft">Примерно выйдет</span>
        <span className="flex flex-col items-end">
          <output
            htmlFor={fields.map((f) => f.id).join(' ')}
            aria-live="polite"
            className="font-display text-4xl font-bold text-terracotta sm:text-5xl"
          >
            {formatNumber(total)} ₽
          </output>
          {total > 0 && (
            <span className="mt-1 text-sm text-ink-muted">≈ {formatNumber(Math.round(total / 95))} $</span>
          )}
        </span>
      </div>
    </div>
  );
};
