// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppProviderContext } from "./Features/Context/notesContextReduce.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AppProviderContext>
    <App />
  </AppProviderContext>
  // </React.StrictMode>,
);
