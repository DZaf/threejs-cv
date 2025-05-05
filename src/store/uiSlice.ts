import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Defines the shape of the UI-related slice of the Redux state.
 */
interface UIState {
  helpers: boolean;             // Whether helper visuals (e.g., axes/grid) are enabled
  selectedPlanet: string | null; // Currently selected planet (by name), or null
  planetKeys: string[];         // List of all available planet names
}

/**
 * Initial state for the UI slice.
 */
const initialState: UIState = {
  helpers: false,
  selectedPlanet: null,
  planetKeys: [],
};

/**
 * Creates a Redux slice for UI state management.
 * Contains reducers for toggling helpers, selecting planets, and storing planet names.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Toggles the helpers (on/off)
     */
    toggleHelpers: (state) => {
      state.helpers = !state.helpers;
    },

    /**
     * Explicitly sets the helpers state
     */
    setHelpers: (state, action: PayloadAction<boolean>) => {
      state.helpers = action.payload;
    },

    /**
     * Sets the currently selected planet
     */
    setSelectedPlanet: (state, action: PayloadAction<string | null>) => {
      state.selectedPlanet = action.payload;
    },

    /**
     * Stores the list of available planet names
     */
    setPlanetKeys: (state, action: PayloadAction<string[]>) => {
      state.planetKeys = action.payload;
    },
  },
});

// Export actions for dispatching
export const {
  toggleHelpers,
  setHelpers,
  setSelectedPlanet,
  setPlanetKeys,
} = uiSlice.actions;

// Export reducer to be included in the Redux store
export default uiSlice.reducer;
