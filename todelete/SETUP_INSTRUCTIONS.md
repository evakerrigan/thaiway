# 🇹🇭 Инструкция по развертыванию Next.js для проекта ThaiWay

## 📋 Предварительные требования

Убедитесь, что у Вас установлены:
- **Node.js** версии 18.17 или выше ([скачать](https://nodejs.org/))
- **npm** или **yarn** (устанавливается вместе с Node.js)
- **Git** (уже установлен, судя по вашей оболочке)

Проверить версии можно командами:
```bash
node --version
npm --version
```

## 🚀 Способ 1: Автоматическая установка с create-next-app (Рекомендуется)

### Шаг 1: Создание Next.js приложения

В корне вашего репозитория выполните:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Эта команда установит Next.js прямо в текущую директорию со следующими настройками:
- ✅ TypeScript
- ✅ Tailwind CSS (для красивого дизайна)
- ✅ ESLint (для качества кода)
- ✅ App Router (новая архитектура Next.js)
- ✅ Src директория
- ✅ Import alias (@/...)

### Шаг 2: Запуск проекта

```bash
npm run dev
```

Откройте браузер и перейдите на http://localhost:3000

## 🔧 Способ 2: Ручная установка (для большего контроля)

### Шаг 1: Инициализация package.json

```bash
npm init -y
```

### Шаг 2: Установка Next.js и React

```bash
npm install next@latest react@latest react-dom@latest
```

### Шаг 3: Установка TypeScript и зависимостей

```bash
npm install -D typescript @types/react @types/node @types/react-dom
```

### Шаг 4: Установка Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Шаг 5: Создание структуры проекта

Создайте следующие файлы и папки:

```
thaiway/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── public/
│   └── images/
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

### Шаг 6: Настройка package.json

Добавьте скрипты в `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Шаг 7: Создание базовых файлов

**src/app/layout.tsx:**
```tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ThaiWay - Путеводитель по Таиланду',
  description: 'Ваш личный гид по удивительному Таиланду',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**src/app/page.tsx:**
```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        🇹🇭 ThaiWay - Путеводитель по Таиланду
      </h1>
      <p className="text-center text-lg">
        Добро пожаловать в самый удобный путеводитель по Таиланду!
      </p>
    </main>
  )
}
```

**src/app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
```

**tailwind.config.js:**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📁 Рекомендуемая структура для путеводителя

```
thaiway/
├── src/
│   ├── app/
│   │   ├── destinations/        # Страницы с местами
│   │   │   ├── bangkok/
│   │   │   ├── phuket/
│   │   │   └── chiang-mai/
│   │   ├── food/                # Тайская кухня
│   │   ├── culture/             # Культура и традиции
│   │   ├── tips/                # Полезные советы
│   │   └── about/               # О проекте
│   ├── components/              # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PlaceCard.tsx
│   │   └── Map.tsx
│   ├── lib/                     # Утилиты и хелперы
│   └── types/                   # TypeScript типы
├── public/
│   ├── images/
│   │   ├── destinations/
│   │   ├── food/
│   │   └── culture/
│   └── icons/
└── data/                        # JSON с данными о местах
    ├── destinations.json
    ├── restaurants.json
    └── attractions.json
```

## 🎨 Дополнительные полезные пакеты для путеводителя

```bash
# Для карт
npm install react-leaflet leaflet
npm install -D @types/leaflet

# Для изображений
npm install next-image-export-optimizer

# Для иконок
npm install lucide-react

# Для форматирования дат
npm install date-fns

# Для работы с формами (если планируете обратную связь)
npm install react-hook-form zod @hookform/resolvers

# Для красивых UI компонентов
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install class-variance-authority clsx tailwind-merge
```

## 🌐 Настройка для деплоя

### Vercel (рекомендуется для Next.js)

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub репозиторий
3. Vercel автоматически определит Next.js проект
4. Нажмите Deploy!

### Альтернативы

- **Netlify**: Также поддерживает Next.js
- **Railway**: Простой деплой с базами данных
- **AWS Amplify**: Для более сложных проектов

## 📝 Git настройки

Создайте `.gitignore`:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 🚦 Следующие шаги

1. Установите Next.js одним из способов выше
2. Запустите `npm run dev`
3. Начните создавать компоненты для вашего путеводителя
4. Добавьте страницы для разных городов Таиланда
5. Наполните контентом и красивыми фотографиями

## 💡 Идеи для путеводителя ThaiWay

- **Интерактивные карты** с достопримечательностями
- **Фильтры** по типам мест (пляжи, храмы, рестораны)
- **Рейтинги и отзывы** мест
- **Маршруты** на несколько дней
- **Полезные фразы** на тайском
- **Бюджетный калькулятор** поездки
- **Погода и лучшее время для визита**
- **Транспорт и как добраться**

## 📞 Помощь

Если возникнут вопросы:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Удачи в создании путеводителя! 🇹🇭✨


