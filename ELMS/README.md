# ELMS - React Vite App 🚀

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-green)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ELMS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view in browser.

4. Build for production:
   ```bash
   npm run build
   ```

## 🛠 Frontend Dependencies

### Core
- **React** ^19.2.4
- **React Router DOM** ^7.14.0 (already included)

### Styling (Bootstrap)
Bootstrap is not installed by default. Install it:
```bash
npm install bootstrap
```
Then import in `src/main.jsx` or `src/App.jsx`:
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Router Setup
React Router DOM is already included. Basic setup in `src/App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Wrap app with <BrowserRouter>
```

## 📁 Project Structure
```
ELMS/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── auth/ (login, register)
│   │   ├── home.jsx
│   │   └── landingPage.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Lint code |
| `npm run preview` | Preview production build |

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled.

## License
MIT
