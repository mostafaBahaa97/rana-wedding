export const dynamic = 'force-dynamic';
const URL_ = process.env.APPS_SCRIPT_URL;
const SECRET = process.env.SCRIPT_SECRET;

export async function POST(req) {
  try {
    const { name, message } = await req.json();
    if (!name?.trim() || !message?.trim()) return Response.json({ ok: false }, { status: 400 });
    const r = await fetch(URL_, {
      method: 'POST', redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret: SECRET, name: name.trim().slice(0, 60), message: message.trim().slice(0, 1000) }),
    });
    const j = await r.json();
    return Response.json(j, { status: j.ok ? 200 : 500 });
  } catch { return Response.json({ ok: false }, { status: 500 }); }
}

export async function GET(req) {
  if (!process.env.VIEW_PASSWORD || req.headers.get('x-pass') !== process.env.VIEW_PASSWORD)
    return Response.json({ ok: false }, { status: 401 });
  try {
    const r = await fetch(`${URL_}?secret=${encodeURIComponent(SECRET)}`, { cache: 'no-store', redirect: 'follow' });
    return Response.json(await r.json());
  } catch { return Response.json({ ok: false }, { status: 500 }); }
}
