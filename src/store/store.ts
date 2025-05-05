import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';

/**
 * Configures and creates the Redux store.
 * Adds the 'ui' slice reducer for managing UI-related state.
 */
export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});

/**
 * Type representing the entire Redux state tree.
 * Useful for typing useSelector throughout the app.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the Redux dispatch function.
 * Useful for typing useDispatch throughout the app.
 */
export type AppDispatch = typeof store.dispatch;
