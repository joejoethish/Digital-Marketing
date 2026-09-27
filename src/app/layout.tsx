import './globals.css';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: 'DEEYORA — Digital Growth. Designed to Perform.',
  description:
    'DEEYORA is a premium digital growth studio combining strategy, creative, performance and technology into one continuous growth journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        {/* System layer — composited above everything */}
        <SmoothScroll />
        <CustomCursor />

        {/* Page shell */}
        <div className="page">
          <Navbar />
          <main className="content-layer">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
