'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavbar from '@/components/ui/AdminNavbar';
import { useRouter } from 'next/navigation';
import {
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaArrowLeft,
  FaFilePdf,
  FaSearch,
} from 'react-icons/fa';

const API_URL = 'https://api.alexisandresuriel.com';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(res.data);
      setFilteredUsuarios(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usuarios.filter((usuario: any) =>
      usuario.nom_usuario.toLowerCase().includes(term) ||
      usuario.correo_usuario.toLowerCase().includes(term) ||
      usuario.rol_usuario.toLowerCase().includes(term)
    );
    setFilteredUsuarios(filtered);
  };

  const handleDelete = async (id_usuario: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/usuarios/${id_usuario}`);
          Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          fetchUsuarios();
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      }
    });
  };

  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Añadir Usuario',
      html:
        `<input id="swal-nombre" class="swal2-input" placeholder="Nombre">` +
        `<input id="swal-correo" class="swal2-input" placeholder="Correo Electrónico">` +
        `<input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña">` +
        `<input id="swal-telefono" class="swal2-input" placeholder="Teléfono (opcional)">` +
        `<input id="swal-direccion" class="swal2-input" placeholder="Dirección (opcional)">` +
        `<input id="swal-ocupacion" class="swal2-input" placeholder="Ocupación (opcional)">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          nom_usuario: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          correo_usuario: (document.getElementById('swal-correo') as HTMLInputElement).value,
          pass_usuario: (document.getElementById('swal-password') as HTMLInputElement).value,
          telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value || null,
          direccion: (document.getElementById('swal-direccion') as HTMLInputElement).value || null,
          ocupacion: (document.getElementById('swal-ocupacion') as HTMLInputElement).value || null,
          rol_usuario: 'usuario',
          estado_usuario: 'activo',
        };
      },
    });

    if (formValues) {
      try {
        await axios.post(`${API_URL}/usuarios`, formValues);
        Swal.fire('Éxito', 'Usuario añadido correctamente', 'success');
        fetchUsuarios();
      } catch (error) {
        Swal.fire('Error', 'No se pudo añadir el usuario', 'error');
      }
    }
  };

  const handleEditUser = async (usuario: any) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Usuario',
      html:
        `<input id="swal-nombre" class="swal2-input" value="${usuario.nom_usuario}" placeholder="Nombre">` +
        `<input id="swal-correo" class="swal2-input" value="${usuario.correo_usuario}" placeholder="Correo Electrónico">` +
        `<input id="swal-telefono" class="swal2-input" value="${usuario.telefono || ''}" placeholder="Teléfono (opcional)">` +
        `<input id="swal-direccion" class="swal2-input" value="${usuario.direccion || ''}" placeholder="Dirección (opcional)">` +
        `<input id="swal-ocupacion" class="swal2-input" value="${usuario.ocupacion || ''}" placeholder="Ocupación (opcional)">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          nom_usuario: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          correo_usuario: (document.getElementById('swal-correo') as HTMLInputElement).value,
          telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value || null,
          direccion: (document.getElementById('swal-direccion') as HTMLInputElement).value || null,
          ocupacion: (document.getElementById('swal-ocupacion') as HTMLInputElement).value || null,
          rol_usuario: usuario.rol_usuario,
          estado_usuario: usuario.estado_usuario,
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(`${API_URL}/usuarios/${usuario.id_usuario}`, formValues);
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
        fetchUsuarios();
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              className="table-action-button btn-gray"
              onClick={() => router.push('/dashboard')}
            >
              <FaArrowLeft /> Regresar
            </button>

            <button className="table-action-button btn-red">
              <FaFilePdf /> Generar PDF
            </button>

            <button
              className="table-action-button btn-add"
              onClick={handleAddUser}
            >
              <FaUserPlus /> Añadir Usuario
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input pl-10"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table-auto">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Ocupación</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario: any) => (
                    <tr key={usuario.id_usuario} className="border-b">
                      <td>{usuario.id_usuario}</td>
                      <td>{usuario.nom_usuario}</td>
                      <td>{usuario.correo_usuario}</td>
                      <td>{usuario.telefono || '-'}</td>
                      <td>{usuario.direccion || '-'}</td>
                      <td>{usuario.ocupacion || '-'}</td>
                      <td>{usuario.rol_usuario}</td>
                      <td>{usuario.estado_usuario}</td>
                      <td className="flex justify-center gap-2 py-2">
                        <button
                          className="table-action-button btn-edit"
                          onClick={() => handleEditUser(usuario)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="table-action-button btn-delete"
                          onClick={() => handleDelete(usuario.id_usuario)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-6 text-center text-gray-500">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
