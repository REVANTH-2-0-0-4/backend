# Notes

## Key Points from the Discussion

### 1. **APIs vs. Direct Server Access**
- **Direct Server Access:**
  - Accessing a server directly involves connecting to its IP or URL, usually for retrieving raw resources or data.
  - Example:
    ```javascript
    fetch("http://localhost:3000/data")
    .then(res => res.json())
    .then(data => console.log(data));
    ```

- **API-Based Access:**
  - APIs act as intermediaries, providing controlled access to server resources via predefined endpoints.
  - Example:
    ```javascript
    app.use((req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
      }
      next();
    });

    app.get("/data", (req, res) => {
      res.send({ key: "value" });
    });
    ```

### 2. **Role of Middleware**
- Middleware functions intercept requests and responses to:
  - Verify tokens (e.g., JWT).
  - Check permissions.
  - Modify request/response objects.
- Middleware is not the API itself but enhances security and functionality.

### 3. **What is an API?**
- APIs (Application Programming Interfaces):
  - Allow communication between software components.
  - Provide controlled access to server resources.
- Examples:
  - REST APIs, GraphQL APIs.

### 4. **Why Use APIs?**
- APIs control and structure access to server resources, providing:
  - Security: Authentication and authorization.
  - Scalability: Handling multiple clients efficiently.
  - Flexibility: Exposing only specific endpoints.

### 5. **Authentication in APIs vs. Websites**
- Websites often use sessions or cookies for implicit authentication (e.g., `google.com`).
- APIs require explicit authentication like API keys or tokens.

### 6. **API Key**
- A unique identifier for authenticating requests to an API.
- Used to:
  - Identify the client.
  - Enforce rate limits.
  - Track usage.

### 7. **Public Websites vs. APIs**
- **Public Websites:**
  - Can be accessed without explicit authentication (e.g., `google.com`).
  - Use cookies for session management.
- **APIs:**
  - Require explicit credentials.
  - Provide programmatic access to data or services.

### 8. **Creating an API**
- Define routes and logic in your server code.
- Example:
  ```javascript
  const express = require("express");
  const app = express();

  // Middleware
  app.use((req, res, next) => {
    console.log("Middleware running");
    next();
  });

  // API Route
  app.get("/api/data", (req, res) => {
    res.json({ message: "API is working" });
  });

  app.listen(3000, () => console.log("Server running"));
  ```

### 9. **How Many APIs Can a Server Have?**
- A server can have multiple APIs, each serving different purposes or clients.

### 10. **Who Creates APIs?**
- APIs are created manually by developers, tailored to the application's needs.
- They are not automatically generated.

### 11. **Google.com vs. APIs**
- Typing `google.com` in a browser accesses a web application, not an API directly.
- APIs might run in the background to fetch dynamic data.
- Authentication (e.g., cookies) is handled implicitly by the browser.

---

### 12. **URL vs. URI**
- **URL (Uniform Resource Locator):**
  - Specifies the location of a resource on the internet.
  - Example: `https://www.example.com/path/to/resource`.
  - Includes the protocol (e.g., HTTP/HTTPS) and domain name.

- **URI (Uniform Resource Identifier):**
  - Includes both the location and additional identifiers for the resource.
  - Example: `https://www.example.com/path/to/resource?query=123`.

- **Key Difference:**
  - A URL is always a URI, but a URI is not always a URL. The URI provides additional details like query strings.

### 13. **DNS (Domain Name System)**
- DNS translates domain names (e.g., `google.com`) into IP addresses.
- Process:
  - User enters `google.com`.
  - Browser queries DNS server to get the corresponding IP address.
  - The browser connects to the server using the IP address.

### 14. **Environment Variables**
- Store configuration details outside the source code.
- Benefits:
  - Prevent exposing sensitive data.
  - Facilitate easy changes without redeployment.

### 15. **Config Package**
- Provides structured access to environment-based configurations.
- Benefits:
  - Avoids hardcoding sensitive details like database URIs.
  - Supports environment-specific configurations (development, production, testing).

### 16. **Why Use MongoDB URI?**
- URI provides a way to define connection strings, including credentials and configurations.
- Example:
  ```javascript
  const mongoose = require("mongoose");
  mongoose.connect("mongodb+srv://user:password@cluster0.mongodb.net/mydb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));
  ```

- **Advantages:**
  - Centralized configuration.
  - Enables easy switching between databases.

### 17. **Scalability Issues**
- Causes:
  - High user traffic exceeding server capacity.
  - Insufficient database performance.
  - Resource bottlenecks (e.g., storage, memory).

- Solutions:
  - Load balancing.
  - Horizontal scaling (adding more servers).
  - Efficient database design.
  - Using cloud services.

### 18. **MongoDB Data Transfer (mongodump/mongorestore)**
- Use tools like `mongodump` to back up data and `mongorestore` to migrate it.
- Example:
  ```bash
  mongodump --uri mongodb://old-db-uri --out ./backup
  mongorestore --uri mongodb://new-db-uri ./backup
  ```

### 19. **Promises in JavaScript**
- Represent asynchronous operations.
- States:
  - Pending.
  - Fulfilled (resolved).
  - Rejected.

- Example:
  ```javascript
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success"), 1000);
  });

  myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));
  ```

### 20. **What is an Environment?**
- Represents the state in which a software application operates.
- Types:
  - Development: For building and testing.
  - Testing: For validating features.
  - Production: For end-user access.

---
# Checking Port Usage Commands

## Windows Command
```cmd
netstat -ano | findstr :27017
```

### Command Breakdown
- **netstat**: Base command for network statistics
- **Flags (-ano)**:
  - `-a`: Shows all active connections
  - `-n`: Displays addresses and port numbers numerically
  - `-o`: Shows process ID (PID)
- **|**: Pipe operator to forward output
- **findstr :27017**: Filters for lines containing ":27017"


These commands help identify processes using port 27017, which is MongoDB's default port.
### Reference Link 
[complete-info](https://chatgpt.com/share/6763b197-7e84-8008-be8c-ff37023dcd86)