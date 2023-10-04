import { useReducer } from 'react';
import { shuffleArray } from '../utlis/arrayUtils';
import {
  GeoButtonDataType,
  GameStateReducerActionType,
} from '../types/appTypes';

function reducer(
  state: GeoButtonDataType[],
  action: GameStateReducerActionType
) {
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

function useGameState(data: object) {
  const [gameData, dispatch] = useReducer(
    reducer,
    shuffleArray(
      Object.entries(data)
        .flat()
        .map((name) => ({ geoName: name, isActive: false, isError: false }))
    )
  );

  return [gameData, dispatch] as const;
}

export default useGameState;
