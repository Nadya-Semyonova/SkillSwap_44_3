import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import Card from '@/widgets/Card';
import CardPhoto from '@/widgets/CardPhoto';
import { CarouselSlider } from '@/shared/ui/CarouselSlider';
import ButtonDefault from '@/shared/ui/ButtonDefault';
import { similarUsers } from './mockData';
import styles from './SelectedUserPage.module.css';
import { useSelector } from '@/store/store';
import Clock from '@/shared/assets/images/IconsSvg/Clock';
import { Modal, NoticeModal } from '@/shared/ui/modal';

export default function SelectedUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExchangeSent, setIsExchangeSent] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID пользователя из URL

  // Здесь должна быть логика получения данных выбранного пользователя
  // Пока используем заглушку или мок-данные
  const userSelected = similarUsers[0] || {}; // Временное решение

  // Обработчики
  const handleLikeClick = (userId?: number, isLiked?: boolean) => {
    console.log(`Like clicked for user ${userId}, liked: ${isLiked}`);
  };

  const handleShareClick = (userId?: number) => {
    console.log(`Share clicked for user ${userId}`);
  };

  const handleMoreDetails = (userId?: number) => {
    console.log(`More details clicked for user ${userId}`);
  };

  const handleExchangeClick = () => {
    console.log('Предложить обмен clicked');
    if (!currentUser) {
      navigate('/Login');
      return;
    }
    if (isExchangeSent) return; // предотвращаем повторное открытие
    setIsExchangeSent(true); // сразу меняем кнопку
    setIsModalOpen(true); // открываем модалку
  };

  const handleModalConfirm = () => {
    console.log('Модалка подтверждена');
    setIsModalOpen(false);
  };

  // ==== КАРТОЧКА ПОЛЬЗОВАТЕЛЯ ====
  const userCard = (
    <div className={styles.userCard}>
      {/* Заглушка для карточки пользователя */}
      <h2>{userSelected.name || 'Пользователь'}</h2>
      <p>{userSelected.card_people?.skill || 'Навык не указан'}</p>
    </div>
  );

  // ==== ФОТОГРАФИИ ДЛЯ CardPhoto ====
  // 1. Слайдер (первая фотография)
  const photoSlider =
    userSelected.card_people?.photos && userSelected.card_people.photos.length > 0 ? (
      <CarouselSlider
        spaceBetween={0}
        slidesPerView={1}
        bgButtons="transparent"
        sliderId="photos"
      >
        <div>
          {userSelected.card_people.photos.map((photo, index) => {
            const urlParts = photo.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const cleanFileName = fileName.split('.').shift() || `photo-${index}`;

            return (
              <SwiperSlide key={`slide-${userSelected.id}-${cleanFileName}`}>
                <img
                  src={photo}
                  alt={`${userSelected.card_people?.skill} - фото ${index + 1}`}
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
  const staticPhotos = userSelected.card_people?.photos?.slice(1, 4).map((photo, index) => {
    const urlParts = photo.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const cleanFileName = fileName.split('.').shift() || `static-${index}`;

    return (
      <img
        key={`static-${userSelected.id}-${cleanFileName}`}
        src={photo}
        alt={`${userSelected.card_people?.skill} - фото ${index + 2}`}
        className={styles.staticPhoto}
      />
    );
  });

  // ==== КАРТОЧКА НАВЫКА С ФОТО ====
  const skillCard = (
    <CardPhoto
      user={userSelected}
      title={userSelected.card_people?.skill || 'Навык'}
      showTitle={false}
      onLike={handleLikeClick}
      onShare={handleShareClick}
      onMoreDetails={handleMoreDetails}
      buttons={
        <div className={styles.fullWidthButtonWrapper}>
          <ButtonDefault
            handleClick={handleExchangeClick}
            styleButton={`${styles.exchangeButton} ${isExchangeSent ? styles.exchangeButtonActive : ''}`}
          >
            {isExchangeSent ? (
              <span className={styles.buttonContent}>
                <Clock /> Обмен предложен
              </span>
            ) : (
              'Предложить обмен'
            )}
          </ButtonDefault>
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
                // onDetailsClick={() => {}}
                // onLikeClick={() => {}}
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

      {/* Модалка */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <NoticeModal
              title="Вы предложили обмен"
              message="Теперь дождитесь подтверждения. Вам придет уведомление"
              onConfirm={handleModalConfirm}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}