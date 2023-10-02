import { useState } from 'react';
import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

//since array.length =< 195 (countries) + 195 (capitals), no need for an optimized shuffle algo
const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

function GeoPairGame({ data }: GamePropsType) {
  const [countries, capitals] = Object.entries(data);
  const [clickedButtons, setClickedButtons] = useState<string[]>([]);

  function handleButtonClick(buttonName: string) {
    setClickedButtons([...clickedButtons, buttonName]);
  }

  return (
    <div id="game">
      {shuffleArray([...countries, ...capitals]).map((name, index) => (
        <GeoButton key={index} name={name} onClick={handleButtonClick} />
      ))}
    </div>
  );
}

export default GeoPairGame;
