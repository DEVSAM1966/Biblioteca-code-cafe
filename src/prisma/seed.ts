import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Publishers
  await prisma.publisher.createMany({
    data: [
      {
        publisher_id: 1001,
        name_publisher: "Nova Editorial",
        address: "Calle Luna 12",
        city: "Madrid",
        province: "Madrid",
        postal_code: "28001",
        country: "España",
        phone: "912345678",
        notes: "Activo",
      },
      {
        publisher_id: 1002,
        name_publisher: "Ediciones Solaris",
        address: "Av. Estelar 45",
        city: "Barcelona",
        province: "Cataluña",
        postal_code: "08002",
        country: "España",
        phone: "934567890",
        notes: "Empresa cerrada en 2023",
      },
      {
        publisher_id: 1003,
        name_publisher: "Tinta Libre",
        address: "Plaza del Saber 3",
        city: "Valencia",
        province: "Valencia",
        postal_code: "46001",
        country: "España",
        phone: "963258741",
        notes: "Activo",
      },
    ],
  });

  // Categories
  await prisma.category.createMany({
    data: [
      {
        name_category: "Ciencia Ficción",
        subtopic_category: "Viajes Espaciales",
      },
      { name_category: "Historia", subtopic_category: "Edad Media" },
      { name_category: "Tecnología", subtopic_category: "Programación" },
      { name_category: "Filosofía", subtopic_category: "Ética" },
      {
        name_category: "Literatura",
        subtopic_category: "Narrativa Contemporánea",
      },
    ],
  });

  // Users
  await prisma.user.createMany({
    data: [
      {
        user_name: "Laura",
        user_surname: "Gómez",
        dni: "12345678A",
        address: "Calle Sol 5",
        city: "Madrid",
        province: "Madrid",
        postal_code: "28010",
        country: "España",
        phone: "611223344",
        email: "laura@example.com",
        password: "pass123",
        registration_date: new Date("2025-01-10"),
        user_drop: true,
        days_disciplinary: 0,
        rol: "user",
      },
      {
        user_name: "Carlos",
        user_surname: "Martínez",
        dni: "87654321B",
        address: "Av. Mar 8",
        city: "Valencia",
        province: "Valencia",
        postal_code: "46020",
        country: "España",
        phone: "622334455",
        email: "carlos@example.com",
        password: "pass456",
        registration_date: new Date("2025-02-15"),
        user_drop: true,
        days_disciplinary: 2,
        rol: "user",
      },
      // ... resto de usuarios
    ],
  });

  // Authors
  await prisma.author.createMany({
    data: [
      { name_author: "Isaac Asimov" },
      { name_author: "Ursula K. Le Guin" },
      { name_author: "Yuval Noah Harari" },
      { name_author: "Richard Stallman" },
      { name_author: "Immanuel Kant" },
      { name_author: "Margaret Atwood" },
      { name_author: "George Orwell" },
      { name_author: "Carl Sagan" },
      { name_author: "Jane Austen" },
      { name_author: "Arthur C. Clarke" },
    ],
  });

  // Books
  await prisma.book.createMany({
    data: [
      {
        isbn: "9780000000001",
        title: "Fundación",
        pages: 320,
        summary: "Saga galáctica sobre el conocimiento y el poder.",
        edition_date: "01/01/2020",
        book_cover: "covers/fundacion.jpg",
        book_file: "files/fundacion.pdf",
        language: "Español",
        author_id: 1,
        publisher_id: 1001,
        category_id: 1,
      },
      {
        isbn: "9780000000002",
        title: "Los desposeídos",
        pages: 280,
        summary: "Utopía anarquista en mundos gemelos.",
        edition_date: "15/03/2019",
        book_cover: "covers/desposeidos.jpg",
        book_file: "files/desposeidos.pdf",
        language: "Español",
        author_id: 2,
        publisher_id: 1002,
        category_id: 1,
      },
      // ... resto de libros
    ],
  });

  // Loans
  await prisma.loan.createMany({
    data: [
      {
        loan_date: new Date("2025-06-01"),
        return_date: new Date("2025-06-15"),
        user_id: 1,
        isbn: "9780000000001",
      },
      {
        loan_date: new Date("2025-06-02"),
        return_date: new Date("2025-06-16"),
        user_id: 2,
        isbn: "9780000000002",
      },
      // ... resto de préstamos
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed ejecutado correctamente");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
