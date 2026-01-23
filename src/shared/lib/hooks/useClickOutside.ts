import { useEffect, type RefObject } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: () => void;
  isEnabled?: boolean;
}

export function useClickOutside({ ref, handler, isEnabled = true }: UseClickOutsideProps) {
  useEffect(() => {
    if (!isEnabled) return undefined;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, handler, isEnabled]);
}
