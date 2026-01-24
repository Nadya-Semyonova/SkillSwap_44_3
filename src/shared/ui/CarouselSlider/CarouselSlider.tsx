import { useState } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import ChevronUp from '@/shared/assets/images/IconsSvg/ChevronUp';

import type { IUsersCardsSwiper } from './types/types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './CarouselSlider.module.css';

export default function CarouselSlider({
  children,
  bgButtons,
  spaceBetween,
  slidesPerView,
}: IUsersCardsSwiper) {
  const [begButton, setBegButton] = useState<boolean>(true);
  const [endButton, setEndButton] = useState<boolean>(false);

  const onEnd = () => {
    setEndButton(true);
  };
  const handleClickPrev = () => {
    setEndButton(false);
  };
  const onBegging = () => {
    setBegButton(true);
  };
  const handleClickNext = () => {
    setBegButton(false);
  };

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={spaceBetween || 0}
        slidesPerView={slidesPerView || 1}
        slidesPerGroup={1}
        modules={[Navigation]}
        navigation={{
          prevEl: '.custom-button-prev',
          nextEl: '.custom-button-next',
        }}
        onReachBeginning={onBegging}
        onReachEnd={onEnd}
      >
        {children}
      </Swiper>
      <button
        className={`custom-button-prev ${bgButtons} ${styles.customButtonPrev} ${begButton ? styles.buttonDeactive : ''}`}
        onClick={handleClickPrev}
        type="button"
        tabIndex={0}
        aria-label="Предыдущий слайд"
      >
        <ChevronUp />
      </button>
      <button
        className={`custom-button-next ${bgButtons} ${styles.customButtonNext} ${endButton ? styles.buttonDeactive : ''}`}
        onClick={handleClickNext}
        type="button"
        tabIndex={0}
        aria-label="Следующий слайд"
      >
        <ChevronUp />
      </button>
    </div>
  );
}
