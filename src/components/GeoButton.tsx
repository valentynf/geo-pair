import { useState } from 'react';

type GeoButtonPropTypes = {
  name: string;
  onClick: (buttonKey: string) => void;
};

function GeoButton({ name, onClick }: GeoButtonPropTypes) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      style={{ backgroundColor: isClicked ? '#4009Bf' : '' }}
      value={name}
      onClick={() => {
        onClick(name);
        setIsClicked(true);
      }}
      disabled={isClicked}
    >
      {name}
    </button>
  );
}

export default GeoButton;
