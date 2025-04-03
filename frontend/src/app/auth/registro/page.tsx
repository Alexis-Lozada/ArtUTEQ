'use client';

import Navbar from '@/components/ui/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<React.ReactNode>('');
  const router = useRouter();

  const validarPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!validarPassword(password)) {
      setError(
        <div style={{ color: 'red' }}>
          <p>La contraseña debe cumplir con los siguientes requisitos:</p>
          <ul className="password-requirements">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos una letra mayúscula</li>
            <li>Al menos una letra minúscula</li>
            <li>Al menos un número</li>
            <li>Al menos un carácter especial (@$!%*?&)</li>
          </ul>
        </div>
      );
      return;
    }

    const newUser = {
      nom_usuario: nombre,
      correo_usuario: email,
      pass_usuario: password,
      rol_usuario: 'usuario',
      estado_usuario: 'activo',
    };

    try {
      await axios.post('http://137.184.13.6:5000/register', newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      Swal.fire({
        title: '¡Registro exitoso!',
        text: `Bienvenido, ${nombre}. Tu cuenta ha sido creada correctamente.`,
        icon: 'success',
        confirmButtonText: 'Iniciar sesión',
      }).then(() => {
        router.push('/auth/login');
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Error en el registro.');
      } else {
        setError('Error en el registro.');
      }
    }
  };

  return (
    <div className="form-container">
      <Navbar />
      <div className="form-content">
        <div className="form-card1 mt-8">
          <h2 className="form-title">Registro</h2>
          <p className="form-description">
            Regístrate para crear una cuenta y recibir notificaciones personalizadas.
          </p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-box">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="form-input"
              />
            </div>

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
              Registrarme
            </button>
          </form>

          <p className="form-footer">
            ¿Ya tienes una cuenta? <br />
            <a href="/auth/login">¡Inicia sesión!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;