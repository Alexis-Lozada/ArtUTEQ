'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Paintbrush, LayoutDashboard, Users, LogOut } from 'lucide-react';

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        {/* Logo */}
        <Link href="/auth/dashboard" className="admin-navbar-logo">
          <Paintbrush size={24} />
          <span>Admin · ArtUteq</span>
        </Link>

        {/* Links rápidos */}
        <ul className="admin-navbar-links">
          <li>
            <Link href="/auth/dashboard">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/auth/admin/usuarios">
              <Users size={18} />
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              <span>Salir</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
