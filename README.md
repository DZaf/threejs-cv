# 🌌 Three.js Interactive CV

This is a 3D, interactive curriculum vitae built with **Three.js** and modular JavaScript. It creatively presents your background using a space-themed solar system, where each orbiting planet represents a section of your resume.

---

## 🚀 Features

- 🧭 **React Sidebar Navigation**  
  A React-powered sidebar allows users to click on resume sections to trigger the corresponding 3D planet and info panel.

- 🪐 **Planet-Based Navigation**  
  Planets represent resume sections: Skills, Education, Experience, Certifications, and Contact.

- 🎯 **Raycast Interactions**  
  Click planets to open smooth animated panels with detailed content.

- 💫 **Floating Labels**  
  Labels orbit with planets and always face the camera.

- 🎛️ **Animated Transitions**  
  Clicking a planet brings it (and its label) forward next to the panel.

- 🧲 **Camera Controls**  
  Rotate, pan, and zoom using `OrbitControls`.

- 🧪 **Unit Tests**  
  Built-in Jest tests verify 3D scene structure.

- 🧱 **Modular Codebase**  
  The project is fully split into clean, testable modules (planets, labels, panels, interaction, animation).
  
  ---

## 📝 TODO

- 🧩 **Redux Implementation**  
  Integrate Redux to manage application state, such as selected planet, active panel, and UI synchronization between React and the Three.js scene.

---

## 🛠 Technologies Used

- [Three.js](https://threejs.org/) – 3D engine  
- [Vite](https://vitejs.dev/) – Build tool  
- [Jest](https://jestjs.io/) – Testing  
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) – User navigation  
- [TextGeometry](https://threejs.org/docs/#examples/en/geometries/TextGeometry) – Dynamic 3D labels  
- [CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture) – Text panel rendering  

---

## 📁 Folder Structure

```
├── public/
│   └── textures/              # Background and planet textures
├── src/
│   ├── main.js                # App entry point
│   ├── animate.js             # Animation loop
│   ├── style.css              # Canvas + body styling
│   ├── interaction/
│   │   └── onClickHandler.js  # Raycasting + panel logic
│   └── scene/
│       ├── initScene.js       # Camera, renderer, controls
│       ├── addSun.js          # Sun mesh
│       ├── planets.js         # Creates planets + pivots
│       ├── labels.js          # Floating text labels
│       └── panels.js          # Text panel + close button
├── __tests__/
│   └── createScene.test.js    # Jest unit tests
├── index.html                 # Root HTML shell
├── package.json               # Dependencies & scripts
└── README.md                  # You're here
```

---

## 🧪 Testing

Run the unit tests using:

```bash
npm test
```

Includes basic Three.js component tests (`Scene`, `Camera`, `Renderer`) and mocking logic.

---

## ▶️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## 📸 Preview

![screenshot of 3D CV](docs/page_screenshot.JPG)

---

## 📬 Author

**Dimitrios Zafeiropoulos**  
[LinkedIn](https://linkedin.com/in/dimitris-zafeiropoulos) • dzaf96@gmail.com
