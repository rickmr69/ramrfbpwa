/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 + cWualquier cambio en el contenido de este archivo hace que el service worker
 * se reinstale. Normalmente se cambia el número en el nombre del caché cuando
 * cambia el contenido de los archivos. */
const CACHE = "ramrfbpwa-1.1";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "img/icono-256.png",
  "img/icono-1024.png",
  "img/icono-2048.png",
  "estilos.css",
  "favicon.ico",
  "index.html",
  "manifest.json",
  "__/firebase/7.9.1/firebase-app.js",
  "__/firebase/7.9.1/firebase-auth.js",
  "__/firebase/7.9.1/firebase-firestore.js",
  "__/firebase/7.9.1/firebase-storage.js",
  "__/firebase/init.js",
  '/'
];
self.addEventListener("install", evt => {
  console.log("Service Worker instalado.");
  // Realiza la instalación: carga los archivos requeridos en la caché.
  // @ts-ignore
  evt.waitUntil(cargaCache());
});
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch", evt => {
  // @ts-ignore
  if (evt.request.method === "GET") {
    // @ts-ignore
    evt.respondWith(usaCache(evt));
  }
});
self.addEventListener("activate", () => console.log("Service Worker activo."));

async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}

async function usaCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response) {
    return response;
  } else {
    return fetch(evt.request);
  }
}