import './globals.css';
import Navbar        from '@/components/Navbar';
import Footer        from '@/components/Footer';
import GrowthScene   from '@/components/GrowthScene';
import CustomCursor  from '@/components/CustomCursor';
import InteractiveGrid from '@/components/ui/InteractiveGrid';
import ScrollProgress  from '@/components/ui/ScrollProgress';

export const metadata = {
  title: 'DEEYORA — Digital Growth. Designed to Perform.',
  description:
    'DEEYORA is a premium digital growth studio combining strategy, creative, performance and technology into one continuous growth journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* System layer — composited above everything */}
        <CustomCursor />
        <ScrollProgress />

        {/* Background layers (fixed, lowest z) */}
        <GrowthScene />       {/* z-index: 0 — animated canvas BG */}
        <InteractiveGrid />   {/* z-index: 1 — interactive grid overlay */}

        {/* Page shell — sits above all fixed BG layers */}
        <div className="page">
          <Navbar />
          <main className="content-layer">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
