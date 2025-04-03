'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Swal from 'sweetalert2';
import { Palette, Paintbrush, Image, Lock, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

export default function Home() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      console.log("slide changed");
    },
    created(s) {
      let timeout: ReturnType<typeof setTimeout>;
      let mouseOver = false;

      function clearNextTimeout() {
        clearTimeout(timeout);
      }

      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          s.next();
        }, 5000);
      }

      s.on("created", () => nextTimeout());
      s.on("dragStarted", clearNextTimeout);
      s.on("animationEnded", nextTimeout);
      s.on("updated", nextTimeout);

      s.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      s.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
    },
  });

  // 🔐 SweetAlert para bloquear acceso si no hay token
  const handleAccessClick = (e: React.MouseEvent) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión primero',
        text: 'Debes iniciar sesión para acceder a esta sección.',
        confirmButtonText: 'Entendido',
      });
    }
  };

  return (
    <>
      <Navbar />

      <main>
        {/* === Hero Section con Carrusel === */}
        <section className="hero-section" id="inicio">
          <div ref={sliderRef} className="keen-slider hero-carousel">
            {[1, 2, 3, 4].map((num) => (
              <div className="keen-slider__slide art-slide" key={num}>
                <img src={`/prueba${num}.jpg`} className="carousel-img" alt={`Obra ${num}`} />
                <div className="slide-caption">
                  <h2>Arte Digital {num}</h2>
                  <p>Exploración visual de formas y colores</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-overlay">
            <h1>Bienvenido a ArtUteq</h1>
            <p>Descubre el arte en su expresión más pura</p>
            <a href="/auth/home" className="hero-cta" onClick={handleAccessClick}>
              Ver galería <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* === Acerca de ArtUteq === */}
        <section className="about-art" id="acerca">
          <Palette size={48} />
          <h2>Acerca de ArtUteq</h2>
          <p>
            Un espacio para la expresión visual, donde artistas emergentes y consagrados exponen sus emociones a través de la imagen. Aquí, cada obra cuenta una historia única que trasciende las barreras del tiempo y el espacio.
          </p>
          <div className="about-features">
            <div className="feature">
              <Paintbrush size={24} />
              <h3>Creación sin límites</h3>
              <p>Promovemos la libertad creativa en todas sus formas y estilos.</p>
            </div>
            <div className="feature">
              <Image size={24} />
              <h3>Exposición digital</h3>
              <p>Una plataforma moderna para exhibir arte en el mundo contemporáneo.</p>
            </div>
          </div>
        </section>

        {/* === Galería destacada === */}
        <section className="gallery-preview" id="galeria">
          <h2>Nuestra Galería</h2>
          <p className="section-subtitle">Explorando nuevas perspectivas artísticas</p>

          <div className="gallery-grid">
            {[6, 7, 8, 9, 10, 11].map((num) => (
              <div className="gallery-item" key={num}>
                <img src={`/prueba${num % 8 + 1}.jpg`} alt={`Obra ${num}`} />
                <div className="gallery-overlay">
                  <h3>Obra #{num}</h3>
                  <p>Artista UTEQ</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-cta">
            <a href="/galeria" className="btn-secondary" onClick={handleAccessClick}>
              Ver toda la colección
            </a>
          </div>
        </section>

        {/* === CIA Section === */}
        <section className="cia-section" id="cia">
          <h2>Principios de Seguridad - CIA</h2>
          <p className="section-subtitle">Protegiendo el arte y a los artistas</p>

          <div className="cia-cards">
            <div className="cia-card">
              <ShieldCheck size={48} />
              <h3>Confidencialidad</h3>
              <p>Protegemos la identidad y derechos de autor de cada artista con los más altos estándares de privacidad.</p>
            </div>
            <div className="cia-card">
              <Lock size={48} />
              <h3>Integridad</h3>
              <p>Cuidamos que cada obra y su contexto se presenten fielmente, respetando la visión original del creador.</p>
            </div>
            <div className="cia-card">
              <Activity size={48} />
              <h3>Accesibilidad</h3>
              <p>Exposición disponible 24/7 en nuestra galería digital, garantizando que el arte sea accesible para todos.</p>
            </div>
          </div>
        </section>

        {/* === Obra Destacada === */}
        <section className="highlight-flex">
          <div className="highlight-text">
            <h2>Obra Destacada</h2>
            <p>
              "La conciencia digital" es una pieza que explora la relación entre el arte y la tecnología. Esta obra busca representar cómo la inteligencia y el alma humana se reflejan a través de la creación digital, cuestionando los límites entre lo artificial y lo auténtico.
            </p>
            <p>La obra invita a reflexionar sobre nuestra relación con la tecnología y cómo ésta se ha convertido en un nuevo medio para la expresión artística, mostrando nuevas dimensiones de nuestra humanidad.</p>
            <div className="highlight-details">
              <p><strong>Autor:</strong> UTEQ Studio</p>
              <p><strong>Año:</strong> 2025</p>
              <p><strong>Técnica:</strong> Arte digital mixto</p>
            </div>
            <a href="/obra/conciencia-digital" className="btn-primary" onClick={handleAccessClick}>
              Ver detalles completos
            </a>
          </div>
          <div className="highlight-img-container">
            <img src="/prueba5.png" alt="Obra destacada - La conciencia digital" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
