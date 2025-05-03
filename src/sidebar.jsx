import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { toggleHelpers, setSelectedPlanet } from "./store/uiSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const helpers = useSelector((state) => state.ui.helpers);
    const planetNames = useSelector((state) => state.ui.planetKeys);

    const handleClick = (name) => {
        dispatch(setSelectedPlanet(name))
    };

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "220px",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: "20px",
                boxSizing: "border-box",
                color: "white",
                fontFamily: "sans-serif",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <h3 style={{ marginBottom: "10px" }}>UI Controls</h3>

            <button
                onClick={() => dispatch(toggleHelpers())}
                style={{ padding: "6px 12px", fontSize: "14px", cursor: "pointer" }}
            >
                Toggle Helpers ({helpers ? "On" : "Off"})
            </button>

            <hr style={{ borderColor: "#555", margin: "15px 0" }} />

            <h4>Planets</h4>
            {planetNames.length === 0 && <p style={{ fontSize: "12px" }}>Loading...</p>}
            {planetNames.map((name) => (
                <button
                    key={name}
                    onClick={() => handleClick(name)}
                    style={{
                        padding: "6px 10px",
                        fontSize: "13px",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        backgroundColor: "#222",
                        color: "white",
                        border: "1px solid #444",
                        marginBottom: "4px",
                    }}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}

const container = document.getElementById("sidebar");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );
} else {
    console.error("Sidebar container not found. Please add <div id='sidebar'></div> to index.html.");
}
