import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// public/index.html에 있는 'root' ID를 가진 엘리먼트를 찾아 리액트 앱을 연결합니다.
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
