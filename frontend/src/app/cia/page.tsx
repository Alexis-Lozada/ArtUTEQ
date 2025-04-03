'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function CIA() {
  return (
    <>
      <Navbar />
      <section className="page-section">
        <div className="page-container">
          <div className="page-text">
            <h2>Compromiso CIA - UTEQ</h2>
            <p>
              En la Universidad Tecnológica de Querétaro (UTEQ), la ciberseguridad es un pilar fundamental en la formación
              tecnológica. El modelo CIA —Confidencialidad, Integridad y Accesibilidad— se vive desde las aulas hasta los
              proyectos digitales, fortaleciendo el arte y la tecnología como ejes transformadores.
            </p>
            <ul className="page-list">
              <li><strong>Confidencialidad:</strong> Protegemos los datos y la autoría de los artistas.</li>
              <li><strong>Integridad:</strong> Cada obra es preservada en su versión original.</li>
              <li><strong>Accesibilidad:</strong> La galería está abierta digitalmente, 24/7 para todo público.</li>
            </ul>
          </div>
          <div className="page-image">
            <img src="/uteqcia.jpg" alt="UTEQ CIA" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
