const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// ✅ Registro de Usuario
app.post("/register", async (req, res) => {
    console.log("Datos recibidos:", req.body); 
    
    const { nom_usuario, correo_usuario, pass_usuario, rol_usuario, estado_usuario } = req.body;

    if (!nom_usuario || !correo_usuario || !pass_usuario || !rol_usuario || !estado_usuario) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
      const hashedPassword = await bcrypt.hash(pass_usuario, 10);

      const user = await prisma.usuario.create({
        data: {
          nom_usuario,
          correo_usuario,
          pass_usuario: hashedPassword,
          rol_usuario,
          estado_usuario,
        },
      });

      res.json({ message: "Usuario registrado exitosamente", user });
    } catch (error) {
      res.status(400).json({ error: "Error al registrar usuario", details: error.message });
    }
});

// ✅ Inicio de Sesión de Usuario
app.post("/login", async (req, res) => {
  const { correo_usuario, pass_usuario } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo_usuario } });

    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    // Comparar contraseña
    const validPassword = await bcrypt.compare(pass_usuario, user.pass_usuario);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generar token JWT incluyendo el rol del usuario
    const token = jwt.sign(
      { id: user.id_usuario, rol_usuario: user.rol_usuario }, 
      "secreto_super_seguro", 
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      rol_usuario: user.rol_usuario, 
      nom_usuario: user.nom_usuario 
    });

  } catch (error) {
    res.status(400).json({ error: "Error en el login", details: error.message });
  }
});

// ✅ Obtener Perfil de Usuario
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, "secreto_super_seguro");

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id },
      select: { id_usuario: true, nom_usuario: true, correo_usuario: true, rol_usuario: true }
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
});

// ===============================================
// ✅ CRUD DE USUARIOS
// ===============================================

// ➜ Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios", details: error.message });
  }
});

// ➜ Crear un usuario
app.post("/usuarios", async (req, res) => {
  const { nom_usuario, correo_usuario, pass_usuario, rol_usuario, estado_usuario } = req.body;

  if (!nom_usuario || !correo_usuario || !pass_usuario || !rol_usuario || !estado_usuario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(pass_usuario, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nom_usuario,
        correo_usuario,
        pass_usuario: hashedPassword,
        rol_usuario,
        estado_usuario,
      },
    });

    res.json({ message: "Usuario creado exitosamente", usuario: newUser });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar usuario", details: error.message });
  }
});

// ➜ Editar un usuario
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nom_usuario, correo_usuario, rol_usuario, estado_usuario } = req.body;

  try {
    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        nom_usuario,
        correo_usuario,
        rol_usuario,
        estado_usuario,
      },
    });

    res.json({ message: "Usuario actualizado", usuario: updatedUser });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar usuario", details: error.message });
  }
});

// ➜ Eliminar un usuario
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({ where: { id_usuario: Number(id) } });
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar usuario", details: error.message });
  }
});

// ===============================================
// ✅ Iniciar el servidor
// ===============================================
app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
