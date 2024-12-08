# Data Storage

## Why Can't We Store Everything in a File?

- Files are good for storing **text**, but they aren't efficient for **photos, audio, or videos**.
- Storing binary data like images, audio, and videos in files makes it cumbersome and inefficient.
- **Databases** provide an efficient way to store and manage all types of data, including binary formats.

---

## **What is a Database?**

A **Database** is a system designed to store and manage data efficiently. It handles a variety of data types, such as:

- **Images**
- **Audio**
- **Video**
- Other binary formats

---

## **Types of Databases**

### **1. SQL Databases**

- **SQL databases** store data in a structured format, typically represented as **tables**.
- **Tables**: While we visualize data in tables, in reality, data is stored in a scattered manner. The structure of tables helps in understanding and managing the connections between different pieces of data.
- **Data Organization**: In SQL, the data is connected in a way that allows it to be easily queried and manipulated using **SQL queries**.

### **2. NoSQL Databases**

- **NoSQL databases** use **objects** instead of tables to store data.
- This approach is simpler and more flexible compared to the structured format of tables.
- **MongoDB**, a popular **NoSQL database**, is used extensively in modern applications, especially for handling complex data structures.

---

## **Why MongoDB for MERN Stack?**

- MongoDB uses the NoSQL model, making it easier to store and manage data as objects.
- It is highly flexible and scalable, ideal for modern applications that need to manage complex, hierarchical data.
- In the **MERN Stack** (MongoDB, Express, React, Node.js), MongoDB serves as the database layer, providing seamless integration with JavaScript-based technologies.

---

# **Server Terminologies**

## **What is a Server?**

A **server** is a system that provides services or resources to other computers (called **clients**) over a network. It can store, manage, and process data, and handle various requests made by the clients.

### **Types of Servers**

1. **File Server**:
   - A **file server** is a system that stores and manages files that can be accessed by other computers over a network.
   - Clients (other computers) can send requests to the file server to retrieve or store files, such as documents, photos, videos, etc.
2. **Game Server**:
   - A **game server** is responsible for hosting and managing multiplayer game environments.
   - **Clients** in a game server are the **players** interacting with the game.
   - **Request-Response Flow**:
     - Players (clients) send requests to the server when they perform actions (e.g., moving their character, shooting, or interacting with the game world).
     - The server processes these requests, updates the game world, and sends responses back to the clients, synchronizing the game state for all players.
   - The server ensures that all players are seeing and interacting with the same game world and prevents cheating by handling all the game logic.
3. **Web Server**:
   -Just like a waiter brings you food, a web server sends you websites when you enter an address like google.com
4. **Database Server** :
   -Think of it as a digital librarian who helps you find specific information from a big collection of data.

---

### **Types of servers in the backend **

1.  **Application server** :

- an application server does everything that is not related to a data base server in request response cycle
- ie `handling routes` , `accepting the requests` and all is handled by the application layer

2.  **database server** :

- whenever the application layer sends a request to the database layer requesting something it gives the corresponding response

### **Terminologies in Databases:**

## 1. **Database**:

A **database** is like a container where you store your data. It can contain multiple collections.
In this case, the database could be called `Bookstore`.

## 2. **Collection**:

A **collection** is a grouping of related data. It's like a table in SQL but more flexible.
Inside the `Bookstore` database, you might have a collection called `Books`, where all the information about the books in the store is stored.

## 3. **Document**:

A **document** is an individual record inside a collection. It's like a row in a table but is more flexible, as it can store different types of data (e.g., numbers, text, arrays, and more).
A document in the `Books` collection might represent a single book, with various fields like `title`, `author`, `price`, etc.

 ## table showing the relation between code part and  the theory part
| Code            | Theory              |
|-----------------|---------------------|
| Connect Mongoose| Create a database   |
| Create a model  | Create a collection |
| Create (Code)   | Document creation   |


---

