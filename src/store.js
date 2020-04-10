import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer, createMigrate} from 'redux-persist';
import logger from 'redux-logger';
import rootReducers from './reducers/index';

const initialState = {};
const migrations = {};

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  version: 0, // New version 0, default or previous version -1
  migrate: createMigrate(migrations, {debug: false}),
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const configureStore = () => {
  const store = __DEV__
    ? createStore(persistedReducer, initialState, applyMiddleware(logger))
    : createStore(persistedReducer, initialState);

  const persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;
