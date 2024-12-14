
# **Notes: Cookies, Sessions, and Tokens**

---

## **Cookies**

### What is a Cookie?  
- A **cookie** is a small piece of data sent from a server and stored on the client's browser.  
- Cookies are used to store information specific to a user while they interact with a website.  
- They are sent with requests to the server along with other headers to maintain state or carry user-specific data.

### Types of Cookies:
1. **Session Cookies**:  
   - Temporary cookies stored only during a user's session and deleted once the browser is closed.
   
2. **Persistent Cookies**:  
   - Stored on the client and have an expiration date after which they are deleted.

### Security Features:
- **Secure Flag**: Ensures cookies are only sent over HTTPS.
- **HttpOnly Flag**: Prevents client-side scripts from accessing cookies, reducing XSS attacks.
- **SameSite Flag**: Restricts cookies from being sent with cross-site requests, minimizing CSRF risks.

---

## **Sessions**

### What is a Session?  
- A **session** is a way to maintain a user's state and interaction with a website across multiple requests.  
- It uses a unique **session ID** or token to track the user’s session.

### How does a Session Work?
1. Upon user login, a **session ID** is created and sent to the client.
2. The client sends this **session ID** in subsequent requests.
3. The server uses the session ID to retrieve and maintain the user’s session data.

### Session ID:
- Generated randomly.
- Stored either in a cookie or in the backend session storage.

---

## **Tokens**

### What is a Token?  
- A **token** is a secure piece of data used for authentication and authorization.  
- It typically contains encoded information like user identity, roles, and permissions.

### Types of Tokens:
1. **JSON Web Token (JWT)**:  
   - A self-contained JSON object used for secure transmission of information.  
   - Contains a header, payload, and signature.

2. **CSRF Token**:  
   - A unique token sent with requests to prevent Cross-Site Request Forgery (CSRF) attacks.

### How Tokens are Used:
- Tokens are passed to the server in requests to verify a user's identity or perform actions.
- Can be used instead of session IDs for stateless authentication.

### Key Differences between Tokens and Cookies:
- **Storage**:  
  - Cookies are stored on the client (browser), whereas tokens are often stored in the request headers.
- **Purpose**:  
  - Cookies store data that can be specific to the user's session (e.g., session IDs, preferences), while tokens are primarily used for authentication and authorization purposes.
- **Security**:  
  - Tokens can include sensitive data encoded and encrypted, while cookies may have various security mechanisms (Secure, HttpOnly, SameSite).

---

## **Security Using Cookies and Tokens**

### **Cookies for Security**:
- **CSRF Protection**:  
  - CSRF cookies are used to store tokens that validate requests to prevent unauthorized actions.
  
- **Preventing XSS and Session Hijacking**:
  - Secure cookies with HttpOnly and Secure flags help prevent XSS attacks and session hijacking.

### **Tokens for Security**:
- Used in stateless authentication systems like OAuth or JWT for secure transmission of user information without relying on server-side storage.

---

### Example Use Cases:

- **Session**: `Set-Cookie: session_id=abc123; HttpOnly; Secure;`
- **Token**: `Authorization: Bearer abcdef.ghijklmnopqrstuvwxyz`

---

## **Key Differences Between Cookies, Sessions, and Tokens**

### 1. **Storage**

- **Cookies**: Stored in the user's browser. Can contain small amounts of data (e.g., session ID, preferences).
  
- **Sessions**: Stored either in the server or in the browser (as session cookies or session storage), but not persistently.
  
- **Tokens**: Passed along with requests and generally do not rely on storage in either the browser or server; mostly ephemeral.

---

### 2. **Security**

- **Cookies**:  
  - Can be protected with security flags (`Secure`, `HttpOnly`, `SameSite`).

- **Sessions**:  
  - Similar security features can be implemented for protecting session IDs.
  
- **Tokens**:  
  - Secure due to encryption and encoding (especially with JWTs), providing stronger security than cookies or sessions alone.

---

### 3. **Purpose**

- **Cookies**: Used for user-specific data, preferences, and state management.

- **Sessions**: Provide temporary identification during a browsing session for remembering state.

- **Tokens**: Primarily used for authentication and authorization, ensuring only authorized users can perform actions.

---

## **4. How Tokens are Used for Security**

### Using Tokens for Authorization:

- Tokens are often used in APIs or OAuth systems.  
- Example: A server receives a token with a request. The server decodes and checks if the token is valid (contains valid user data and permissions) before processing the request.

---

---

### Additional Resources:
- [Cookie and Session Basics](https://chatgpt.com/share/675ce59a-aae0-8008-94a5-f116acb456ce)

---
