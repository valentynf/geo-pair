export type GamePropsType = {
  data: { [country: string]: string };
};
export type GameStateReducerActionType = {
  type: string;
  payload: GeoButtonDataType[];
};

export type GeoButtonDataType = {
  geoName: string;
  isActive: boolean;
  isError: boolean;
};

export type GeoButtonPropTypes = {
  data: GeoButtonDataType;
  onClick: () => void;
};
