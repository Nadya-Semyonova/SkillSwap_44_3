import Card from '@widgets/Card/Card';
import ButtonAllSkills from '@shared/ui/ButtonAllSkills';
import styles from './UsersCardsRecommendations.module.css';
import type { UsersCardsRecommendationsProps } from './types/types';

export default function UsersCardsRecommendations({
  title,
  users,
}: UsersCardsRecommendationsProps) {
  const handle = () => {};

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <ButtonAllSkills onClick={handle} className={styles.viewAllButton} text="Смотреть все" />
      </div>

      <div className={styles.cardsGrid}>
        {users.map((user) => (
          <Card key={user.id} user={user} onDetailsClick={handle} onLikeClick={handle} />
        ))}
      </div>
    </section>
  );
}
