import Link from 'next/link';
import { services } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section className="section">
      <div className="container services-grid">
        <div>
          <div className="eyebrow">OUR SERVICES</div>
          <h2 className="section-title">
            DIGITAL GROWTH, BUILT AROUND YOUR BUSINESS.
          </h2>
          <p className="section-copy">
            Not every business needs every marketing channel. We identify what matters most for your goals and build the right combination of strategy, creative, performance, digital experience, and data.
          </p>
          <Link href="/services" className="btn-secondary" style={{ display: 'inline-block', marginTop: 25 }}>
            View All Services →
          </Link>
        </div>
        <div className="service-cards">
          {services.map((s) => (
            <article className="service" key={s.n}>
              <span className="num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.headline}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
