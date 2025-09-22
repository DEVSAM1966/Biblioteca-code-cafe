# 📚 Biblioteca Code Café – Entorno MySQL con Docker

Este proyecto proporciona un entorno Docker para levantar una base de datos MySQL 8.0 con estructura relacional y datos iniciales, orientado a una aplicación de gestión bibliotecaria.

---

## 🚀 Despliegue rápido

### 1. Clonar el repositorio

git clone https://github.com/cocoliso1966/Biblioteca-code-cafe.git
cd biblioteca-code-cafe

npm install

### 2. Levantar el contenedor

docker-compose up

Para evitar problemas con MySQL en local, este contenedor escucha por el puerto 3307.

### 3. Acceder a la BD desde MySQL

docker exec -it biblio_mysql mysql -u root -p
# Contraseña: picard

use biblio-code-cafe;


### 4. Estructura de la BD y juego de datos.

El fichero schema.prisma recrea las tablas y juego de datos:

    authors: autores principales.

    publishers: editoriales con datos de contacto.

    categories: clasificación temática de libros.

    books: libros con metadatos, autor principal (author_id) y coautores opcionales (authors).

    users: usuarios registrados con roles (user, admin).

    loans: préstamos activos e históricos.

    histories: retroalimentación de préstamos.

Incluye relaciones entre libros, autores, editoriales, categorías y usuarios, con claves foráneas y restricciones de integridad.
