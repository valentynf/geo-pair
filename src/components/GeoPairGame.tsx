import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

function GeoPairGame({ data }: GamePropsType) {
  const [countries, capitals] = Object.entries(data);

  console.log(countries, capitals);
  return (
    <div id="game">
      {[...countries, ...capitals].map((name) => (
        <GeoButton name={name} />
      ))}
    </div>
  );
}

export default GeoPairGame;
