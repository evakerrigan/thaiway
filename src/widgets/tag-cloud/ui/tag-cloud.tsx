'use client';

interface Tag {
  id: string;
  label: string;
  hasData: boolean;
  /** Классы «наклейки», когда слой включён. */
  activeClass?: string;
}

const TAGS: Tag[] = [
  { id: 'thailand', label: 'Таиланд', hasData: true, activeClass: 'bg-ink text-paper border-ink' },
  {
    id: 'north-trip',
    label: 'Путешествие на север на машине',
    hasData: true,
    activeClass: 'bg-terracotta text-white border-terracotta',
  },
  { id: 'top-places', label: '11 лучших мест', hasData: true, activeClass: 'bg-jade text-white border-jade' },
  // Цвет совпадает с метками кафе на карте
  { id: 'cafes', label: 'Кафе', hasData: true, activeClass: 'bg-[#8A5A12] text-white border-[#8A5A12]' },
  { id: 'museums', label: 'Музеи', hasData: false },
  { id: 'attractions', label: 'Достопримечательности', hasData: false },
  { id: 'hotels', label: 'Отели', hasData: false },
];

/** Лёгкий наклон, как у наклеек в дневнике. */
const TILTS = [-1, 1, -1.5, 0.5, -0.5, 1.2, -1.2];

interface TagCloudProps {
  activeTags: string[];
  onTagToggle: (tagId: string) => void;
}

export const TagCloud = ({ activeTags, onTagToggle }: TagCloudProps) => {
  return (
    <div role="group" aria-label="Слои карты" className="flex flex-wrap gap-2.5">
      {TAGS.map((tag, index) => {
        const isSelected = activeTags.includes(tag.id);
        const style = { transform: `rotate(${TILTS[index % TILTS.length]}deg)` };

        if (!tag.hasData) {
          return (
            <button
              key={tag.id}
              type="button"
              disabled
              title="Данные появятся позже"
              style={style}
              className="min-h-11 cursor-not-allowed border-[1.5px] border-dashed border-[#9C8E7B] bg-transparent px-4 py-2.5 text-sm font-semibold text-ink-muted"
            >
              {tag.label} · скоро
            </button>
          );
        }

        return (
          <button
            key={tag.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onTagToggle(tag.id)}
            style={style}
            className={`min-h-11 cursor-pointer border-[1.5px] px-4 py-2.5 text-sm font-semibold transition-colors active:scale-95 ${
              isSelected ? tag.activeClass : 'border-ink bg-transparent text-ink hover:bg-paper-light'
            }`}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
};
