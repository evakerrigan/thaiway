'use client';

import { useState, useEffect } from 'react';

interface CalculatorProps {
  className?: string;
}

export const Calculator = ({ className = '' }: CalculatorProps) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  // Формула: итог = взрослых *45000 + детей * 45000 + (взрослых /2)* дней * 2000 + (взрослых + детей)*3000
  useEffect(() => {
    const calculatedTotal = 
      adults * 45000 + 
      children * 45000 + 
      (adults / 2) * days * 2000 + 
      (adults + children) * 3000;
    
    setTotal(Math.round(calculatedTotal));
  }, [adults, children, days]);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-200 ${className}`}>
      {/* Заголовок */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🧮 Калькулятор</h3>
        <p className="text-sm text-gray-600">
          Сколько вам обойдется поездка в Тай из Москвы
        </p>
      </div>

      {/* Инпуты в одну строчку */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Взрослые */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сколько взрослых
          </label>
          <input
            type="number"
            min="0"
            value={adults}
            onChange={(e) => setAdults(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        {/* Дети */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сколько детей
          </label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        {/* Дни */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сколько дней
          </label>
          <input
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      {/* Результат под инпутами */}
      <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center">
        <div className="text-sm text-gray-600 mb-2">Итоговая стоимость:</div>
        <div className="text-4xl font-bold text-blue-600">
          {formatNumber(total)} ₽
        </div>
        {total > 0 && (
          <div className="text-sm text-gray-500 mt-2">
            ≈ {formatNumber(Math.round(total / 95))} $
          </div>
        )}
      </div>
    </div>
  );
};

