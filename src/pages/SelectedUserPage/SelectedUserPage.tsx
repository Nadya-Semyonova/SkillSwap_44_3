import { SwiperSlide } from 'swiper/react';
import Card from '@/widgets/Card';
import CardPhoto from '@/widgets/CardPhoto';
import { CarouselSlider } from '@/shared/ui/CarouselSlider';
import ButtonDefault from '@/shared/ui/ButtonDefault';
import { mockUser, similarUsers } from './mockData';
import styles from './SelectedUserPage.module.css';

export default function SelectedUserPage() {
  // Обработчики
  const handleLikeClick = (userId: number, isLiked: boolean) => {
    console.log(`Like clicked for user ${userId}, liked: ${isLiked}`);
  };

  const handleShareClick = (userId: number) => {
    console.log(`Share clicked for user ${userId}`);
  };

  const handleMoreDetails = (userId: number) => {
    console.log(`More details clicked for user ${userId}`);
  };

  const handleExchangeClick = () => {
    console.log('Предложить обмен clicked');
  };

  // ==== ДЕТАЛЬНАЯ КАРТОЧКА ПОЛЬЗОВАТЕЛЯ ====
  const userCard = <Card user={mockUser} variant="profile" />;

  // ==== ФОТОГРАФИИ ДЛЯ CardPhoto ====
  // 1. Слайдер (первая фотография)
  const photoSlider =
    mockUser.card_people?.photos && mockUser.card_people.photos.length > 0 ? (
      <CarouselSlider spaceBetween={0} slidesPerView={1} bgButtons="transparent" sliderId="photos">
        <div>
          {mockUser.card_people.photos.map((photo, index) => {
            const urlParts = photo.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const cleanFileName = fileName.split('.').shift() || `photo-${index}`;

            return (
              <SwiperSlide key={`slide-${mockUser.id}-${cleanFileName}`}>
                <img
                  src={photo}
                  alt={`${mockUser.card_people?.skill} - фото ${index + 1}`}
                  className={styles.photo}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </CarouselSlider>
    ) : (
      <div className={styles.photoPlaceholder}>Нет фотографий</div>
    );

  // 2. 3 статичные фотографии (начиная со второй)
  const staticPhotos = mockUser.card_people?.photos?.slice(1, 4).map((photo, index) => {
    const urlParts = photo.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const cleanFileName = fileName.split('.').shift() || `static-${index}`;

    return (
      <img
        key={`static-${mockUser.id}-${cleanFileName}`}
        src={photo}
        alt={`${mockUser.card_people?.skill} - фото ${index + 2}`}
        className={styles.staticPhoto}
      />
    );
  });

  // ==== КАРТОЧКА НАВЫКА С ФОТО ====
  const skillCard = (
    <CardPhoto
      user={mockUser}
      title={mockUser.card_people?.skill || 'Навык'}
      showTitle={false}
      onLike={handleLikeClick}
      onShare={handleShareClick}
      onMoreDetails={handleMoreDetails}
      buttons={
        <div className={styles.fullWidthButtonWrapper}>
          <ButtonDefault
            name="Предложить обмен"
            handleClick={handleExchangeClick}
            styleButton={styles.exchangeButton}
          />
        </div>
      }
    >
      {/* children: фотографии */}
      <div className={styles.photoSection}>
        <div className={styles.sliderContainer}>{photoSlider}</div>
        {staticPhotos && staticPhotos.length > 0 && (
          <div className={styles.staticPhotosContainer}>{staticPhotos}</div>
        )}
      </div>
    </CardPhoto>
  );

  // ==== ПОХОЖИЕ ПОЛЬЗОВАТЕЛИ ====
  // CarouselSlider + Card
  const similarUsersCarousel =
    similarUsers.length > 0 ? (
      <CarouselSlider
        spaceBetween={25}
        slidesPerView={4}
        bgButtons="transparent"
        sliderId="similar"
      >
        <div>
          {similarUsers.map((user) => (
            <SwiperSlide key={`user-${user.id}`}>
              <Card
                user={user}
                onDetailsClick={() => console.log('Details for', user.id)}
                onLikeClick={() => console.log('Like for', user.id)}
              />
            </SwiperSlide>
          ))}
        </div>
      </CarouselSlider>
    ) : (
      <p className={styles.noUsersText}>Нет похожих пользователей</p>
    );

  // ==== СБОРКА СТРАНИЦЫ ====
  return (
    <div className={styles.page}>
      {/* 1. Верхняя часть: две колонки */}
      <div className={styles.topSection}>
        {/* Карточка выбранного пользователя */}
        <section className={styles.profileSection}>{userCard}</section>

        {/* Карточка с навыком и фото */}
        <section className={styles.skillSection}>{skillCard}</section>
      </div>

      {/* 2. Подборка похожих пользователей */}
      <section className={styles.similarSection}>
        <h2 className={styles.sectionTitle}>Похожие предложения</h2>
        <div className={styles.similarCarouselWrapper}>{similarUsersCarousel}</div>
      </section>
    </div>
  );
}
