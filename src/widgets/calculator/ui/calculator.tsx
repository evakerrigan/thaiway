'use client';

import { useState } from 'react';

/**
 * Ориентиры по своим поездкам, в рублях.
 * Формула: перелёт на каждого + номер на двоих за ночь + расходы на месте на каждого.
 */
const RATES = {
  flightPerPerson: 45_000,
  roomPerNight: 2_000,
  localPerPerson: 3_000,
} as const;

type Currency = 'RUB' | 'USD' | 'THB';

/** Примерные курсы к рублю. Обновляйте при необходимости. */
const CURRENCIES: Record<Currency, { rate: number; symbol: string; label: string }> = {
  RUB: { rate: 1, symbol: '₽', label: 'Рубли' },
  USD: { rate: 95, symbol: '$', label: 'Доллары' },
  THB: { rate: 2.6, symbol: '฿', label: 'Баты' },
};

const LIMITS = { adults: [1, 10], children: [0, 10], days: [1, 60] } as const;

interface CalculatorProps {
  className?: string;
}

export const Calculator = ({ className = '' }: CalculatorProps) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(10);
  const [currency, setCurrency] = useState<Currency>('RUB');

  const people = adults + children;
  const flights = people * RATES.flightPerPerson;
  const lodging = (adults / 2) * days * RATES.roomPerNight;
  const local = people * RATES.localPerPerson;
  const total = flights + lodging + local;

  const { rate, symbol } = CURRENCIES[currency];
  const money = (rub: number) => `${formatNumber(Math.round(rub / rate))} ${symbol}`;

  const breakdown = [
    { label: 'Перелёт', hint: `${people} × ${formatNumber(RATES.flightPerPerson)} ₽`, value: flights, color: 'bg-brand' },
    { label: 'Проживание', hint: `${days} ${pluralNights(days)}, номер на двоих`, value: lodging, color: 'bg-brand-bright' },
    { label: 'Расходы на месте', hint: `${people} × ${formatNumber(RATES.localPerPerson)} ₽`, value: local, color: 'bg-gold' },
  ];

  return (
    <div className={`grid gap-5 md:grid-cols-[1fr_1.1fr] ${className}`}>
      <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line">
        <Stepper
          id="adults"
          label="Взрослые"
          value={adults}
          min={LIMITS.adults[0]}
          max={LIMITS.adults[1]}
          onChange={setAdults}
        />
        <Stepper
          id="children"
          label="Дети до 12 лет"
          value={children}
          min={LIMITS.children[0]}
          max={LIMITS.children[1]}
          onChange={setChildren}
        />
        <Stepper
          id="days"
          label="Дней в поездке"
          value={days}
          min={LIMITS.days[0]}
          max={LIMITS.days[1]}
          onChange={setDays}
        />
      </div>

      <div className="flex flex-col gap-5 rounded-3xl bg-plate p-6 text-plate-fg shadow-card">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-plate-fg/70">
            Итого на {people} {pluralPeople(people)}
          </p>
          <div className="inline-flex rounded-full bg-white/10 p-0.5" role="radiogroup" aria-label="Валюта">
            {(Object.keys(CURRENCIES) as Currency[]).map((code) => {
              const isActive = code === currency;
              return (
                <button
                  key={code}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={CURRENCIES[code].label}
                  onClick={() => setCurrency(code)}
                  className={`h-7 min-w-8 rounded-full px-2 text-xs font-bold transition-colors ${
                    isActive ? 'bg-brand-bright text-[#06282b]' : 'text-plate-fg/70 hover:text-plate-fg'
                  }`}
                >
                  {CURRENCIES[code].symbol}
                </button>
              );
            })}
          </div>
        </div>

        <p className="font-display text-4xl font-bold tabular-nums tracking-tight text-brand-bright sm:text-5xl" aria-live="polite">
          {money(total)}
        </p>

        <div className="flex h-2 overflow-hidden rounded-full bg-white/10" aria-hidden>
          {breakdown.map((part) => (
            <span
              key={part.label}
              className={part.color}
              style={{ width: `${total ? (part.value / total) * 100 : 0}%` }}
            />
          ))}
        </div>

        <dl className="space-y-2.5">
          {breakdown.map((part) => (
            <div key={part.label} className="flex items-start justify-between gap-4 text-sm">
              <dt className="flex items-start gap-2">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${part.color}`} aria-hidden />
                <span>
                  <span className="font-semibold">{part.label}</span>
                  <span className="block text-xs text-plate-fg/60">{part.hint}</span>
                </span>
              </dt>
              <dd className="font-semibold tabular-nums">{money(part.value)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto text-xs leading-relaxed text-plate-fg/55">
          Ориентир по своим поездкам из Москвы: без страховки, экскурсий и аренды машины. Курсы
          валют примерные.
        </p>
      </div>
    </div>
  );
};

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-[15px] font-semibold text-fg">
        {label}
      </label>
      <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-line bg-surface">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={`Меньше: ${label.toLowerCase()}`}
          className="grid h-full w-11 place-items-center text-lg font-bold text-accent transition-colors hover:bg-surface-2 disabled:text-muted disabled:hover:bg-transparent"
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || min))}
          className="h-full w-12 border-x border-line bg-transparent text-center text-lg font-bold tabular-nums text-fg outline-none [appearance:textfield] focus-visible:bg-brand-soft [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={`Больше: ${label.toLowerCase()}`}
          className="grid h-full w-11 place-items-center text-lg font-bold text-accent transition-colors hover:bg-surface-2 disabled:text-muted disabled:hover:bg-transparent"
        >
          +
        </button>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function pluralNights(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'ночь';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'ночи';
  return 'ночей';
}

function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'человека';
  return 'человек';
}
