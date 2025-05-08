import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import './style.css'

// Grab the root DOM element where the React app will mount
const rootElement = document.getElementById('root')!

// Create a React DOM root and render the App component inside StrictMode
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* The top-level application component */}
    <App />
  </React.StrictMode>
)
