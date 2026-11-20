// Pru's Arcade service worker: caches everything so the games work offline.
const CACHE="pru-arcade-v1"; // bump this when you publish an update
const FILES=["./", "index.html", "manifest.webmanifest", "press-start-2p-latin-400-normal.woff2", "pixelify-sans-latin-500-normal.woff2", "pixelify-sans-latin-700-normal.woff2", "anton-latin-400-normal.woff2", "nunito-latin-400-normal.woff2", "nunito-latin-600-normal.woff2", "nunito-latin-700-normal.woff2", "nunito-latin-800-normal.woff2", "nunito-latin-900-normal.woff2", "icon-192.png", "icon-512.png", "maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET" || new URL(e.request.url).origin!==location.origin) return;
  // network first for the page (so updates show up), cache first for everything else
  if(e.request.mode==="navigate"){ e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put("./",c)); return r; }).catch(()=>caches.match("./"))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
