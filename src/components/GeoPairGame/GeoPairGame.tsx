import { useRef, useState } from 'react';
import GeoButton from '../GeoButton/GeoButton';
import useGameState from '../../hooks/useGameState';
import { GamePropsType, GeoButtonDataType } from '../../types/appTypes';
import styles from './GeoPairGame.module.css';
import GameFinish from '../GameFinish/GameFinish';
import GameStart from '../GameStart/GameStart';

function GeoPairGame({ data }: GamePropsType) {
  const [gameData, dispatch] = useGameState(data);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const clickedButtonsRef = useRef<GeoButtonDataType[]>([]);

  function handleStartGameButtonClick() {
    setIsGameStarted(true);
  }

  function handleRestartGameButtonClick() {
    setIsGameStarted(false);
    dispatch({ type: 'reset-game', payload: [] });
  }

  function handleGeoButtonClick(buttonData: GeoButtonDataType) {
    clickedButtonsRef.current = [...clickedButtonsRef.current, buttonData];
    dispatch({ type: 'set-button-active', payload: [buttonData] });

    if (clickedButtonsRef.current.length === 2) {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] =
        clickedButtonsRef.current;

      if (data[geoName1] === geoName2 || data[geoName2] === geoName1) {
        dispatch({
          type: 'set-proper-pair',
          payload: clickedButtonsRef.current,
        });
        setTimeout(() => {
          // console.log('what am i removing', clickedButtonsRef.current);
          dispatch({ type: 'remove-pair', payload: clickedButtonsRef.current });
          clickedButtonsRef.current = [];
        }, 400);
      } else {
        dispatch({
          type: 'set-wrong-pair',
          payload: clickedButtonsRef.current,
        });
        setTimeout(
          () => dispatch({ type: 'reset-buttons-state', payload: [] }),
          400
        );
      }
      setTimeout(() => (clickedButtonsRef.current = []), 700);
    }
  }

  return (
    <div className={styles.game}>
      {isGameStarted ? (
        gameData.length > 0 ? (
          gameData.map((buttonData, index) => (
            <GeoButton
              key={`${index}-${buttonData.geoName}`}
              data={buttonData}
              onClick={() => handleGeoButtonClick(buttonData)}
            />
          ))
        ) : (
          <GameFinish onClick={handleRestartGameButtonClick} />
        )
      ) : (
        <GameStart onClick={handleStartGameButtonClick} />
      )}
    </div>
  );
}

export default GeoPairGame;
