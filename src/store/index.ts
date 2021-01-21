import AsyncStorage from '@react-native-community/async-storage';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {useDispatch as useDispatchHook} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';

import {reducer as logReducer} from './log/slice';

const rootReducer = combineReducers({
  log: logReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // We need to disable the serializable check whem using redux-persist
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type GetState = () => AppState;

export const useDispatch = () => useDispatchHook<Dispatch>();
