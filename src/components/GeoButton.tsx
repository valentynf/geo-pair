type GeoButtonPropTypes = {
  name: string;
};

function GeoButton({ name }: GeoButtonPropTypes) {
  return <button>{name}</button>;
}

export default GeoButton;
