import { Container } from '@/shared/ui/container';

export default function Page3() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Страница 3</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Это третья страница нашего приложения.
        </p>
      </div>
    </Container>
  );
}

