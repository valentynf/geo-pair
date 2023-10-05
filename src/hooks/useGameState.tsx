import { useReducer } from 'react';
import { shuffleArray } from '../utlis/arrayUtils';
import {
  GeoButtonDataType,
  GameStateReducerActionType,
} from '../types/appTypes';
import { GAME_DATA } from '../../config';

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
      return state.map((el) => ({
        ...el,
        isActive: false,
        isWrongPair: false,
      }));
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
          ? { ...el, isActive: false, isWrongPair: true }
          : el
      );
    }
    case 'set-proper-pair': {
      const [{ geoName: geoName1 }, { geoName: geoName2 }] = action.payload;
      return state.map((el) =>
        el.geoName === geoName1 || el.geoName === geoName2
          ? { ...el, isActive: false, isProperPair: true }
          : el
      );
    }
    case 'reset-game':
      return shuffleArray(
        Object.entries(GAME_DATA)
          .flat()
          .map(
            (name) =>
              ({
                geoName: name,
                isActive: false,
                isWrongPair: false,
                isProperPair: false,
              } as GeoButtonDataType)
          )
      );
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
        .map((name) => ({
          geoName: name,
          isActive: false,
          isWrongPair: false,
          isProperPair: false,
        }))
    )
  );

  return [gameData, dispatch] as const;
}

export default useGameState;
