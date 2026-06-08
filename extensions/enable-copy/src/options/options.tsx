import React from "react";
import ReactDOM from "react-dom/client";

import "./options.css";

const test = <img src="icon.png" />;

const root = document.createElement("div");

root.classList.add("root");
document.body.appendChild(root);

ReactDOM.createRoot(root).render(test);