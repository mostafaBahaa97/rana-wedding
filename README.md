# rana-wedding
1. حط في `public/`: `couple.jpg` (صورة العريس والعروسة) – `voice.mp3` (الفويس) – `logo.png` (لوجو مصطفى)
2. شغّل الشيت: Extensions > Apps Script > الصق Code.gs > غيّر SECRET > Deploy > Web app (Execute as: Me, Access: Anyone) وانسخ الرابط.
3. انسخ `.env.example` لـ `.env.local` واملاه، وبعدها `npm i && npm run dev`.
4. على Vercel: اسم المشروع rana-wedding وحط نفس الـ 3 Environment Variables.
5. صفحة العريس والعروسة: /messages
