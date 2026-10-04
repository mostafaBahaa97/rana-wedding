'use client';
import { useEffect, useRef, useState } from 'react';

const TARGET = new Date('2026-10-12T20:00:00+03:00').getTime();
const MAPS = 'https://maps.app.goo.gl/jUReA1YumGfJqSJ3A?g_st=aw';
const DAYS = ['سبت', 'حد', 'اتنين', 'تلات', 'أربع', 'خميس', 'جمعة'];

function Hearts({ n = 16 }) {
  return (
    <div className="hearts" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} style={{ left: `${(i * 37) % 100}%`, fontSize: `${14 + ((i * 7) % 22)}px`,
          animationDuration: `${7 + ((i * 3) % 7)}s`, animationDelay: `${-((i * 5) % 11)}s` }}>
          {i % 3 === 0 ? '❀' : '♥'}
        </span>
      ))}
    </div>
  );
}

function Calendar() {
  const offset = (new Date(2026, 9, 1).getDay() + 1) % 7; // الأسبوع يبدأ سبت
  const cells = [...Array(offset).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="card cal">
      <h3 className="cal-title">أكتوبر 2026</h3>
      <div className="grid">
        {DAYS.map(d => <b key={d} className="dn">{d}</b>)}
        {cells.map((d, i) => d === null ? <i key={i} /> :
          <span key={i} className={d === 12 ? 'd today' : 'd'}><em>{d}</em></span>)}
      </div>
    </div>
  );
}

function Countdown() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, TARGET - Date.now()));
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);
  const s = left === null ? null : Math.floor(left / 1000);
  const parts = s === null ? [0, 0, 0, 0] : [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
  return (
    <div className="count">
      {['يوم', 'ساعة', 'دقيقة', 'ثانية'].map((l, i) => (
        <div key={l} className="unit"><strong>{String(parts[i]).padStart(2, '0')}</strong><small>{l}</small></div>
      ))}
    </div>
  );
}

function GuestForm() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done
  const [err, setErr] = useState('');
  const [who, setWho] = useState('');

  async function send() {
    if (!name.trim() || !msg.trim()) return setErr('اكتب اسمك وكلمتك الأول 💌');
    setErr(''); setState('sending');
    try {
      const r = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: msg }) });
      if (!r.ok) throw 0;
      setWho(name.trim()); setState('done');
    } catch { setState('idle'); setErr('حصلت مشكلة في الإرسال، جرّب تاني بعد شوية'); }
  }

  if (state === 'done') return (
    <div className="card thanks">
      <div className="bigheart">♥</div>
      <h3>شكرًا يا {who}</h3>
      <p>شكرًا على كلامك وتهنئتك، ومستنيينك تنورنا في الفرح، لأن الفرح هيكمل بيكم 💕</p>
    </div>
  );
  return (
    <div className="card form">
      <h2 className="sec">سيبلنا كلمة حلوة</h2>
      <label>اسمك<input value={name} onChange={e => setName(e.target.value)} maxLength={60} placeholder="اكتب اسمك" /></label>
      <label>تهنئتك للعريس والعروسة<textarea value={msg} onChange={e => setMsg(e.target.value)} maxLength={1000} rows={5} placeholder="اكتب تهنئتك هنا…" /></label>
      {err && <p className="err">{err}</p>}
      <button className="btn" onClick={send} disabled={state === 'sending'}>{state === 'sending' ? 'جاري الإرسال…' : 'ارسال'}</button>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState('loading');
  const audio = useRef(null);
  useEffect(() => { const t = setTimeout(() => setPhase('gate'), 2200); return () => clearTimeout(t); }, []);
  const open = () => { audio.current?.play().catch(() => {}); setPhase('open'); window.scrollTo(0, 0); };

  return (
    <>
      <audio ref={audio} src="/music.mpeg" preload="auto" />
      <Hearts />
      {phase === 'loading' && (
        <div className="screen"><div className="loadheart">♥</div><p className="loadtxt">أحمد و رنا</p></div>
      )}
      {phase === 'gate' && (
        <div className="screen">
          <p className="gate-n">أحمد ♥ رنا</p>
          <button className="btn big" onClick={open}>اضغط للفتح</button>
        </div>
      )}
      {phase === 'open' && (
        <main className="main">
          <section className="hero">
            <div className="bism">﷽</div>
            <h1 className="names"><span>أحمد</span><i>♥ و ♥</i><span>رنا</span></h1>
            <div className="photo"><img src="/profile.jpeg" alt="أحمد ورنا" onError={e => (e.currentTarget.style.opacity = 0)} /></div>
          </section>

          <section className="wrap">
            <Calendar />
            <p className="lead">باقي على فرحنا</p>
            <Countdown />
          </section>

          <section className="wrap">
            <div className="card details">
              <h2 className="sec">تفاصيل الفرح</h2>
              <p><b>📅 الميعاد:</b> يوم الاتنين 12 أكتوبر 2026</p>
              <p><b>🕗 الوقت:</b> الساعة 8:00 مساءً</p>
              <p><b>📍 المكان:</b> قاعة Grand Sea Rena</p>
              <a className="btn" href={MAPS} target="_blank" rel="noopener noreferrer">افتح الموقع على الخريطة</a>
            </div>
          </section>

          <section className="wrap"><GuestForm /></section>

          <footer className="foot">
            <div className="logo"><img src="/favicon.ico" alt="" onError={e => (e.currentTarget.style.display = 'none')} /></div>
            <a href="https://mostafa-s-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">Developed by Mostafa Bahaa</a>
          </footer>
        </main>
      )}
    </>
  );
}
