import styles from './GameHeader.module.css';

function GameHeader() {
  return (
    <header>
      <div className={styles.leftPart}>
        <span className={styles.leftText}>Geo</span>
      </div>
      <div className={styles.rightPart}>
        <span className={styles.rightText}>Pair</span>
      </div>
    </header>
  );
}

export default GameHeader;
