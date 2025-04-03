'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

const UserNavbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/auth/login');

      try {
        const res = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        Swal.fire('Sesión expirada', 'Por favor inicia sesión nuevamente.', 'error').then(() => {
          localStorage.removeItem('token');
          router.push('/auth/login');
        });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro que deseas salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/auth/home" className="navbar-logo">
          <FaUserCircle size={22} />
          <span>ArtUteq</span>
        </Link>

        <div className="user-navbar-right">
  <span className="user-name">{user?.nom_usuario || 'Usuario'}</span>
  <button onClick={handleLogout} className="btn-secondary logout-btn">
    <FaSignOutAlt size={16} />
    Salir
  </button>
</div>

      </div>
    </nav>
  );
};

export default UserNavbar;
