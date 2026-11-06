// Clase base: Vehiculo
class Vehiculo {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidad_actual = 0;
  }
  // Parámetros opcionales simulan las formas acelerar(), acelerar(turbo)
  // y acelerar(turbo, terreno).
  acelerar(turbo = false, terreno = "normal") {
    let incremento = turbo ? 15 : 10;
    const factores = {normal: 1, montaña: 0.7, arena: 0.6, asfalto: 1.2};
    incremento *= factores[terreno] ?? 1;
    this.velocidad_actual += incremento;
    return `${this.marca} ${this.modelo} acelera +${incremento.toFixed(1)} km/h.`;
  }
  detener() {
    this.velocidad_actual = 0;
    return `${this.marca} ${this.modelo}: vehículo detenido.`;
  }
  obtener_informacion() {
    return `${this.constructor.name} | ${this.marca} ${this.modelo} | ${this.velocidad_actual.toFixed(1)} km/h`;
  }
}

// Clase hija 1: Auto eléctrico
class AutoElectrico extends Vehiculo {
  constructor(marca, modelo, energia = 100) {
    super(marca, modelo);
    this.energia = energia;
  }
  acelerar(turbo = false, terreno = "normal") {
    const factores = {normal: 1, montaña: 0.7, arena: 0.6, asfalto: 1.2};
    const incremento = (turbo ? 12 : 8) * (factores[terreno] ?? 1);
    this.velocidad_actual += incremento;
    this.energia = Math.max(0, this.energia - Math.max(1, incremento * 0.5));
    return `Auto eléctrico ${this.marca}: aceleración progresiva (+${incremento.toFixed(1)} km/h). Energía: ${this.energia.toFixed(1)}%.`;
  }
  detener() {
    this.velocidad_actual = 0;
    return `Auto eléctrico ${this.marca}: frenado regenerativo.`;
  }
}

// Clase hija 2: Moto
class Moto extends Vehiculo {
  acelerar(turbo = false, terreno = "normal") {
    const factores = {normal: 1, montaña: 0.7, arena: 0.5, asfalto: 1.2};
    const incremento = (turbo ? 20 : 15) * (factores[terreno] ?? 1);
    this.velocidad_actual += incremento;
    return `Moto ${this.marca}: aceleración rápida (+${incremento.toFixed(1)} km/h). Estabilidad reducida.`;
  }
  detener() {
    this.velocidad_actual = 0;
    return `Moto ${this.marca}: frenado rápido; mantener el equilibrio.`;
  }
}

// Clase hija 3: Camión
class Camion extends Vehiculo {
  acelerar(turbo = false, terreno = "normal") {
    const factores = {normal: 1, montaña: 0.6, arena: 0.5, asfalto: 1.1};
    const incremento = (turbo ? 7 : 5) * (factores[terreno] ?? 1);
    this.velocidad_actual += incremento;
    return `Camión ${this.marca}: aceleración lenta (+${incremento.toFixed(1)} km/h), debido a su mayor peso.`;
  }
  detener() {
    this.velocidad_actual = 0;
    return `Camión ${this.marca}: frenado gradual por su gran peso.`;
  }
}

const vehiculos = [
  new AutoElectrico("Tesla", "Model 3"),
  new Moto("Yamaha", "MT-07"),
  new Camion("Volvo", "FH")
];

const cards = document.getElementById("vehiculos");
const registro = document.getElementById("registro");
const temaBtn = document.getElementById("temaBtn");

function aplicarTema(tema) {
  const modoOscuro = tema === "oscuro";
  document.body.dataset.theme = modoOscuro ? "dark" : "light";
  temaBtn.setAttribute("aria-pressed", String(modoOscuro));
  temaBtn.textContent = modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
}

aplicarTema(localStorage.getItem("tema") === "oscuro" ? "oscuro" : "claro");
temaBtn.addEventListener("click", () => {
  const nuevoTema = document.body.dataset.theme === "dark" ? "claro" : "oscuro";
  aplicarTema(nuevoTema);
  localStorage.setItem("tema", nuevoTema);
});

function escribir(mensaje) {
  const p = document.createElement("p");
  p.textContent = "› " + mensaje;
  if (registro.querySelector(".muted")) registro.innerHTML = "";
  registro.appendChild(p);
  registro.scrollTop = registro.scrollHeight;
}

function actualizarTarjetas() {
  cards.innerHTML = "";
  vehiculos.forEach((v, i) => {
    const card = document.createElement("article");
    card.className = "vehicle-card";
    const energia = v instanceof AutoElectrico ? `<p class="energy">Energía: ${v.energia.toFixed(1)}%</p>` : `<p class="energy">${v instanceof Moto ? "Aceleración rápida · Menor estabilidad" : "Mayor peso · Aceleración lenta"}</p>`;
    card.innerHTML = `<h3>${v.marca} ${v.modelo}</h3><div class="type">${v.constructor.name}</div><div class="speed">${v.velocidad_actual.toFixed(1)} <small>km/h</small></div>${energia}<div class="bar"><span style="width:${Math.min(v.velocidad_actual, 100)}%"></span></div>`;
    cards.appendChild(card);
  });
}

function acelerarSeleccionado() {
  const v = vehiculos[Number(document.getElementById("vehiculoSelect").value)];
  const modo = document.getElementById("modoSelect").value;
  let mensaje;
  if (modo === "base") mensaje = v.acelerar();
  else if (modo === "turbo") mensaje = v.acelerar(true);
  else mensaje = v.acelerar(true, "montaña");
  escribir(mensaje);
  actualizarTarjetas();
}

document.getElementById("acelerarBtn").addEventListener("click", acelerarSeleccionado);
document.getElementById("detenerBtn").addEventListener("click", () => {
  const v = vehiculos[Number(document.getElementById("vehiculoSelect").value)];
  escribir(v.detener());
  actualizarTarjetas();
});

document.getElementById("pruebaBtn").addEventListener("click", () => {
  escribir("=== PRUEBA POLIMÓRFICA: UN MISMO CICLO PARA TODOS ===");
  // Polimorfismo: mismas llamadas, comportamiento diferente según la clase.
  for (const vehiculo of vehiculos) {
    escribir(vehiculo.obtener_informacion());
    escribir(vehiculo.acelerar());
    escribir(vehiculo.detener());
  }
  actualizarTarjetas();
});
document.getElementById("limpiarBtn").addEventListener("click", () => {
  registro.innerHTML = '<p class="muted">La actividad de los vehículos aparecerá aquí.</p>';
});

actualizarTarjetas();
