import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activePlanet: null,
    isPanelOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setActivePlanet: (state, action) => {
            state.activePlanet = action.payload;
        },
        togglePanel: (state) => {
            state.isPanelOpen = !state.isPanelOpen;
        },
    },
});

export const { setActivePlanet, togglePanel } = uiSlice.actions;
export default uiSlice.reducer;
