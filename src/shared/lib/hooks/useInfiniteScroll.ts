import { useEffect } from 'react';

/* бесконечный скролл на основе window.scroll */
export const useInfiniteScroll = (onLoadMore: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      // Когда пользователь доскроллил до низа страницы
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);
};
