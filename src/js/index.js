// import react into the bundle
import React from 'react';
import { createRoot } from 'react-dom/client';

// include your index.scss file into the bundle
import "../styles/index.css";

// import your own components
import Layout from './layout.js';

// ensure the correct root element is selected
const rootElement = document.querySelector("#app");

if (rootElement) {
  const root = createRoot(rootElement);

  // render your react application
  root.render(<Layout />);
} else {
  console.error('Root element not found');
}
