import assert from "node:assert/strict";
import { generateThumbnail } from "./thumbnail_service.js";

const originalFetch = globalThis.fetch;
let calls = 0;
globalThis.fetch = async (_input, init) => { calls++; const body = JSON.parse(String(init?.body)); assert.equal(init?.method, "POST"); assert.ok(init?.headers && "Authorization" in init.headers); if (calls === 2) assert.deepEqual(body, { image: "img_123", ops: [{ op: "resize", width: 320, height: 180, fit: "cover", enlarge: false }], format: "webp", store: true }); return new Response(JSON.stringify({ ok: true, data: calls === 1 ? { id: "img_123" } : { id: "thumb_123", url: "https://cdn.example/thumb.webp" } }), { status: 200, headers: { "content-type": "application/json" } }); };
process.env.INFRAI_API_KEY = "test-key";
const result = await generateThumbnail({ image: "data:image/jpeg;base64,x", filename: "receipt.jpg", width: 320, height: 180 });
assert.equal(result.id, "thumb_123");
assert.equal(calls, 2);
globalThis.fetch = originalFetch;
console.log("thumbnail decision test passed");
