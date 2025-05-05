import '@testing-library/jest-dom';
import uiReducer, {
    toggleHelpers,
    setHelpers,
    setSelectedPlanet,
    setPlanetKeys,
} from '../src/store/uiSlice';

describe('uiSlice reducer', () => {
    const initialState = {
        helpers: false,
        selectedPlanet: null,
        planetKeys: [],
    };

    it('should toggle helpers', () => {
        const nextState = uiReducer(initialState, toggleHelpers());
        expect(nextState.helpers).toBe(true);
    });

    it('should set helpers explicitly', () => {
        const nextState = uiReducer(initialState, setHelpers(true));
        expect(nextState.helpers).toBe(true);
    });

    it('should set selected planet', () => {
        const nextState = uiReducer(initialState, setSelectedPlanet('mars'));
        expect(nextState.selectedPlanet).toBe('mars');
    });

    it('should set planet keys', () => {
        const keys = ['mars', 'venus'];
        const nextState = uiReducer(initialState, setPlanetKeys(keys));
        expect(nextState.planetKeys).toEqual(keys);
    });
});
