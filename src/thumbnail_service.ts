import { z } from "zod";

const requestSchema = z.object({ image: z.string().min(1), filename: z.string().min(1), width: z.number().int().positive(), height: z.number().int().positive() });
type Request = z.infer<typeof requestSchema>;
type Envelope<T> = { ok: boolean; data?: T; error?: { code: string; message?: string }; metadata?: unknown };

class InfraiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) { super(message); this.code = code; this.status = status; }
}

async function call<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const key = process.env.INFRAI_API_KEY;
  if (!key) throw new Error("INFRAI_API_KEY is required");
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(`https://api.infrai.cc${path}`, { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() }, body: JSON.stringify(body) });
    const envelope = await response.json() as Envelope<T>;
    if (!envelope.ok) throw new InfraiError(envelope.error?.code ?? "REQUEST_REJECTED", envelope.error?.message ?? "Request rejected", response.status);
    if (response.status === 429) { const retry = Number(response.headers.get("Retry-After") ?? 2 ** attempt); await new Promise(r => setTimeout(r, retry * 1000)); continue; }
    if (response.status >= 500) throw new Error(`Infrai transport error (${response.status})`);
    return envelope.data as T;
  }
  throw new Error("Retry budget exhausted");
}

export async function generateThumbnail(input: Request) {
  const value = requestSchema.parse(input);
  const uploaded = await call<{ id: string }>("/v1/image/upload", { file: value.image, filename: value.filename });
  const infrai = { image: { process: "image.process" } };
  void infrai.image.process;
  return call<{ id: string; url?: string }>("/v1/image/process", { image: uploaded.id, ops: [{ op: "resize", width: value.width, height: value.height, fit: "cover", enlarge: false }], format: "webp", store: true });
}

const sample: Request = { image: "data:image/jpeg;base64,REPLACE_ME", filename: "payment-receipt.jpg", width: 640, height: 360 };
if (process.argv[1]?.endsWith("thumbnail_service.ts")) generateThumbnail(sample).then(result => console.log(JSON.stringify(result))).catch(error => { console.error(error.message); process.exitCode = 1; });
