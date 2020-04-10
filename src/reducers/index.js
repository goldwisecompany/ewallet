import {combineReducers} from 'redux';
import {persistReducer, createMigrate} from 'redux-persist';

import createSensitiveStorage from 'redux-persist-sensitive-storage';
import walletReducer from './wallet';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'ewalletKeychain',
  sharedPreferencesName: 'ewalletSharedPrefs',
});

const migrations = {};

const sensitivePersistConfig = {
  key: 'wallet',
  storage: sensitiveStorage,
  version: 0, // New version 0, default or previous version -1
  migrate: createMigrate(migrations, {debug: false}),
};

export const rootReducers = combineReducers({
  wallet: persistReducer(sensitivePersistConfig, walletReducer),
});

export default rootReducers;
