import Card from '@/widgets/Card';
import styles from './FavouritesContent.module.css';
import type { FavouritesContentProps } from './libs/types';

export function FavouritesContent({ users }: FavouritesContentProps) {
  if (!users) {
    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Избранное</h1>
      </section>
    );
  }

  const favouriteUsers = users?.filter((user) => user.liked && user.liked > 0);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Избранное</h1>

      {favouriteUsers.length === 0 ? (
        <p className={styles.empty}>Нет избранных пользователей</p>
      ) : (
        <div className={styles.container}>
          {favouriteUsers.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
}
