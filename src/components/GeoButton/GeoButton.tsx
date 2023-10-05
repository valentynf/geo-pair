import { GeoButtonPropTypes } from '../../types/appTypes';
import styles from './GeoButton.module.css';

function GeoButton({
  data: { geoName, isActive, isWrongPair, isProperPair },
  onClick,
}: GeoButtonPropTypes) {
  const buttonClasses = [
    styles.button,
    isActive && styles.active,
    isWrongPair && styles.error,
    isProperPair && styles.valid,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} onClick={onClick} disabled={isActive}>
      {geoName}
    </button>
  );
}

export default GeoButton;
