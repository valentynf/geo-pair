import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

function fisherYatesShuffle(arr: string[]) {
  return arr.reduce(
    (res, _, i) => {
      const randIndex = Math.floor(Math.random() * (i + 1));
      [res[i], res[randIndex]] = [res[randIndex], res[i]];
      return res;
    },
    [...arr]
  );
}

function GeoPairGame({ data }: GamePropsType) {
  const [countries, capitals] = Object.entries(data);

  return (
    <div id="game">
      {fisherYatesShuffle([...countries, ...capitals]).map((name, index) => (
        <GeoButton key={index} name={name} />
      ))}
    </div>
  );
}

export default GeoPairGame;
