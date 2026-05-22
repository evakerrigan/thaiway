import { Container } from '@/shared/ui/container';

export default function TopPlacesPage() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">11 лучших мест</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Самые интересные места для посещения в Таиланде — подборка для путешествия на север.
          </p>
        </div>
      </div>
    </Container>
  );
}
