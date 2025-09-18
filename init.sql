CREATE TABLE authors (
    author_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name_author VARCHAR(100) NOT NULL
);
CREATE TABLE publishers (
    publisher_id BIGINT PRIMARY KEY,
    name_publisher VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(40),
    province VARCHAR(30),
    postal_code VARCHAR(20),
    country VARCHAR(30),
    phone VARCHAR(16),
    notes VARCHAR(255)
);
CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name_category VARCHAR(30) NOT NULL,
    subtopic_category VARCHAR(30)
);
CREATE TABLE books (
    isbn VARCHAR(13) PRIMARY KEY,
    title VARCHAR(55) NOT NULL,
    pages INT,
    summary VARCHAR(255),
    edition_date VARCHAR(10),
    book_cover VARCHAR(255),
    book_file VARCHAR(255),
    language VARCHAR(20),
    authors VARCHAR(100),
    author_id BIGINT,
    publisher_id BIGINT,
    category_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_surname VARCHAR(60),
    dni VARCHAR(20) UNIQUE,
    address VARCHAR(100),
    city VARCHAR(40),
    province VARCHAR(30),
    postal_code VARCHAR(20),
    country VARCHAR(30),
    phone VARCHAR(16),
    email VARCHAR(120),
    password VARCHAR(25),
    registration_date DATE,
    user_drop BOOLEAN DEFAULT TRUE,
    days_disciplinary INT DEFAULT 0,
    rol VARCHAR(20)
);
CREATE TABLE loans (
    loan_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_date DATE,
    return_date DATE,
    user_id BIGINT,
    isbn VARCHAR(13),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (isbn) REFERENCES books(isbn)
        ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE histories (
    history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT,
    date_feedback DATE,
    feedback VARCHAR(255),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO publishers (publisher_id, name_publisher, address, city, province, postal_code, country, phone, notes) VALUES
(1001, 'Nova Editorial', 'Calle Luna 12', 'Madrid', 'Madrid', '28001', 'España', '912345678', 'Activo'),
(1002, 'Ediciones Solaris', 'Av. Estelar 45', 'Barcelona', 'Cataluña', '08002', 'España', '934567890', 'Empresa cerrada en 2023'),
(1003, 'Tinta Libre', 'Plaza del Saber 3', 'Valencia', 'Valencia', '46001', 'España', '963258741', 'Activo');

INSERT INTO categories (name_category, subtopic_category) VALUES
('Ciencia Ficción', 'Viajes Espaciales'),
('Historia', 'Edad Media'),
('Tecnología', 'Programación'),
('Filosofía', 'Ética'),
('Literatura', 'Narrativa Contemporánea');

INSERT INTO users (user_name, user_surname, dni, address, city, province, postal_code, country, phone, email, password, registration_date, user_drop, days_disciplinary, rol) VALUES
('Laura', 'Gómez', '12345678A', 'Calle Sol 5', 'Madrid', 'Madrid', '28010', 'España', '611223344', 'laura@example.com', 'pass123', '2025-01-10', TRUE, 0,'user'),
('Carlos', 'Martínez', '87654321B', 'Av. Mar 8', 'Valencia', 'Valencia', '46020', 'España', '622334455', 'carlos@example.com', 'pass456', '2025-02-15', TRUE, 2,'user'),
('Marta', 'Ruiz', '11223344C', 'Calle Río 3', 'Sevilla', 'Andalucía', '41001', 'España', '633445566', 'marta@example.com', 'pass789', '2025-03-01', TRUE, 0,'admin'),
('Javier', 'López', '44332211D', 'Plaza Norte 7', 'Bilbao', 'País Vasco', '48001', 'España', '644556677', 'javier@example.com', 'pass321', '2025-04-20', TRUE, 1,'user'),
('Ana', 'Fernández', '99887766E', 'Av. Sur 9', 'Zaragoza', 'Aragón', '50001', 'España', '655667788', 'ana@example.com', 'pass654', '2025-05-05', TRUE, 0,'admin');

INSERT INTO authors (name_author) VALUES
('Isaac Asimov'),
('Ursula K. Le Guin'),
('Yuval Noah Harari'),
('Richard Stallman'),
('Immanuel Kant'),
('Margaret Atwood'),
('George Orwell'),
('Carl Sagan'),
('Jane Austen'),
('Arthur C. Clarke');

INSERT INTO books (isbn, title, pages, summary, edition_date, book_cover, book_file, language, authors, author_id, publisher_id, category_id) VALUES
('9780000000001', 'Fundación', 320, 'Saga galáctica sobre el conocimiento y el poder.', '01/01/2020', 'covers/fundacion.jpg', 'files/fundacion.pdf', 'Español', '', 1, 1001, 1),
('9780000000002', 'Los desposeídos', 280, 'Utopía anarquista en mundos gemelos.', '15/03/2019', 'covers/desposeidos.jpg', 'files/desposeidos.pdf', 'Español', '', 2, 1002, 1),
('9780000000003', 'Sapiens', 400, 'Historia de la humanidad desde sus orígenes.', '10/10/2018', 'covers/sapiens.jpg', 'files/sapiens.pdf', 'Español', '', 3, 1003, 2),
('9780000000004', 'Software Libre', 220, 'Manifiesto sobre libertad digital.', '05/06/2021', 'covers/softwarelibre.jpg', 'files/softwarelibre.pdf', 'Español', '', 4, 1001, 3),
('9780000000005', 'Crítica de la razón pura', 500, 'Obra filosófica fundamental.', '01/01/1781', 'covers/razonpura.jpg', 'files/razonpura.pdf', 'Español', '', 5, 1002, 4),
('9780000000006', 'El cuento de la criada', 310, 'Distopía feminista.', '12/12/2017', 'covers/criada.jpg', 'files/criada.pdf', 'Español', '', 6, 1003, 1),
('9780000000007', '1984', 328, 'Sociedad totalitaria y vigilancia extrema.', '08/06/1949', 'covers/1984.jpg', 'files/1984.pdf', 'Español', '', 7, 1001, 1),
('9780000000008', 'Cosmos', 420, 'Exploración del universo y la ciencia.', '01/01/1980', 'covers/cosmos.jpg', 'files/cosmos.pdf', 'Español', '', 8, 1002, 3),
('9780000000009', 'Orgullo y prejuicio', 279, 'Romance y crítica social.', '28/01/1813', 'covers/orgullo.jpg', 'files/orgullo.pdf', 'Español', '', 9, 1003, 5),
('9780000000010', 'Cita con Rama', 300, 'Encuentro con nave alienígena.', '01/01/1973', 'covers/rama.jpg', 'files/rama.pdf', 'Español', '', 10, 1001, 1),
('9780000000011', 'La revolución digital', 250, 'Impacto de la tecnología en la sociedad.', '01/01/2022', 'covers/revolucion.jpg', 'files/revolucion.pdf', 'Español', '', 4, 1003, 3),
('9780000000012', 'La ética', 270, 'Fundamentos de la moral racional.', '01/01/1797', 'covers/etica.jpg', 'files/etica.pdf', 'Español', '', 5, 1002, 4),
('9780000000013', 'La mano izquierda de la oscuridad', 290, 'Exploración de género y política.', '01/01/1969', 'covers/manoizq.jpg', 'files/manoizq.pdf', 'Español', '', 2, 1001, 1),
('9780000000014', 'Ensayo sobre la ceguera', 310, 'Metáfora sobre la sociedad moderna.', '01/01/1995', 'covers/ceguera.jpg', 'files/ceguera.pdf', 'Español', '', 7, 1002, 5),
('9780000000015', 'El origen de las especies', 502, 'Teoría de la evolución.', '01/01/1859', 'covers/origen.jpg', 'files/origen.pdf', 'Español', 'Sebastián Asunción', 8, 1003, 2);

INSERT INTO loans (loan_date, return_date, user_id, isbn) VALUES
('2025-06-01', '2025-06-15', 1, '9780000000001'),
('2025-06-02', '2025-06-16', 2, '9780000000002'),
('2025-06-03', '2025-06-17', 3, '9780000000003'),
('2025-06-04', '2025-06-18', 4, '9780000000004'),
('2025-06-05', '2025-06-19', 5, '9780000000005'),
('2025-06-06', '2025-06-20', 1, '9780000000006'),
('2025-06-07', '2025-06-21', 2, '9780000000007'),
('2025-06-08', '2025-06-22', 3, '9780000000008'),
('2025-06-09', '2025-06-23', 4, '9780000000009'),
('2025-06-10', '2025-06-24', 5, '9780000000010'),
('2025-06-11', '2025-06-25', 1, '9780000000011'),
('2025-06-12', '2025-06-26', 2, '9780000000012'),
('2025-06-13', '2025-06-27', 3, '9780000000013'),
('2025-06-14', '2025-06-28', 4, '9780000000014'),
('2025-06-15', '2025-06-29', 5, '9780000000015'),
('2025-09-01', NULL, 1, '9780000000001'),
('2025-09-02', NULL, 2, '9780000000002'),
('2025-09-03', NULL, 3, '9780000000003'),
('2025-09-04', NULL, 4, '9780000000004'),
('2025-09-05', NULL, 5, '9780000000005');

