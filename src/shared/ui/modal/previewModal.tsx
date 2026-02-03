import { SwiperSlide } from 'swiper/react';
import ButtonDefault from '@shared/ui/ButtonDefault';
import CardPhoto from '@/widgets/CardPhoto';
import { CarouselSlider } from '@/shared/ui/CarouselSlider';
import styles from './style/ModalChildrenStyle.module.css';
import ButtonAllSkills from '../AllButtons/ButtonAllSkills';
import Edit from '@/shared/assets/images/IconsSvg/Edit';

interface PreviewModalProps {
  userData: {
    avatar: string;
    name: string;
    city: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    about: string;
    card_people: {
      skill: string;
      category: string;
      subcategory: string;
      description: string;
      photos?: string[];
    };
    skill_off: string[];
  };
  onEdit: () => void;
  onSave: () => void;
}

function PreviewModal({ userData, onEdit, onSave }: PreviewModalProps) {
  const userForCard = {
    id: Date.now(),
    liked: 0,
    age: 0,
    createdAt: new Date().toISOString(),
    avatar: userData.avatar,
    name: userData.name,
    city: userData.city,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    email: userData.email,
    password: '',
    about: userData.about,
    card_people: {
      ...userData.card_people,
      photos: userData.card_people.photos ?? [],
    },
    skill_off: userData.skill_off,
  };

  const customButtons = (
    <div className={styles.customButtonsContainer}>
      <ButtonAllSkills
        onClick={onEdit}
        className={styles.editButton}
        text="Редактировать"
        icon={<Edit />}
      />
      <ButtonDefault name="Готово" handleClick={onSave} styleButton={styles.saveButton} />
    </div>
  );

  return (
    <div className={styles.previewModal}>
      <h3 className={styles.previewSubtitle}>Ваше предложение</h3>
      <p className={styles.previewSubtitleText}>
        Пожалуйста, проверьте и подтвердите правильность данных
      </p>

      <div className={styles.cardWrapper}>
        <CardPhoto
          user={userForCard}
          showTitle={false}
          showActions={false}
          onShare={() => {}}
          onMoreDetails={() => {}}
          buttons={customButtons}
        >
          {userForCard.card_people.photos && userForCard.card_people.photos.length > 0 ? (
            <CarouselSlider
              spaceBetween={0}
              slidesPerView={1}
              bgButtons="transparent"
              sliderId="preview-photos"
            >
              <>
                {userForCard.card_people.photos.map((photo, index) => (
                  <SwiperSlide key={photo}>
                    <img
                      src={photo}
                      alt={`${userForCard.card_people.skill} - фото ${index + 1}`}
                      className={styles.previewPhoto}
                    />
                  </SwiperSlide>
                ))}
              </>
            </CarouselSlider>
          ) : (
            <div className={styles.photoPlaceholder}>
              <p>Фото навыка</p>
            </div>
          )}
        </CardPhoto>
      </div>
    </div>
  );
}

export default PreviewModal;
