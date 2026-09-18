import { Container } from '@/shared/ui/container';
import { Calculator } from '@/widgets/calculator';

export default function CalculatorPage() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold sm:text-5xl">Сколько стоит поездка</h1>
          <p className="mt-4 text-lg text-fg-2">
            Примерный бюджет путешествия в Таиланд из Москвы. Меняйте число людей и дней, сумма
            пересчитается сразу и покажет, из чего складывается.
          </p>
        </div>
        <Calculator />
      </div>
    </Container>
  );
}
