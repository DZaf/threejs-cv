
# 🌌 Three.js Interactive CV

An interactive 3D curriculum vitae built with **Three.js**, **React**, and **Redux Toolkit**. This project uses a space-themed visualization where each orbiting planet represents a section of your resume.

---

## ✨ Features

- 🧭 **Interactive React Sidebar**  
  Use the sidebar to navigate different sections of your CV.

- 🪐 **Planet-Based CV Navigation**  
  Each planet symbolizes a resume section: Skills, Education, Experience, etc.

- 🎞️ **Smooth Animations**  
  Planets orbit and spin, with labels and panels dynamically facing the camera.

- 🧮 **Developer Helpers**  
  Toggle axis and grid helpers for debugging using the sidebar.

- 🗂️ **Dynamic Info Panels**  
  Panels appear near planets when clicked, complete with a close button.

---

## 🧰 Tech Stack

- 🧱 [Three.js](https://threejs.org/) – 3D engine for rendering the scene
- ⚛️ [React](https://reactjs.org/) – Used for sidebar UI components
- 🛠️ [Redux Toolkit](https://redux-toolkit.js.org/) – Centralized state management
- 🧾 [TypeScript](https://www.typescriptlang.org/) – Static typing and IntelliSense
- ⚡ [Vite](https://vitejs.dev/) – Fast development & build tool

---

## 📁 Project Structure

```
three/
├── public/                    # Textures, fonts, and static assets
├── src/
│   ├── scene/                 # Scene logic (sun, planets, labels, panels)
│   ├── interaction/           # Raycasting and panel interaction
│   ├── store/                 # Redux store and UI state
│   ├── sidebar.module.css     # Scoped sidebar styles
│   ├── sidebar.tsx           # Sidebar React component
│   ├── main.ts               # App entry point
│   └── types.d.ts            # Type definitions
├── index.html                # Main HTML layout
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project config and dependencies
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/DZaf/threejs-cv.git
cd three-cv

# Install dependencies
npm install
```

---

## 💻 Run the App

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Run Tests

Basic unit tests are located in the `__tests__/` folder.

```bash
npm run test
```

---

## 🔮 Roadmap

- 📱 Responsive design
- 🔧🖼️ Refactor info panels to use React components for richer UI and animation control

---

## 📸 Preview

![screenshot](./docs/page_screenshot.JPG)

---

## 🤝 Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

---

## 📜 License

MIT License © 2025  
Created by Dimitrios Zafeiropoulos
