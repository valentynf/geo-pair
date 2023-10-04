import { useReducer, useRef } from 'react';
import GeoButton from './GeoButton';

type GamePropsType = {
  data: { [country: string]: string };
};

export type GeoButtonType = {
  geoName: string;
  isActive: boolean;
  isError: boolean;
};

type reducerActionType = {
  type: string;
  payload: GeoButtonType[];
};

function reducer(state: GeoButtonType[], action: reducerActionType) {
  switch (action.type) {
    case 'remove-pair': {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] = action.payload;
      return state.filter(
        (el) => el.geoName !== geoName1 && el.geoName !== geoName2
      );
    }
    case 'reset-buttons-state':
      return state.map((el) => ({ ...el, isActive: false, isError: false }));
    case 'set-button-active':
      return state.map((el) =>
        el.geoName === action.payload[0].geoName
          ? { ...el, isActive: true }
          : el
      );
    case 'set-wrong-pair': {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] = action.payload;
      return state.map((el) =>
        el.geoName === geoName1 || el.geoName === geoName2
          ? { ...el, isActive: false, isError: true }
          : el
      );
    }
    default:
      return state;
  }
}

const shuffleArray = (array: GeoButtonType[]) => {
  const shCopy = [...array];
  return shCopy.sort(() => Math.random() - 0.5);
};

function GeoPairGame({ data }: GamePropsType) {
  const [gameData, dispatch] = useReducer(
    reducer,
    shuffleArray(
      Object.entries(data)
        .flat()
        .map((name) => ({ geoName: name, isActive: false, isError: false }))
    )
  );

  const clickedButtonsRef = useRef<GeoButtonType[]>([]);

  function handleButtonClick(buttonData: GeoButtonType) {
    if (clickedButtonsRef.current.length === 0)
      dispatch({ type: 'reset-buttons-state', payload: [] });

    if (clickedButtonsRef.current.length < 2) {
      clickedButtonsRef.current = [...clickedButtonsRef.current, buttonData];
      dispatch({ type: 'set-button-active', payload: [buttonData] });
    }

    if (clickedButtonsRef.current.length === 2) {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] =
        clickedButtonsRef.current;

      if (data[geoName1] === geoName2 || data[geoName2] === geoName1) {
        dispatch({ type: 'remove-pair', payload: clickedButtonsRef.current });
      } else {
        dispatch({
          type: 'set-wrong-pair',
          payload: clickedButtonsRef.current,
        });
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
