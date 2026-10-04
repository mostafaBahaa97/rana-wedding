'use client';
import { useState } from 'react';

export default function Messages() {
  const [pass, setPass] = useState('');
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/messages', { headers: { 'x-pass': pass }, cache: 'no-store' });
      if (r.status === 401) throw new Error('الباسورد غلط');
      const j = await r.json();
      if (!j.ok) throw new Error('مقدرناش نجيب الرسايل');
      setRows(j.rows);
    } catch (e) { setErr(e.message || 'حصلت مشكلة'); }
    setBusy(false);
  }
  const fmt = d => new Date(d).toLocaleString('ar-EG', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Cairo' });

  return (
    <main className="main wrap msgs">
      <h1 className="sec big">رسايل الحبايب 💌</h1>
      {rows === null ? (
        <div className="card form">
          <label>الباسورد<input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} /></label>
          {err && <p className="err">{err}</p>}
          <button className="btn" onClick={load} disabled={busy}>{busy ? 'جاري التحميل…' : 'عرض الرسايل'}</button>
        </div>
      ) : (
        <>
          <p className="lead">عدد الرسايل: {rows.length}</p>
          {rows.length === 0 && <p className="lead">لسه مفيش رسايل</p>}
          {rows.map((m, i) => (
            <article key={i} className="card msg">
              <header><strong>{m.name}</strong><time>{fmt(m.date)}</time></header>
              <p>{m.message}</p>
            </article>
          ))}
          <button className="btn" onClick={load}>تحديث</button>
        </>
      )}
    </main>
  );
}
