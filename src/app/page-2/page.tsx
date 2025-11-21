import { Container } from '@/shared/ui/container';

export default function Page2() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Калькулятор</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Рассчитайте стоимость вашей поездки в Таиланд.
        </p>
      </div>
    </Container>
  );
}

