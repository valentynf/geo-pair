import styles from './GameFinish.module.css';
import trophyImage from '../../images/trophy.png';

type GameFinishProps = {
  onClick: () => void;
};

function GameFinish({ onClick }: GameFinishProps) {
  return (
    <div className={styles.finish}>
      <h2 className={styles.congratulations}>Congratulations!</h2>
      <img className={styles.trophyImage} src={trophyImage} alt="trophy" />
      <button onClick={onClick} className={styles.restart}>
        Try again
      </button>
    </div>
  );
}

export default GameFinish;
