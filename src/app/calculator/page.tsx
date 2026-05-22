import { Container } from '@/shared/ui/container';
import { Calculator } from '@/widgets/calculator';

export default function CalculatorPage() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Калькулятор поездки</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Рассчитайте примерную стоимость вашего путешествия в Таиланд из Москвы
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <Calculator />
        </div>
      </div>
    </Container>
  );
}
