import { useRef, useState } from 'react';
import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

//since array.length =< 195 (countries) + 195 (capitals), no need for an optimized shuffle algo
const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

function GeoPairGame({ data }: GamePropsType) {
  const [countries, capitals] = Object.entries(data);

  const [gameData, setGameData] = useState<string[]>(
    shuffleArray([...countries, ...capitals])
  );
  const clickedButtonsRef = useRef<string[]>([]);

  function handleButtonClick(buttonName: string) {
    if (clickedButtonsRef.current.length < 2)
      clickedButtonsRef.current = [...clickedButtonsRef.current, buttonName];
    if (clickedButtonsRef.current.length === 2) {
      const [name1, name2] = clickedButtonsRef.current;
      if (data[name1] === name2 || data[name2] === name1) {
        setGameData(() =>
          gameData.filter((el) => el !== name1 && el !== name2)
        );
      }
      clickedButtonsRef.current = [];
    }
  }

  return (
    <div id="game">
      {gameData.map((name, index) => (
        <GeoButton key={index} name={name} onClick={handleButtonClick} />
      ))}
    </div>
  );
}

export default GeoPairGame;
