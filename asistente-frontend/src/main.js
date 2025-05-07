import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <br /><br />
      <button id="pingButton" type="button">Probar conexión con backend</button>
      <p id="respuesta"></p>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

// 🔗 Agregamos el evento para probar conexión con backend
document.getElementById("pingButton").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/api/ping");
    const data = await res.text();
    document.getElementById("respuesta").textContent =
      "Respuesta del backend: " + data;
  } catch (error) {
    document.getElementById("respuesta").textContent =
      "Error al conectar con el backend 😢";
    console.error(error);
  }
});

// filepath: c:\Users\gerom\Documents\WhatsApp-API\backend\app.js
app.get("/api/ping", (req, res) => {
  res.send("pong");
});
