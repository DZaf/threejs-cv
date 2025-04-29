// src/sidebar.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function Sidebar() {
    const sections = ['skills', 'education', 'experience', 'certifications', 'contact'];

    const handleClick = (section) => {
        // Dispatch a custom event with the section name
        const event = new CustomEvent('planet-click', { detail: section });
        window.dispatchEvent(event);
    };

    return (
        <div className="sidebar">
            {sections.map((section) => (
                <button key={section} onClick={() => handleClick(section)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
            ))}
        </div>
    );
}

// Mount to the div#ui in index.html
ReactDOM.createRoot(document.getElementById('ui')).render(<Sidebar />);
