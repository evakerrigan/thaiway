import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { ROUTES } from '@/shared/config';

export const metadata: Metadata = {
  title: 'О проекте',
  description:
    'ThaiWay — личный путеводитель по Таиланду: карта с маршрутом на север, рейтинг любимых мест и калькулятор поездки.',
};

/**
 * Текст ниже — черновик от первого лица, собранный из описаний мест на сайте.
 * Поправьте под себя: кто вы, сколько раз были в Таиланде, почему собрали эту карту.
 */
export default function AboutPage() {
  return (
    <Container className="py-10 sm:py-14">
      <article className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold sm:text-5xl">О проекте</h1>
          <p className="text-lg text-fg-2">
            ThaiWay — не каталог достопримечательностей, а личная карта. Здесь только те места,
            где мне довелось побывать и куда я советую поехать друзьям.
          </p>
        </header>

        <div className="space-y-5 text-[17px] leading-relaxed text-fg-2">
          <p>
            Всё началось с поездки на север на машине: Бангкок, Аюттхая, Лопбури, Пхитсанулок,
            Чиангмай, Чианграй и обратно через Накхонсаван. Маршрут с остановками теперь лежит
            на <Link href={ROUTES.HOME} className="font-semibold text-accent underline-offset-4 hover:underline">карте</Link>,
            чтобы им можно было пользоваться, а не пересказывать в переписке.
          </p>
          <p>
            <Link href={ROUTES.TOP_PLACES} className="font-semibold text-accent underline-offset-4 hover:underline">Одиннадцать лучших мест</Link>{' '}
            — это рейтинг, а не список. На первом месте храм Wat Pha Sorn Kaew с миллионами кусочков
            мозаики, на последнем — смотровая Pasaan в точке, где две реки сливаются в Чао Прайя.
            Последнее место здесь не значит «худшее»: туда я вернусь ещё.
          </p>
          <p>
            <Link href={ROUTES.CALCULATOR} className="font-semibold text-accent underline-offset-4 hover:underline">Калькулятор</Link>{' '}
            считает по моим ориентирам: перелёт из Москвы, номер на двоих и расходы на месте. Это
            прикидка для планирования, а не смета.
          </p>
          <p>
            Фото и видео в подборке мои, кроме нескольких, которые я ещё заменю. Если нашли
            ошибку или хотите предложить место, напишите мне.
          </p>
        </div>
      </article>
    </Container>
  );
}
