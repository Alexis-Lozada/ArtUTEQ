'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminNavbar from '@/components/ui/AdminNavbar';
import Swal from 'sweetalert2';
import { FaUsers, FaFileAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.rol_usuario !== 'administrador') {
          Swal.fire({
            icon: 'warning',
            title: 'Acceso denegado',
            text: 'No tienes permisos para acceder a este panel.',
          }).then(() => {
            router.push('/auth/login');
          });
          return;
        }

        setUser(res.data);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Sesión expirada',
          text: 'Debes iniciar sesión nuevamente.',
        }).then(() => {
          localStorage.removeItem('token');
          router.push('/auth/login');
        });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: 'info',
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que quieres cerrar sesión?',
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-light)' }}>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Panel de Administración</h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Bienvenido, <strong className="text-blue-600">{user?.nom_usuario || 'Administrador'}</strong>
        </p>

        <div className="dashboard-grid">
          {/* Gestionar Usuarios */}
          <div
            className="card"
            onClick={() => router.push('/auth/admin/usuarios')}
          >
            <FaUsers className="card-icon text-blue-500" />
            <h2>Gestionar Usuarios</h2>
            <p>Administra los usuarios registrados en la plataforma.</p>
          </div>

          {/* Ver Reportes */}
          <div className="card">
            <FaFileAlt className="card-icon text-green-500" />
            <h2>Ver Reportes</h2>
            <p>Consulta reportes y estadísticas en tiempo real.</p>
          </div>

          {/* Notificaciones */}
          <div className="card">
            <FaBell className="card-icon text-yellow-500" />
            <h2>Notificaciones</h2>
            <p>Envía y administra alertas importantes.</p>
          </div>

          {/* Cerrar Sesión */}
          <div className="card logout" onClick={handleLogout}>
            <FaSignOutAlt className="card-icon" />
            <h2>Cerrar Sesión</h2>
            <p>Salir de la cuenta y cerrar sesión.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
