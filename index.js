const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Configuración conexión MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // tu usuario de MySQL
  password: "",       // si dejaste vacío en XAMPP, pon ""
  database: "mini_red_social"
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Middleware para leer JSON del body
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Node funcionando 🚀");
});

// ===========================
// ENDPOINTS USUARIOS
// ===========================

// Mostrar todos los usuarios
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener usuarios");
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo usuario
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al crear usuario");
      } else {
        res.send("Usuario creado con éxito!");
      }
    }
  );
});

// ===========================
// ENDPOINTS POSTS
// ===========================

// Mostrar todos los posts
app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener posts");
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo post
app.post("/posts", (req, res) => {
  const { user_id, content } = req.body;
  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [user_id, content],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al crear post");
      } else {
        res.send("Post creado con éxito!");
      }
    }
  );
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
