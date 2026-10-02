// CDP 擷取：真實的裝置模擬 + 整頁截圖 + 版面量測
// 用法: node /tmp/shoot.mjs <url> <out.png> <width> <height> <mobile 0|1>
import { writeFileSync } from 'node:fs';

const [url, out, w, h, mobileFlag] = process.argv.slice(2);
const width = Number(w);
const height = Number(h);
const mobile = mobileFlag === '1';

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
let page = targets.find((t) => t.type === 'page');
if (!page) {
  await fetch('http://127.0.0.1:9222/json/new?about:blank');
  page = (await (await fetch('http://127.0.0.1:9222/json/list')).json()).find((t) => t.type === 'page');
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const events = new Map();

ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method && events.has(msg.method)) {
    events.get(msg.method)();
    events.delete(msg.method);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

const once = (method) => new Promise((resolve) => events.set(method, resolve));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await new Promise((r) => ws.addEventListener('open', r));

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 2,
  mobile,
  screenWidth: width,
  screenHeight: height,
});
if (mobile) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
}

const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url });
await loaded;
// 字體、圖片與入場動畫落定
await wait(2200);

const { result } = await send('Runtime.evaluate', {
  expression: `(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right > vw + 1.5 && !el.closest('.band__trace')) {
        bad.push((el.tagName + '.' + (el.className || '')).slice(0, 70) + ' right=' + Math.round(r.right));
      }
    });
    const box = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().width) : null; };
    const top = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top) : null; };
    const cs = (s, p) => { const e = document.querySelector(s); return e ? getComputedStyle(e)[p] : null; };
    return JSON.stringify({
      vw, scrollW: document.documentElement.scrollWidth,
      docH: document.documentElement.scrollHeight,
      plot: box('.wave__canvas'), photo: box('.mount'),
      nameFS: cs('.identity__name', 'fontSize'),
      ledeFS: cs('.masthead__lede', 'fontSize'),
      activeTop: top('#active'), firstBandTop: top('.band'),
      bad: bad.slice(0, 12),
    });
  })()`,
  returnByValue: true,
});

const metrics = JSON.parse(result.value);
console.log(`[${width}x${height}${mobile ? ' mobile' : ''}] ` + JSON.stringify(metrics));

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: true,
  optimizeForSpeed: false,
});
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log('wrote ' + out);
ws.close();
