import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';

/**
 * Configures the Redux store with the UI slice reducer.
 */
export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
