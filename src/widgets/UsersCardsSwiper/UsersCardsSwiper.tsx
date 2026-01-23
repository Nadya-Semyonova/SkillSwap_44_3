import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Card from '@widgets/Card';
import ChevronUp from '@/shared/assets/images/IconsSvg/ChevronUp';

import type { IUsersCardsSwiper } from './types/types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './UsersCardsSwiper.module.css';

export default function UsersCardsSwiper({ title, users }: IUsersCardsSwiper) {
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
      <h2 className={styles.title}>{title}</h2>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        slidesPerGroup={1}
        modules={[Navigation]}
        navigation={{
          prevEl: '.custom-button-prev',
          nextEl: '.custom-button-next',
        }}
        onReachBeginning={onBegging}
        onReachEnd={onEnd}
      >
        {users.map((user) => (
          <SwiperSlide key={user.id}>
            <Card user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`custom-button-prev ${styles.customButtonPrev} ${begButton ? styles.buttonDeactive : ''}`}
        onClick={handleClickPrev}
        type="button"
        tabIndex={0}
        aria-label="Предыдущий слайд"
      >
        <ChevronUp />
      </button>
      <button
        className={`custom-button-next ${styles.customButtonNext} ${endButton ? styles.buttonDeactive : ''}`}
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
