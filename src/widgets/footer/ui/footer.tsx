import { Container } from '@/shared/ui/container';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <Container>
        <div className="flex items-center justify-center h-16">
          <p className="text-base">Это футер</p>
        </div>
      </Container>
    </footer>
  );
};

