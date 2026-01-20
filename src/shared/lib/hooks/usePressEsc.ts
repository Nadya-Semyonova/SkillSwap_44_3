import { useEffect } from 'react';

interface UsePressEscProps {
  handler: () => void;
  isEnabled?: boolean;
}

export function usePressEsc({ handler, isEnabled = true }: UsePressEscProps) {
  useEffect(() => {
    if (!isEnabled) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler, isEnabled]);
}
