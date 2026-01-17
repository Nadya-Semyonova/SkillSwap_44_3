import styles from './Overlay.module.css';

interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Overlay = ({ isOpen, onClick, children }: OverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default Overlay;
