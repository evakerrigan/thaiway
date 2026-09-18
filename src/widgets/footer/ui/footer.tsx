import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { Logo } from '@/shared/ui/logo';
import { FOOTER_ITEMS, SITE } from '@/shared/config';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-line bg-surface pb-20 md:pb-0">
      <Container className="py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <Logo size="sm" />
            <p className="text-sm text-fg-2">
              Личный путеводитель по Таиланду: карта, маршрут на север на машине и места, куда
              хочется вернуться.
            </p>
          </div>

          <nav aria-label="Разделы сайта">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-fg-2">
              {FOOTER_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-xs text-muted">
          {SITE.name} · Карта работает на Яндекс Картах, погода — OpenWeather. Цены в
          калькуляторе ориентировочные.
        </p>
      </Container>
    </footer>
  );
};
