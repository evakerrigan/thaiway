# 🏛️ Архитектура проекта ThaiWay

## Feature-Sliced Design (FSD)

Проект построен по методологии FSD - архитектурной методологии для frontend-проектов.

## 📊 Слои архитектуры

```
┌─────────────────────────────────────────┐
│             APP LAYER                    │  ← Инициализация приложения
│  - Layout (Header + Footer + children)  │
│  - Global Styles                         │
│  - Routes                                │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           WIDGETS LAYER                  │  ← Композитные блоки
│  - Header (навигация)                    │
│  - Footer                                │
│  - YandexMap                             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           SHARED LAYER                   │  ← Переиспользуемые модули
│  - UI Kit (Container)                    │
│  - Config (Routes, Navigation)           │
│  - API (Yandex Maps settings)            │
└─────────────────────────────────────────┘
```

## 🔄 Потоки данных

### Навигация
```
User Click → Header (client component)
           ↓
    Next.js Navigation
           ↓
    Route from shared/config
           ↓
    Page Component
```

### Отображение карты
```
Page Component → YandexMap Widget
                ↓
         shared/api/yandex-maps (config)
                ↓
         Yandex Maps API
                ↓
         Render Map
```

## 📁 Детальная структура

### `/src/app` - Приложение
- **layout.tsx** - корневой layout со структурой страницы
- **page.tsx** - главная страница (/)
- **page-2/** - вторая страница (/page-2)
- **page-3/** - третья страница (/page-3)

### `/src/widgets` - Виджеты
```
widgets/
├── header/
│   ├── ui/
│   │   └── header.tsx        # Клиентский компонент с навигацией
│   └── index.ts              # Public API
├── footer/
│   ├── ui/
│   │   └── footer.tsx        # Серверный компонент
│   └── index.ts
└── yandex-map/
    ├── ui/
    │   └── yandex-map.tsx    # Клиентский компонент с картой
    └── index.ts
```

### `/src/shared` - Общее
```
shared/
├── ui/
│   └── container/
│       ├── container.tsx      # Контейнер для контента
│       └── index.ts
├── config/
│   ├── routes.ts             # Константы маршрутов и навигации
│   └── index.ts
└── api/
    ├── yandex-maps.ts        # Конфигурация Яндекс карт
    └── index.ts
```

## 🎯 Принципы

### 1. Изоляция слоев
- Верхние слои могут использовать нижние
- Нижние слои НЕ знают о верхних
- Shared не зависит ни от чего

### 2. Public API
- Каждый модуль экспортирует через index.ts
- Импорты только через Public API
- Пример: `import { Header } from '@/widgets/header'`

### 3. Разделение ответственности
- **app** - настройка приложения
- **widgets** - сложные UI-блоки
- **shared** - переиспользуемый код

## 🔧 Расширение

### Добавление нового виджета
1. Создать папку в `src/widgets/`
2. Создать `ui/` папку с компонентом
3. Создать `index.ts` для экспорта
4. Использовать в страницах

### Добавление новой страницы
1. Создать папку в `src/app/`
2. Добавить `page.tsx`
3. Обновить `shared/config/routes.ts`
4. Добавить в навигацию Header

### Добавление shared утилиты
1. Создать папку в `src/shared/`
2. Реализовать функционал
3. Экспортировать через `index.ts`
4. Использовать в любом слое выше

## 🎨 Стайлинг

Используется **Tailwind CSS 4**:
- Утилитарные классы
- Responsive дизайн из коробки
- Кастомная тема в `globals.css`

## 🚀 Производительность

- **Server Components** по умолчанию
- **Client Components** только где нужна интерактивность
- **Code Splitting** автоматически в Next.js
- **Lazy Loading** для тяжелых компонентов

## 📈 Будущее расширение

Слои, которые можно добавить:

1. **features/** - бизнес-функции (фильтры, поиск)
2. **entities/** - бизнес-сущности (Place, User)
3. **processes/** - сценарии использования

---

**Архитектура**: Feature-Sliced Design  
**Фреймворк**: Next.js 16 (App Router)  
**Язык**: TypeScript  
**Стилизация**: Tailwind CSS 4

