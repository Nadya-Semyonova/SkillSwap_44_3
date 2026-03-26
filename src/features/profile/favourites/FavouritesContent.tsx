import Card from '@/widgets/Card';
import styles from './FavouritesContent.module.css';
import type { FavouritesContentProps } from './libs/types';

export function FavouritesContent({ users }: FavouritesContentProps) {
  if (users === null || !users) {
    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Избранное</h1>
      </section>
    );
  }

  const hasNoFavourites = users.length === 0;

  return (
    <section className={styles.wrapper}>
      {hasNoFavourites ? (
        <h1 className={styles.empty}>Нет избранных пользователей</h1>
      ) : (
        <>
          <h1 className={styles.title}>Избранное</h1>
          <div className={styles.container}>
            {users.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
