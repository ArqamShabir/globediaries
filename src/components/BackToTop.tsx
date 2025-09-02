import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full shadow-elevated transition-opacity duration-300 bg-primary text-primary-foreground h-12 w-12 hover:bg-primary-dark focus:outline-none ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export default BackToTop;

