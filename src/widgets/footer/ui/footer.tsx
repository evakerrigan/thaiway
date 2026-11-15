import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { NAV_ITEMS } from '@/shared/config';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-ink text-[#E9DFCC]">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="m-0 font-display text-2xl font-bold italic">Тайский путь</p>
            <p className="mt-1.5 text-sm text-[#B9AD99]">Личный путеводитель по Таиланду</p>
          </div>
          <p className="m-0 font-hand text-[26px] text-tape">ไปเที่ยวกัน! — поехали!</p>
        </div>
        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-[#5E5448] pt-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-2 text-[#E9DFCC] hover:text-tape">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
};
