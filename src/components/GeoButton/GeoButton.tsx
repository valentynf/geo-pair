import { GeoButtonPropTypes } from '../../types/appTypes';
import styles from './GeoButton.module.css';

function GeoButton({
  data: { geoName, isActive, isError },
  onClick,
}: GeoButtonPropTypes) {
  const buttonClasses = [
    styles.button,
    isActive && styles.active,
    isError && styles.error,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} onClick={onClick}>
      {geoName}
    </button>
  );
}

export default GeoButton;
