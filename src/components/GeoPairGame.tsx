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
    if (clickedButtonsRef.current.length === 0)
      setGameData((prevData) =>
        prevData.map((el) => ({ ...el, isActive: false, isError: false }))
      );

    if (clickedButtonsRef.current.length < 2) {
      clickedButtonsRef.current = [...clickedButtonsRef.current, buttonData];
      setGameData((prevData) =>
        prevData.map((el) =>
          el.geoName === buttonData.geoName ? { ...el, isActive: true } : el
        )
      );
    }

    if (clickedButtonsRef.current.length === 2) {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] =
        clickedButtonsRef.current;

      if (data[geoName1] === geoName2 || data[geoName2] === geoName1) {
        setGameData(() =>
          gameData.filter(
            (el) => el.geoName !== geoName1 && el.geoName !== geoName2
          )
        );
      } else {
        setGameData((prevData) =>
          prevData.map((el) =>
            el.geoName === geoName1 || el.geoName === geoName2
              ? { ...el, isActive: false, isError: true }
              : el
          )
        );
      }
      clickedButtonsRef.current = [];
    }
  }

  return (
    <div id="game">
      {gameData.map((buttonData, index) => (
        <GeoButton
          key={`${index}-${buttonData.geoName}`}
          data={buttonData}
          onClick={() => handleButtonClick(buttonData)}
        />
      ))}
    </div>
  );
}

export default GeoPairGame;
