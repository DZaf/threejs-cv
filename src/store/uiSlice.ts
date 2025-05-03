import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  helpers: boolean;
  selectedPlanet: string | null;
  planetKeys: string[];
}

const initialState: UIState = {
  helpers: false,
  selectedPlanet: null,
  planetKeys: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleHelpers: (state) => {
      state.helpers = !state.helpers;
    },
    setHelpers: (state, action: PayloadAction<boolean>) => {
      state.helpers = action.payload;
    },
    setSelectedPlanet: (state, action: PayloadAction<string | null>) => {
      state.selectedPlanet = action.payload;
    },
    setPlanetKeys: (state, action: PayloadAction<string[]>) => {
      state.planetKeys = action.payload;
    },
  },
});

export const {
  toggleHelpers,
  setHelpers,
  setSelectedPlanet,
  setPlanetKeys,
} = uiSlice.actions;

export default uiSlice.reducer;
