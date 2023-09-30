import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

function GeoPairGame({ data }: GamePropsType) {
  const [countries, capitals] = Object.entries(data);

  return (
    <div id="game">
      {shuffleArray([...countries, ...capitals]).map((name, index) => (
        <GeoButton key={index} name={name} />
      ))}
    </div>
  );
}

export default GeoPairGame;
