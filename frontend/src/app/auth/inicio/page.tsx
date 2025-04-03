// src/app/page.tsx
import { ShieldCheck, Lock, Server, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="home">
      <header className="hero">
        <h1 className="hero-title">cy_check</h1>
        <p className="hero-subtitle">Protegemos tu mundo digital</p>
        <a href="/auth" className="hero-btn">Empieza ahora</a>
      </header>

      <section className="features">
        <div className="feature-card">
          <ShieldCheck size={48} />
          <h3>Análisis de Vulnerabilidades</h3>
          <p>Escaneamos tu infraestructura y te decimos dónde estás expuesto.</p>
        </div>
        <div className="feature-card">
          <Lock size={48} />
          <h3>Protección de Datos</h3>
          <p>Implementamos políticas de cifrado y seguridad de alto nivel.</p>
        </div>
        <div className="feature-card">
          <Server size={48} />
          <h3>Infraestructura Segura</h3>
          <p>Desde servidores hasta la nube, todo blindado y monitoreado.</p>
        </div>
        <div className="feature-card">
          <Globe size={48} />
          <h3>Seguridad Global</h3>
          <p>Operamos en múltiples regiones, siempre vigilando tu perímetro.</p>
        </div>
      </section>
    </main>
  );
}
