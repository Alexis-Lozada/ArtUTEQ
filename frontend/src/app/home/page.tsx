'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import UserNavbar from '@/components/ui/UserNavbar';
import Footer from '@/components/ui/Footer';

const GalleryHome = () => {
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
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <UserNavbar />
      <main className="page-section alt">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Bienvenido, {user?.nom_usuario || 'Usuario'}</h1>
          <p className="text-lg text-gray-600 mb-8">Explora la colección artística de ArtUteq</p>

          <div className="gallery-grid">
            {[...Array(10)].map((_, i) => (
              <div className="gallery-item" key={i}>
                <img src={`/prueba${i + 1}.jpg`} alt={`Obra ${i + 1}`} />
                <div className="gallery-overlay">
                  <h3>Obra #{i + 1}</h3>
                  <p>Artista UTEQ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GalleryHome;
