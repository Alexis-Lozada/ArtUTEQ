'use client';

interface ModalRegistroProps {
  isOpen: boolean;
  userData: { nombre: string; email: string };
  onClose: () => void;
}

const ModalRegistro = ({ isOpen, userData, onClose }: ModalRegistroProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">¡Registro exitoso!</h2>
        <p className="mt-2 text-gray-700">Usuario registrado:</p>
        <p className="font-semibold">{userData.nombre}</p>
        <p className="text-gray-500">{userData.email}</p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalRegistro;
