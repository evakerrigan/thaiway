import { Container } from '@/shared/ui/container';
import { YandexMap } from '@/widgets/yandex-map';

export default function Home() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Страница 1</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Добро пожаловать на главную страницу! Ниже вы можете увидеть карту Таиланда.
        </p>
        <div className="mt-8">
          <YandexMap width={1000} height={1000} />
        </div>
      </div>
    </Container>
  );
}
