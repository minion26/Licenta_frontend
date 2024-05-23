import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
// import ViewCourseTeacher from "./View-Course-Teacher/View-Course-Teacher.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
