import { useRef, useState } from 'react';
import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

export type GeoButtonType = {
  geoName: string;
  isActive: boolean;
  isError: boolean;
};

const shuffleArray = (array: GeoButtonType[]) => {
  const shCopy = [...array];
  return shCopy.sort(() => Math.random() - 0.5);
};

function GeoPairGame({ data }: GamePropsType) {
  const [gameData, setGameData] = useState<GeoButtonType[]>(
    shuffleArray(
      Object.entries(data)
        .flat()
        .map((name) => ({ geoName: name, isActive: false, isError: false }))
    )
  );

  const clickedButtonsRef = useRef<GeoButtonType[]>([]);

  function handleButtonClick(buttonData: GeoButtonType) {
    if (clickedButtonsRef.current.length < 2)
      clickedButtonsRef.current = [...clickedButtonsRef.current, buttonData];

    if (clickedButtonsRef.current.length === 2) {
      const [btn1, btn2] = clickedButtonsRef.current;
      if (
        data[btn1.geoName] === btn2.geoName ||
        data[btn2.geoName] === btn1.geoName
      ) {
        setGameData(() =>
          gameData.filter(
            (el) => el.geoName !== btn1.geoName && el.geoName !== btn2.geoName
          )
        );
      }
      clickedButtonsRef.current = [];
    }
  }

  return (
    <div id="game">
      {gameData.map((btnData, index) => (
        <GeoButton
          key={`${index}-${btnData.geoName}`}
          data={btnData}
          onClick={() => handleButtonClick(btnData)}
        />
      ))}
    </div>
  );
}

export default GeoPairGame;
