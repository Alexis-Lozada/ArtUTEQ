'use client';

import Navbar from '@/components/ui/Navbar';
import AlertLogin from '@/components/ui/AlertLogin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    try {
      const res = await axios.post('http://localhost:5000/login', {
        correo_usuario: email,
        pass_usuario: password,
      });

      console.log('Datos recibidos:', res.data); 

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('rol_usuario', res.data.rol_usuario); 

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: `Bienvenido, ${res.data.nom_usuario}`,
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          const userRole = res.data.rol_usuario.trim().toLowerCase();
          if (userRole === 'administrador') {
            router.push('/dashboard'); 
          } else {
            router.push('/home');
          }
        }, 2000);
      } else {
        setAlert({ message: 'No se recibió un token válido.', type: 'error' });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: err.response?.data?.error || 'No se pudo conectar con el servidor.',
      });
    }
  };

  return (
    <div className="form-container">
      {alert && <AlertLogin message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <Navbar />
      <div className="form-content">
        <div className="form-card">
          <h2 className="form-title">Iniciar sesión</h2>
          <p className="form-description">
            Inicia sesión para acceder a funciones exclusivas.
          </p>

          <form onSubmit={handleSubmit} className="form-box">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="form-button">
              Iniciar sesión
            </button>

            {/* Botón de inicio de sesión con Google */}
            <button type="button" className="google-login-button">
              <img src="/google-icon.svg" alt="Google" className="google-icon" />
              Iniciar sesión con Google
            </button>
          </form>

          <p className="form-footer">
            ¿Aún no tienes una cuenta? <br />
            <a href="/auth/registro">¡Regístrate!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
