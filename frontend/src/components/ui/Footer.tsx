import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Github, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ArtUteq</h3>
          <p>
            Un espacio digital para la expresión artística y visual donde cada obra cuenta una historia única.
          </p>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>

          {/* Imagen de UTEQ */}
          <div style={{ marginTop: '2rem' }}>
            <Image
              src="/uteq.jpg" // Asegúrate que el archivo esté exactamente con este nombre
              alt="Logo UTEQ"
              width={170}
              height={75}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="footer-section">
          <h3>Enlaces rápidos</h3>
          <ul className="footer-links">
            <li><Link href="/#inicio">Inicio</Link></li>
            <li><Link href="/#acerca">Acerca de</Link></li>
            <li><Link href="/#galeria">Galería</Link></li>
            <li><Link href="/#cia">CIA</Link></li>
            <li><Link href="/auth">Iniciar sesión</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={16} />
              <span>Quevedo, Los Ríos, Ecuador</span>
            </li>
            <li>
              <Mail size={16} />
              <span>contacto@artuteq.ec</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+593 98 765 4321</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} ArtUteq. Todos los derechos reservados.</p>
        <div className="footer-legal">
          <Link href="/privacidad">Política de privacidad</Link>
          <Link href="/terminos">Términos de uso</Link>
        </div>
      </div>
    </footer>
  );
}
