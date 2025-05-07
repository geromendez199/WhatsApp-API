import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Asistente WhatsApp</h1>
    <div class="card">
      <button id="pingButton">Probar conexión con backend</button>
      <p id="responseText"></p>
    </div>
  </div>
`;

document.querySelector("#pingButton").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/api/ping");
    const text = await res.text();
    document.querySelector("#responseText").textContent = `Respuesta: ${text}`;
  } catch (error) {
    document.querySelector("#responseText").textContent =
      "Error al conectar con el backend";
    console.error(error);
  }
});
