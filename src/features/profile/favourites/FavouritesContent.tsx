import { useSelector, type RootState } from '@/store/store';
import Card from '@/widgets/Card';
import styles from './FavouritesContent.module.css';

export function FavouritesContent() {
  const users = useSelector((state: RootState) => state.users.users);

  const favouriteUsers = users?.filter((user) => user.liked && user.liked > 0) || [];

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Избранное</h1>

      {favouriteUsers.length === 0 ? (
        <p className={styles.empty}>Нет избранных навыков</p>
      ) : (
        <div className={styles.container}>
          {favouriteUsers.map((user) => (
            <Card key={user.id} user={user} onDetailsClick={() => {}} />
          ))}
        </div>
      )}
    </section>
  );
}
