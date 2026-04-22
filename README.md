# LedgerCore => (Secure Transaction & Ledger Management System)

A powerful **backend-driven financial transaction system** built using **Node.js, Express, and MongoDB**, designed to manage **account-based transactions with a complete audit trail (ledger system)**.

This project demonstrates how real-world financial systems handle **transaction tracking, sender-receiver relationships, and secure data flow** using **modular architecture and industry-standard backend practices**.

---

## Overview =>

LedgerCore is a backend system that simulates a **core banking transaction engine**, responsible for managing:

* User authentication
* Account management
* Transaction processing
* Ledger (audit trail) tracking

It leverages :-

* **JWT Authentication** for secure user access
* **MongoDB (Mongoose)** for structured financial data storage
* **Ledger Model** to maintain a **complete audit trail of transactions**
* **Express.js** for scalable REST API design
* **Middleware-based security** for protected routes

It solves a key problem in backend systems :-

> *Maintaining consistent, traceable, and secure financial transactions between multiple entities*

LedgerCore ensures that **every transaction is recorded, traceable, and securely processed**.

---

## Features =>

* Secure JWT-based authentication system
* Account creation and management
* Balance tracking per account
* Transaction processing between accounts
* System-generated transactions (initial fund injection)
* Ledger system for complete audit trail
* Sender & receiver tracking for each transaction
* Password hashing using bcrypt
* Protected routes using authentication middleware
* Token blacklisting (logout security)
* Modular MVC backend architecture
* Scalable API design

---

## Project Architecture =>

```
Client (Postman / Frontend)
        ↓
HTTP Request (Auth / Account / Transaction APIs)
        ↓
Express Server
        ↓
Routes → Controllers
        ↓
Business Logic (Transaction Processing)
        ↓
Authentication Middleware (JWT Verification)
        ↓
Database Layer (MongoDB via Mongoose)
        ↓
Models:
   - User
   - Account
   - Transaction
   - Ledger (Audit Trail)
   - Blacklist (Token Security)
        ↓
Response (JSON Data)
```

---

## Tech Stack =>

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| Node.js        | Runtime environment       |
| Express.js     | Backend framework         |
| MongoDB        | Database                  |
| Mongoose       | ODM for MongoDB           |
| JSON Web Token | Authentication mechanism  |
| bcryptjs       | Password hashing          |
| cookie-parser  | Cookie handling           |
| dotenv         | Environment configuration |

---

## Installation & Setup =>

```bash
# Clone the repository
git clone https://github.com/Akshay-Deshmane/Ledgercore.git

# Navigate to project directory
cd ledgercore
```

---

### Setup Environment Variables =>

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### Run the Server =>

```bash
npm install
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## Workflow Of LedgerCore =>

### 1. User Registration :-

* User provides credentials
* Password is hashed using bcrypt
* User stored in database

---

### 2. User Login :-

* User authenticates using credentials
* JWT token is generated
* Token used for accessing protected APIs

---

### 3. Account Creation :-

* User creates a financial account
* Account linked to user ID
* Used for sending/receiving transactions

---

### 4. Transaction Processing :-

* Sender initiates transaction
* Receiver account is identified
* System validates:

  * Sender authentication
  * Account existence
* Transaction is created and stored

---

### 5. System Initial Funds :-

* Special system-level route injects funds
* Used to simulate **bank/system credit transactions**
* Demonstrates **real-world financial system behavior**

---

### 6. Ledger Entry Creation :-

* Every transaction generates a **ledger entry**
* Stores:

  * Sender details
  * Receiver details
  * Transaction metadata
* Ensures **complete audit trail & traceability**

---

### 7. Balance Tracking :-

* Each account has balance tracking
* Balance can be fetched via API
* Ensures visibility of financial state

---

### 8. Access Protected Routes :-

```js
Authorization: Bearer <JWT_TOKEN>
```

* Middleware verifies token
* Grants access to secured endpoints

---

### 9. Logout & Security :-

* Token added to blacklist
* Prevents reuse of invalidated tokens

---

## API Endpoints =>

### Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/logout   | Logout user   |

---

### Account Routes (Protected)

| Method | Endpoint                         | Description         |
| ------ | -------------------------------- | ------------------- |
| POST   | /api/accounts/                   | Create account      |
| GET    | /api/accounts/                   | Get user accounts   |
| GET    | /api/accounts/balance/:accountId | Get account balance |

---

### Transaction Routes (Protected)

| Method | Endpoint                              | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| POST   | /api/transaction/                     | Create transaction              |
| POST   | /api/transaction/system/initial-funds | System-generated fund injection |

---

## Key Engineering Concepts =>

### 1. Ledger System (Audit Trail) :-

* Every transaction is recorded in a separate ledger collection
* Ensures:

  * Traceability
  * Transparency
  * Historical tracking

---

### 2. Transaction Integrity :-

* Maintains sender & receiver mapping
* Ensures structured transaction records
* Simulates real banking transaction flow

---

### 3. Authentication & Security :-

* JWT-based authentication
* Password hashing using bcrypt
* Token blacklisting for logout security

---

### 4. Modular Backend Architecture :-

* Separation of concerns:

  * Routes → Controllers → Models
* Improves scalability and maintainability

---

### 5. System-Level Transaction Handling :-

* Supports **system-generated transactions**
* Simulates real banking scenarios like:

  * Initial account funding
  * Internal system credits

---

## Project Structure =>

```
LedgerCore/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── account.models.js
│   │   ├── transaction.models.js
│   │   ├── ledger.models.js
│   │   └── blackList.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Example Usage =>

```
POST /api/transaction/

Request:
{
  "senderAccountId": "123",
  "receiverAccountId": "456",
  "amount": 500
}

Response:
{
  "message": "Transaction successful",
  "transactionId": "txn_789"
}
```

---

## Limitations Of LedgerCore =>

* No concurrency control (race condition handling not implemented)
* No transaction rollback (ACID properties not fully enforced)
* No rate limiting (API abuse protection missing)
* No role-based access control (RBAC)
* No real payment gateway integration

---

## Future Enhancements / Future Scope =>

* ACID-compliant transaction handling (MongoDB sessions)
* Concurrency control & locking mechanisms
* Role-Based Access Control (RBAC)
* Real-time transaction notifications
* React-based dashboard UI
* Integration with payment gateways (Stripe/Razorpay)
* Rate limiting & API security enhancements
* Microservices-based architecture
* Docker & cloud deployment (AWS/GCP)

---
