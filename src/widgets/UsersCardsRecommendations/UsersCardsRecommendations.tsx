import { useState } from 'react';
import Card from '@widgets/Card/Card';
import ButtonAllSkills from '@/shared/ui/AllButtons/ButtonAllSkills';
import ChevronRight from '@/shared/assets/images/IconsSvg/ChevronRight';
import styles from './UsersCardsRecommendations.module.css';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'; // скролл доработать
import type { UsersCardsRecommendationsProps } from './libs/types';

export default function UsersCardsRecommendations({
  title,
  users,
  handleClickMore,
  buttonMore,
  sortButton,
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
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {sortButton && <div>{sortButton}</div>}
        </div>
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
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <ButtonAllSkills
          onClick={() => handleClickMore(title)}
          className={styles.viewAllButton}
          text="Смотреть все"
          icon={<ChevronRight />}
        />
      </div>
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
