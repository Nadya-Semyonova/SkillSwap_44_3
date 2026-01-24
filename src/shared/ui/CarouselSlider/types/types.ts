export interface IUsersCardsSwiper {
  children: React.ReactElement; // готовые слайды в формате указанном ниже
  bgButtons?: string; // bg для кнопок вперед назад
  spaceBetween?: number; // gap между слайдами
  slidesPerView?: number; // количество слайдов  в видимой зоне (для карточек 4 для фото 1)
}

// import { SwiperSlide } from "swiper/react";
//         <SwiperSlide>
//         Нужый компонент в 1 экземпляре
//         </SwiperSlide>
