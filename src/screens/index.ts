import {MediaType} from '../store/log/slice';

export type RootStackParamList = {
  [RootStackRoutes.Main]: undefined;
  [RootStackRoutes.Add]: undefined;
  [RootStackRoutes.Details]: {type: MediaType};
};

export enum RootStackRoutes {
  Home = 'HOME',
  Main = 'MAIN',
  Add = 'ADD',
  Details = 'DETAILS',
}

export type MainStackParamList = {
  [MainStackRoutes.Home]: undefined;
};

export enum MainStackRoutes {
  Home = 'HOME',
}
