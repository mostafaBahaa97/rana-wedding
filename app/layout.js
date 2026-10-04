import { Aref_Ruqaa, Amiri, Cairo } from 'next/font/google';
import './globals.css';

const names = Aref_Ruqaa({ subsets: ['arabic'], weight: ['400', '700'], variable: '--f-names' });
const basmala = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--f-basmala' });
const body = Cairo({ subsets: ['arabic', 'latin'], variable: '--f-body' });

export const metadata = {
  title: 'rana-wedding',
  description: 'دعوة فرح أحمد ورنا — ٱترك لنا كلمة حلوة',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#FFF8F3' };

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${names.variable} ${basmala.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
