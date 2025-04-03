'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, Info, Shield, LogIn, Menu, X, Paintbrush, Image } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGalleryClick = (e: React.MouseEvent) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault(); // evita redirección
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión primero',
        text: 'Debes iniciar sesión para acceder a la galería de obras.',
        confirmButtonText: 'Entendido',
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/auth/login" className="navbar-logo">
          <Paintbrush size={24} />
          <span>ArtUteq</span>
        </Link>

        {/* Botón hamburguesa */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link href="/">
              <Home size={18} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link href="/acerca">
              <Info size={18} />
              <span>Acerca de</span>
            </Link>
          </li>
          <li>
            {/* Galería con protección */}
            <Link href="/auth/home" onClick={handleGalleryClick}>
              <Image size={18} />
              <span>Galería</span>
            </Link>
          </li>
          <li>
            <Link href="/cia">
              <Shield size={18} />
              <span>CIA</span>
            </Link>
          </li>
          <li className="auth-button">
            <Link href="/auth/login">
              <LogIn size={18} />
              <span>Acceso</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
