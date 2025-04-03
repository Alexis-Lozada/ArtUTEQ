'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function Acerca() {
  return (
    <>
      <Navbar />
      <section className="page-section alt">
        <div className="page-container">
          <div className="page-image">
            <img src="/prueba5.png" alt="Arte digital UTEQ" />
          </div>
          <div className="page-text">
            <h2>Sobre ArtUteq</h2>
            <p>
              ArtUteq nace como una iniciativa visual desde la UTEQ, donde convergen artistas, diseñadores y mentes
              inquietas por transformar su entorno con arte digital. Es una plataforma donde cada píxel tiene propósito
              y cada obra es un grito estético desde el alma universitaria.
            </p>
            <p>
              Aquí, la tecnología no reemplaza al arte: lo impulsa. Y cada trazo digital conecta generaciones
              a través de ideas que rompen límites.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
