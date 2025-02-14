
## **E-Lib API**

E-Lib is a robust and scalable RESTful API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It provides user authentication and authorization to manage a collection of books. The API enforces strict authentication rules, ensuring that only registered and logged-in users can perform certain actions like creating, updating, and deleting books.

### **Key Features**
- **User Registration and Login:**
  - Users can register with their details and securely log in to access the API.
  - Passwords are hashed to ensure user security.

- **Authentication & Authorization:**
  - Token-based authentication (using JSON Web Tokens - JWT).
  - Only authenticated users can create, update, or delete books.

- **Book Management:**
  - **Create a Book:** Authenticated users can add books with details like title, author, cover image, etc.
  - **Update a Book:** Modify book details by ID (authentication required).
  - **Delete a Book:** Remove a book by ID (authentication required).
  - **List All Books:** Fetch a list of all books (accessible to everyone).
  - **Get a Single Book:** Retrieve detailed information about a specific book by its ID.

- **File Uploads:**
  - Upload book cover images and files using **Multer** for efficient file handling.

- **Built with TypeScript:**
  - Strongly-typed codebase for better maintainability and fewer runtime errors.

### **Technologies Used**
- **Node.js**: Backend runtime for building scalable applications.
- **Express.js**: Lightweight web framework for building the API.
- **MongoDB**: NoSQL database for storing user and book data.
- **TypeScript**: Provides type safety and code clarity.
- **JWT (JSON Web Tokens)**: Used for secure authentication and authorization.
- **Multer**: For handling file uploads (e.g., book cover images).

---

### **Authentication Workflow**
1. **Register:** A new user can register with their details.
2. **Login:** The user logs in to receive a JWT token.
3. **Authenticated Actions:**
   - Include the token in the `Authorization` header to create, update, or delete books.

---

### **Available Endpoints**
#### **Authentication**
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Login and get a JWT token.

#### **Book Management**
- `GET /api/books` - List all books.
- `GET /api/books/:bookId` - Get details of a specific book.
- `POST /api/books` - Create a new book (Authentication required).
- `PATCH /api/books/:bookId` - Update a book by ID (Authentication required).
- `DELETE /api/books/:bookId` - Delete a book by ID (Authentication required).

---

### **How to Run Locally**
1. Clone the repository:
   ```bash
   git clone
   cd elib-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
