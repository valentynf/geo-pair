import styles from './GameStart.module.css';

type GameStartProps = {
  onClick: () => void;
};

function GameStart({ onClick }: GameStartProps) {
  return (
    <div className={styles.start}>
      <h2 className={styles.welcome}>Welcome to GeoPair Game!</h2>
      <p className={styles.description}>
        Test your knowledge and pair countries with corresponding capitals!
      </p>
      <button onClick={onClick} className={styles.buttonStart}>
        Start Game
      </button>
    </div>
  );
}

export default GameStart;
