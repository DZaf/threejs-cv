# 🌌 Three.js Interactive CV

This project is a 3D, interactive curriculum vitae built using **Three.js**. It presents your skills, experience, education, certifications, and contact information as orbiting planets around a central sun in a space-themed environment.

---

## 🚀 Features

- 🪐 **Planet-based Navigation**: Each section of your CV (Skills, Education, Experience, etc.) is represented as a textured sphere (planet) that rotates around the central sun.
- 🛰 **3D Labels & Interaction**: Floating labels identify each planet. Clicking a planet reveals more information via a 3D-styled panel.
- 🖱 **Orbit Controls**: Navigate the scene using your mouse, thanks to `OrbitControls`.
- 🌌 **Immersive Space Theme**: Background and planetary textures create an engaging visual experience.
- 📜 **Font + Geometry**: Labels are generated dynamically using `TextGeometry` and a loaded font from Three.js examples.

---

## 🛠 Technologies Used

- [Three.js](https://threejs.org/) for 3D graphics
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) for scene navigation
- [TextGeometry](https://threejs.org/docs/#examples/en/geometries/TextGeometry) for dynamic label generation
- [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)
- [Jest](https://jestjs.io/) for testing (with mocking of Three.js and DOM features)

---

## 📁 Folder Structure (Simplified)

```
├── src/
│   ├── main.js                # Entry point for the 3D scene
│   └── createScene.js         # Modularized scene creation (used in testing)
├── __tests__/
│   └── createScene.test.js    # Unit test for createScene()
├── public/
│   └── textures/              # Planet and space textures
├── style.css                  # Basic canvas and layout styling
├── package.json               # Project metadata and dependencies
└── README.md                  # You're here
```

---

## 🧪 Testing

Tests are written using Jest.

### ✅ What We Test

- Scene, camera, and renderer creation

---

## 🧠 Motivation

This project was created as a creative portfolio CV and as a showcase for spatial web development skills.

---

## 📸 Screenshots

![screenshot of 3D planets](docs/page_screenshot.JPG)

---

## 🧰 Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start the project

```bash
npm run start
```

### 3. Run tests

```bash
npm test
```

---

## ✍️ Author

**Dimitrios Zafeiropoulos**  
[LinkedIn](https://linkedin.com/in/dimitris-zafeiropoulos) • dzaf96@gmail.com
