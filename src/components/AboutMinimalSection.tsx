import Link from 'next/link';

export default function AboutMinimalSection() {
  return (
    <section className="section">
      <div className="container about">
        <div className="about-visual" />
        <div>
          <div className="eyebrow">ABOUT DEEYORA</div>
          <h2 className="section-title">
            DIGITAL GROWTH. DESIGNED TO <span className="accent">PERFORM.</span>
          </h2>
          <p className="section-copy">
            DEEYORA is a digital growth studio focused on helping businesses build, improve, and scale their presence online. We bring strategy, content, performance, digital experiences, and data together into a clear, connected path forward.
          </p>
          <Link href="/about" className="btn-secondary" style={{ display: 'inline-block', marginTop: 25 }}>
            Learn About DEEYORA →
          </Link>
        </div>
      </div>
    </section>
  );
}
