import { prisma } from '../configuration/prisma.configuration'
import { UserRole } from '@prisma/client'

async function main() {
  await prisma.loan.deleteMany()
  await prisma.book.deleteMany()
  await prisma.author.deleteMany()
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  await prisma.publisher.deleteMany()

  // Publishers
  await prisma.publisher.createMany({
    data: [
      {
        publisherId: 1001,
        namePublisher: 'Nova Editorial',
        address: 'Calle Luna 12',
        city: 'Madrid',
        province: 'Madrid',
        postalCode: '28001',
        country: 'España',
        phone: '912345678',
        notes: 'Activo',
      },
      {
        publisherId: 1002,
        namePublisher: 'Ediciones Solaris',
        address: 'Av. Estelar 45',
        city: 'Barcelona',
        province: 'Cataluña',
        postalCode: '08002',
        country: 'España',
        phone: '934567890',
        notes: 'Empresa cerrada en 2023',
      },
      {
        publisherId: 1003,
        namePublisher: 'Tinta Libre',
        address: 'Plaza del Saber 3',
        city: 'Valencia',
        province: 'Valencia',
        postalCode: '46001',
        country: 'España',
        phone: '963258741',
        notes: 'Activo',
      },
    ],
  })

  // Categories
  await prisma.category.createMany({
    data: [
      {
        categoryId: 1,
        nameCategory: 'Ciencia Ficción',
        subtopicCategory: 'Viajes Espaciales',
      },
      {
        categoryId: 2,
        nameCategory: 'Historia',
        subtopicCategory: 'Edad Media',
      },
      {
        categoryId: 3,
        nameCategory: 'Tecnología',
        subtopicCategory: 'Programación',
      },
      {
        categoryId: 4,
        nameCategory: 'Filosofía',
        subtopicCategory: 'Ética',
      },
      {
        categoryId: 5,
        nameCategory: 'Literatura',
        subtopicCategory: 'Narrativa Contemporánea',
      },
    ],
  })

  // Users
  await prisma.user.createMany({
    data: [
      {
        userId: 1,
        fullname: 'Laura Gómez',
        dni: '12345678A',
        address: 'Calle Sol 5',
        city: 'Madrid',
        province: 'Madrid',
        postalCode: '28010',
        country: 'España',
        phone: '611223344',
        email: 'laura@example.com',
        password: 'PassWord-123',
        registrationDate: new Date('2025-01-10'),
        userDrop: false,
        daysDisciplinary: 0,
        role: UserRole.USER,
      },
      {
        userId: 2,
        fullname: 'Carlos Martínez',
        dni: '87654321B',
        address: 'Av. Mar 8',
        city: 'Valencia',
        province: 'Valencia',
        postalCode: '46020',
        country: 'España',
        phone: '622334455',
        email: 'carlos@example.com',
        password: 'PassWord-456',
        registrationDate: new Date('2025-02-15'),
        userDrop: false,
        daysDisciplinary: 2,
        role: UserRole.ADMIN,
      },
      {
        userId: 3,
        fullname: 'Cristina López',
        dni: '36341178S',
        address: 'Avenida Castel, 10; 2ºB',
        city: 'Vinaroz',
        province: 'Castellon',
        postalCode: '12500',
        country: 'España',
        phone: '771223304',
        email: 'cristina@example.com',
        password: 'PassWord-789',
        registrationDate: new Date('2025-11-08'),
        userDrop: false,
        daysDisciplinary: 0,
        role: UserRole.SUPPORT,
      },
    ],
  })

  // Authors
  await prisma.author.createMany({
    data: [
      { authorId: 1, nameAuthor: 'Isaac Asimov' },
      { authorId: 2, nameAuthor: 'Ursula K. Le Guin' },
      { authorId: 3, nameAuthor: 'Yuval Noah Harari' },
      { authorId: 4, nameAuthor: 'Richard Stallman' },
      { authorId: 5, nameAuthor: 'Immanuel Kant' },
      { authorId: 6, nameAuthor: 'Margaret Atwood' },
      { authorId: 7, nameAuthor: 'George Orwell' },
      { authorId: 8, nameAuthor: 'Carl Sagan' },
      { authorId: 9, nameAuthor: 'Jane Austen' },
      { authorId: 10, nameAuthor: 'Arthur C. Clarke' },
    ],
  })

  // Books
  await prisma.book.createMany({
    data: [
      {
        isbn: '9780000000001',
        title: 'Fundación',
        pages: 320,
        summary: 'Saga galáctica sobre el conocimiento y el poder.',
        editionDate: new Date('2020-01-01').toISOString(),
        bookCover: 'uploads/cover/9780000000001_Foundation.jpg',
        bookFile: 'uploads/file/9780000000001_Foundation.PDF',
        language: 'Español',
        authorId: 1,
        publisherId: 1001,
        categoryId: 1,
      },
      {
        isbn: '9780000000002',
        title: 'Los desposeídos',
        pages: 280,
        summary: 'Utopía anarquista en mundos gemelos.',
        editionDate: new Date('2019-03-15').toISOString(),
        bookCover: 'uploads/cover/9780000000002_Los-deposeidos.jpg',
        bookFile: 'uploads/file/9780000000002_Los-desposeidos.pdf',
        language: 'Español',
        authorId: 2,
        publisherId: 1002,
        categoryId: 1,
      },
    ],
  })

  // Loans
  await prisma.loan.createMany({
    data: [
      {
        loanDate: new Date('2025-06-01'),
        returnDate: new Date('2025-06-15'),
        userId: 1,
        isbn: '9780000000001',
      },
      {
        loanDate: new Date('2025-06-02'),
        returnDate: new Date('2025-06-16'),
        userId: 2,
        isbn: '9780000000002',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
