import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
// Add more slices here as features grow:
// import documentsReducer from './slices/documentsSlice';
// import packagesReducer from './slices/packagesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
      // documents: documentsReducer,
      // packages: packagesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
