# Library Backend

## 1. Project Description

This project corresponds to the **backend part** of an online library.  
It is developed in **Node.js** with **TypeScript**, following a strict **MVC architecture** and using **DTOs** for input and output validation.  
It includes modules to manage **Books, Authors, Categories, Publishers, Users, Loans, Histories, and Auth**, with documented and validated endpoints.  

Data persistence is handled through **Prisma ORM** connected to a database running in a **Docker container**.

---

## 2. Local Installation of the Backend Project

### 2.1 Clone the project

```bash
git clone https://github.com/DEVSAM1966/Biblioteca-code-cafe.git
cd Biblioteca-code-cafe
```

### 2.2 Backend Installation

Install the required dependencies `(Prisma requires Node.js  version 18.14 or higher)`:

```bash
npm install
```
Configure the environment variables in a `.env` file (port, DB connection, JWT_SECRET).  
This file is not included in the repository, so you must create it manually (for example, using Visual Studio Code).

The `.env` file should be placed in the `Biblioteca-code_cafe` directory and contain the following values:

```env
DATABASE_URL="mysql://root:picard@127.0.0.1:3307/biblio_code_cafe?sslmode=disabled"
JWT_SECRET=f06756f8d66b7f85619c0672eeca1cdd
SALT_ROUNDS=10
```
### 2.3 Docker Container Installation

Start the database container (Docker Desktop must be installed on Windows, or the equivalent for Linux):

```bash
docker-compose up
```
This will create the database service with the credentials defined in `docker-compose.yml`.

### 2.4 Prisma setup: generate client, create tables, and seed data

1. **Generate the Prisma client** 
```bash
npx prisma generate --schema=src/prisma/schema.prisma
```
2. **Create the database tables (no migrations)**
```bash
npx prisma db push --schema=src/prisma/schema.prisma
```
3. **Run the seed file to populate the tables**
```bash
npx prisma db seed --schema=src/prisma/schema.prisma
```
This will generate the tables and insert an initial dataset for testing.

Please review the import log to ensure everything was successful.  
If any issues occur, contact: **desarrollo.devsam@gmail.com**

---

## 3. Direct Access to the Docker Container (Database Verification)

To verify that the database is correctly set up, access the database container (make sure the Docker container is running).

From CMD or Linux terminal, execute:

```bash
docker exec -it biblio_mysql mysql -u root -p
```

The MySQL password is: **picard**

### 3.1 Tables Overview (Brief Description)

The project database contains the following tables/entities:

- **authors**: main authors.  
- **publishers**: publishers with contact details.  
- **categories**: thematic classification of books.  
- **books**: book metadata, main author (`author_id`), and optional co-authors.  
- **users**: registered users with roles (`USER`, `SUPPORT`, `ADMIN`).  
- **loans**: active and historical loans.  
- **histories**: user feedback on borrowed books.  

Next, we will execute a series of MySQL instructions to verify the correct import of the `biblio_code_cafe` database structure and the test data loaded through Prisma.

**Step 1 – Switch Schema**

```sql
use biblio_code_cafe;
```

It will return: `Database changed`

**Step 2 – Verify Tables in Schema**

```sql
show tables;
```

It will return:  
The list of tables contained in the `biblio_code_cafe` schema.  
These are:  
`authors, books, categories, histories, loans, publishers, users`

**Step 3 – Describe Tables**

```sql
desc authors;
desc books;
desc categories;
desc histories;
desc loans;
desc publishers;
desc users;
```

It will return:  
The list of fields, data types, and other values for each table.

**Step 4 – Query Tables to Check Data**  
(In the `histories` table no data was imported)

```sql
SELECT * FROM authors;
SELECT * FROM publishers;
SELECT * FROM categories;
SELECT * FROM books;
SELECT * FROM users;
SELECT * FROM loans;
```

It will return:  
The data that exists in these tables.
 
---

## Project Authors

- **Eze**
- **Sebastián Asunción**





