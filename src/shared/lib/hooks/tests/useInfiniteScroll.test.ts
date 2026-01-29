import { act, renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

const scrollEvent = () => window.dispatchEvent(new Event('scroll'));

describe('useInfiniteScroll', () => {
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
  const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight');
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    document.body,
    'offsetHeight'
  );

  function setWindowDimensions(innerHeight: number, scrollY: number, offsetHeight: number) {
    Object.defineProperty(window, 'innerHeight', { value: innerHeight, writable: true });
    Object.defineProperty(window, 'scrollY', { value: scrollY, writable: true });
    Object.defineProperty(document.body, 'offsetHeight', {
      value: offsetHeight,
      writable: true,
    });
  }

  afterEach(() => {
    if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY);
    if (originalInnerHeight) Object.defineProperty(window, 'innerHeight', originalInnerHeight);
    if (originalOffsetHeight)
      Object.defineProperty(document.body, 'offsetHeight', originalOffsetHeight);
  });

  it('вызывает onLoadMore при достижении низа страницы', () => {
    setWindowDimensions(500, 400, 1000); // 500+400 >= 1000-100
    const onLoadMore = jest.fn();
    renderHook(() => useInfiniteScroll(onLoadMore));
    act(() => scrollEvent());
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onLoadMore при неполном скролле', () => {
    setWindowDimensions(500, 300, 1000); // 500+300 < 900
    const onLoadMore = jest.fn();
    renderHook(() => useInfiniteScroll(onLoadMore));
    act(() => scrollEvent());
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('учитывает порог в 100px: вызов при offsetHeight - 100, отсутствие при offsetHeight - 101', () => {
    const onLoadMore = jest.fn();
    setWindowDimensions(500, 399, 1000); // 899 < 900
    const { rerender } = renderHook((cb: () => void) => useInfiniteScroll(cb), {
      initialProps: onLoadMore,
    });
    act(() => scrollEvent());
    expect(onLoadMore).not.toHaveBeenCalled();

    onLoadMore.mockClear();
    setWindowDimensions(500, 400, 1000); // 900 >= 900
    rerender(onLoadMore);
    act(() => scrollEvent());
    expect(onLoadMore).toHaveBeenCalled();
  });

  it('добавляет и удаляет scroll event listener', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const onLoadMore = jest.fn();
    const { unmount } = renderHook(() => useInfiniteScroll(onLoadMore));

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('при размонтировании не вызывает onLoadMore по scroll', () => {
    setWindowDimensions(500, 400, 1000);
    const onLoadMore = jest.fn();
    const { unmount } = renderHook(() => useInfiniteScroll(onLoadMore));
    act(() => scrollEvent());
    expect(onLoadMore).toHaveBeenCalledTimes(1);
    unmount();
    onLoadMore.mockClear();
    act(() => scrollEvent());
    expect(onLoadMore).not.toHaveBeenCalled();
  });
});