
import styles from './sidebar.module.css';
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { toggleHelpers, setSelectedPlanet } from "./store/uiSlice";
import type { RootState, AppDispatch } from "./store/store";

// Sidebar component providing UI controls for helper toggling and planet selection
export default function Sidebar() {
    const dispatch = useDispatch<AppDispatch>();

    // Access the current state of helper visibility from Redux
    const helpers = useSelector((state: RootState) => state.ui.helpers);

    // Access the list of available planet names from Redux
    const planetNames = useSelector((state: RootState) => state.ui.planetKeys);

    // Handle selecting a planet by dispatching an action with the planet name
    const handleClick = (name: string) => {
        dispatch(setSelectedPlanet(name));
    };

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.header}>UI Controls</h3>

            {/* Button to toggle the visibility of helpers in the scene */}
            <button
                className={styles.button}
                onClick={() => dispatch(toggleHelpers())}
            >
                Toggle Helpers ({helpers ? "On" : "Off"})
            </button>

            <hr className={styles.divider} />

            <h4>Planets</h4>

            {/* Show loading text if planet names haven't loaded yet */}
            {planetNames.length === 0 && (
                <p className={styles.loadingText}>Loading...</p>
            )}

            {/* Render a button for each planet, allowing selection */}
            {planetNames.map((name: string) => (
                <button
                    key={name}
                    onClick={() => handleClick(name)}
                    className={styles.planetButton}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}

// Locate the container element in the DOM and render the Sidebar inside it
const container = document.getElementById("sidebar");

if (container) {
    const root = ReactDOM.createRoot(container);

    // Wrap Sidebar in Redux Provider to connect it to the store
    root.render(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );
} else {
    // Log an error if the sidebar container is missing from the DOM
    console.error("Sidebar container not found. Please add <div id='sidebar'></div> to index.html.");
}
