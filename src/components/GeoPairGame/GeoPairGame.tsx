import { useRef } from 'react';
import GeoButton from '../GeoButton/GeoButton';
import useGameState from '../../hooks/useGameState';
import { GamePropsType, GeoButtonDataType } from '../../types/appTypes';
import styles from './GeoPairGame.module.css';

function GeoPairGame({ data }: GamePropsType) {
  const [gameData, dispatch] = useGameState(data);
  const clickedButtonsRef = useRef<GeoButtonDataType[]>([]);

  function handleButtonClick(buttonData: GeoButtonDataType) {
    if (clickedButtonsRef.current.length === 0)
      dispatch({ type: 'reset-buttons-state', payload: [] });

    if (clickedButtonsRef.current.length < 2) {
      clickedButtonsRef.current = [...clickedButtonsRef.current, buttonData];
      dispatch({ type: 'set-button-active', payload: [buttonData] });
    }

    if (clickedButtonsRef.current.length === 2) {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] =
        clickedButtonsRef.current;

      if (data[geoName1] === geoName2 || data[geoName2] === geoName1) {
        dispatch({ type: 'remove-pair', payload: clickedButtonsRef.current });
      } else {
        dispatch({
          type: 'set-wrong-pair',
          payload: clickedButtonsRef.current,
        });
      }
      clickedButtonsRef.current = [];
    }
  }

  return (
    <div className={styles.game}>
      {gameData.length > 0 ? (
        gameData.map((buttonData, index) => (
          <GeoButton
            key={`${index}-${buttonData.geoName}`}
            data={buttonData}
            onClick={() => handleButtonClick(buttonData)}
          />
        ))
      ) : (
        <p>Congratulations</p>
      )}
    </div>
  );
}

export default GeoPairGame;
