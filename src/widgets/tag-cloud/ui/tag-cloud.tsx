'use client';

interface Tag {
  id: string;
  label: string;
  hasData: boolean;
  emoji: string;
}

const TAGS: Tag[] = [
  { id: 'thailand', label: 'Таиланд', hasData: true, emoji: '🇹🇭' },
  { id: 'north-trip', label: 'Путешествие на север на машине', hasData: true, emoji: '🚗' },
  { id: 'top-places', label: '11 лучших мест', hasData: true, emoji: '⭐' },
  { id: 'museums', label: 'Музеи', hasData: false, emoji: '🏛️' },
  { id: 'cafes', label: 'Кафе', hasData: false, emoji: '☕' },
  { id: 'attractions', label: 'Достопримечательности', hasData: false, emoji: '📍' },
  { id: 'hotels', label: 'Отели', hasData: false, emoji: '🏨' },
];

interface TagCloudProps {
  activeTags: string[];
  onTagToggle: (tagId: string) => void;
}

export const TagCloud = ({ activeTags, onTagToggle }: TagCloudProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1.5 justify-center">
        {TAGS.map((tag) => {
          const isSelected = activeTags.includes(tag.id);
          const isAvailable = tag.hasData;

          return (
            <button
              key={tag.id}
              onClick={() => isAvailable && onTagToggle(tag.id)}
              disabled={!isAvailable}
              title={!isAvailable ? 'Данные появятся позже' : undefined}
              className={`
                inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                transition-all duration-200 select-none
                ${isAvailable
                  ? isSelected
                    ? 'bg-brand text-white shadow-sm hover:bg-brand-hover active:scale-95'
                    : 'bg-white text-teal-700 border border-brand hover:bg-teal-50 active:scale-95'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
                }
              `}
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
              {!isAvailable && (
                <span className="text-[10px] opacity-70 ml-0.5">· скоро</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
