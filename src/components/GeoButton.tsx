import { GeoButtonType } from './GeoPairGame';

type GeoButtonPropTypes = {
  data: GeoButtonType;
  onClick: () => void;
};

function GeoButton({
  data: { geoName, isActive, isError },
  onClick,
}: GeoButtonPropTypes) {
  return (
    <button
      style={{ background: isActive ? 'blue' : isError ? 'red' : '' }}
      value={geoName}
      onClick={onClick}
    >
      {geoName}
    </button>
  );
}

export default GeoButton;
