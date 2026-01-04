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

To verify that the database is correctly set up, access the database 
container (make sure the Docker container is running).

### 3.1 Access to Docker Container
From CMD or Linux terminal, execute:

```bash
docker exec -it biblio_mysql mysql -u root -p
```

The MySQL password is: **picard**

### 3.2 Tables Overview (Brief Description)

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

## 4. Steps to Run the Application Correctly

### 4.1 Creating the Directories to Store Covers and Books

From the Visual Studio Code IDE, inside the project folder **BIBLIOTECA-CODE-CAFE**, create a folder named **uploads**, and inside this directory create the following subdirectories:

- **cover**
- **file**

The purpose of **uploads/cover** is to store the book covers in JPEG format, and **uploads/file** will store the PDF files of the books.

The **.gitignore** file explicitly excludes the **uploads/** folder so that it is not uploaded to the GitHub repository, preventing issues with the 100 MB file upload limit.

### 4.2 Starting the Application

From a Linux terminal or Windows CMD, navigate to the **Biblioteca-code-cafe** project directory and run the following command (with BD active):

```bash
npm run dev
```


If everything is correct, the following messages will appear in the console:

```bash
> biblioteca-code-cafe@1.0.0 dev
> ts-node-dev --respawn --transpile-only src/app.ts

[INFO] 17:36:49 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.9.2)
🖖 Server available on http://localhost:9800
🖖 Documentation available on http://localhost:9800/documentation
```

### 4.3 Creating a User with the ADMIN Role

For security reasons, the application only creates users with the USER role by default. To create a user with a known email and password — for example, using Postman — we will manually register one.

In Postman, set the HTTP method to **POST** and use the following URL: http://localhost:9800/auth/register

Use the following JSON body as an example:

```json
{
    "dni": "12345432A",
    "address": "Calle Percebe, 13; bajos",
    "city": "Barcelona",
    "province": "Barcelona",
    "postalCode": "08041",
    "country": "España",
    "phone": "+34633666741",
    "email": "xavier@gmail.com",
    "password": "XAVIERxavier123!",
    "fullname": "XAVIER A. M."
}
```
If everything goes well, the backend will return to Postman the fields **fullname**, **registrationDate**, **role**, **userId**, **userDrop**, and also the **authorization** field (an important field that contains the session token, valid for one hour).

Now we will change this user's role in the database. To do so, follow the instructions described in sections **3.1** and **3.2**, step **1**.

Execute this DML instruction from the database:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE fullname = 'XAVIER A. M.';
```

With the user **Xavier A. M.**, you will have full control of the application and will be able to execute any HTTP verb within it (GET, POST, PUT, DELETE).


### 4.4 Obtaining a New Token

If the token expires, we can obtain a new one from Postman by using the **HTTP POST** method and the following URL:


Use the following JSON body (following the previous example):

```json
{
    "email": "xavier@gmail.com",
    "password": "XAVIERxavier123!"
}
```

With this, we obtain another token, contained in the **authorization** field.  
In Postman, go to the **Auth** tab and select the **Bearer Token** option.  
Then, in the **Token** field, paste the value returned in the **authorization** field from the previous request to:  http://localhost:9800/auth/login

To understand how the different endpoints work, you can refer to:

- http://localhost:9800/documentation 
 
- https://github.com/DEVSAM1966/Biblioteca-code-cafe/wiki/Endpoint-and-Data-Sets

---

## Project Authors

- **Eze**
- **Sebastián Asunción**





