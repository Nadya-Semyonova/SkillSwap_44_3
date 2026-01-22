import { useState } from 'react';
import Card from '@widgets/Card/Card';
import ButtonAllSkills from '@shared/ui/ButtonAllSkills';
import ChevronRight from '../../../public/img/IconsSvg/ChevronRight';
import styles from './UsersCardsRecommendations.module.css';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'; // скролл доработать
import type { UsersCardsRecommendationsProps } from './types/types';

export default function UsersCardsRecommendations({
  title,
  users,
  handleClickMore,
  buttonMore,
}: UsersCardsRecommendationsProps) {
  const handle = () => {};

  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    if (visibleCount < users.length) {
      setVisibleCount((prev) => prev + 3);
    }
  };

  useInfiniteScroll(loadMore);

  const visibleUsers = users.slice(0, visibleCount);

  if (buttonMore) {
    return (
      <>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <section className={styles.container}>
          <div className={styles.cardsGrid}>
            {visibleUsers.map((user) => (
              <Card key={user.id} user={user} onDetailsClick={handle} onLikeClick={handle} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <ButtonAllSkills
          onClick={() => handleClickMore(title)}
          className={styles.viewAllButton}
          text="Смотреть все"
          icon={<ChevronRight />}
        />
      </header>
      <section className={styles.container}>
        <div className={styles.cardsGrid}>
          {visibleUsers.map((user) => (
            <Card
              key={user.id}
              user={user}
              onDetailsClick={handle}
              onLikeClick={handle}
              variant="default"
            />
          ))}
        </div>
      </section>
    </>
  );
}
