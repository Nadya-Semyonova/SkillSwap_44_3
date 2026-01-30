import { act, renderHook } from '@testing-library/react';
import { useLikeCounter } from '../useLikeCounter';

describe('useLikeCounter', () => {
  it('should initialize with correct initial values', () => {
    const initialLikes = 5;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    expect(result.current.likeCount).toBe(5);
    expect(result.current.isLiked).toBe(false);
    expect(typeof result.current.handleLikeClick).toBe('function');
  });

  it('should add like when not liked', () => {
    const initialLikes = 3;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    expect(result.current.likeCount).toBe(3);
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleLikeClick();
    });

    expect(result.current.likeCount).toBe(4);
    expect(result.current.isLiked).toBe(true);
  });

  it('should remove like when already liked', () => {
    const initialLikes = 10;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    act(() => {
      result.current.handleLikeClick();
    });

    expect(result.current.likeCount).toBe(11);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });

    expect(result.current.likeCount).toBe(10);
    expect(result.current.isLiked).toBe(false);
  });

  it('should call onLikeClick callback when clicked', () => {
    const onLikeClick = jest.fn();
    const initialLikes = 2;
    const { result } = renderHook(() => useLikeCounter({ initialLikes, onLikeClick }));

    act(() => {
      result.current.handleLikeClick();
    });

    expect(onLikeClick).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handleLikeClick();
    });

    expect(onLikeClick).toHaveBeenCalledTimes(2);
  });

  it('should work without onLikeClick callback', () => {
    const initialLikes = 1;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    act(() => {
      result.current.handleLikeClick();
    });

    expect(result.current.likeCount).toBe(2);
    expect(result.current.isLiked).toBe(true);
  });

  it('should not go below 0 when unliking from 0 likes', () => {
    const initialLikes = 0;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    expect(result.current.likeCount).toBe(0);
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(1);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(0);
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(1);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(0);
    expect(result.current.isLiked).toBe(false);
  });

  it('should handle multiple toggles correctly', () => {
    const initialLikes = 7;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(8);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(7);
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(8);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(7);
    expect(result.current.isLiked).toBe(false);
  });

  it('should work with different initialLikes values', () => {
    const { result: result1 } = renderHook(() => useLikeCounter({ initialLikes: 0 }));
    expect(result1.current.likeCount).toBe(0);

    const { result: result2 } = renderHook(() => useLikeCounter({ initialLikes: 1 }));
    expect(result2.current.likeCount).toBe(1);

    const { result: result3 } = renderHook(() => useLikeCounter({ initialLikes: 1000 }));
    expect(result3.current.likeCount).toBe(1000);
  });

  it('should return object with correct types', () => {
    const initialLikes = 3;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    expect(typeof result.current.likeCount).toBe('number');
    expect(typeof result.current.isLiked).toBe('boolean');
    expect(typeof result.current.handleLikeClick).toBe('function');

    expect(result.current).toHaveProperty('likeCount');
    expect(result.current).toHaveProperty('isLiked');
    expect(result.current).toHaveProperty('handleLikeClick');
  });

  it('should handle rapid successive clicks', () => {
    const initialLikes = 5;
    const { result } = renderHook(() => useLikeCounter({ initialLikes }));

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(6);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(5);
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(6);
    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.handleLikeClick();
    });
    expect(result.current.likeCount).toBe(5);
    expect(result.current.isLiked).toBe(false);
  });
});
