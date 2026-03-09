# Banking System Backend API

This project implements a robust financial architecture featuring user authentication, account management, and fund transfers. It ensures transaction integrity and consistency through a **ledger-based architecture** and **atomic MongoDB transactions**.

---

## Overview

The API simulates a core banking backend service designed for reliability and security. Key architectural highlights include:
* **MVC Pattern:** Modular structure with clear separation of concerns.
* **Ledger-based Accounting:** Balances are derived from immutable transaction logs rather than a single "balance" field, ensuring auditability.
* **Atomicity:** Uses MongoDB sessions/transactions to ensure "all-or-nothing" transfers.
* **Idempotency:** Prevents duplicate processing of the same transaction request.

---

##  Key Features

### Authentication & Security
* **JWT-based Auth:** Secure user registration and login.
* **Token Blacklisting:** Handles secure logouts by invalidating tokens.
* **Password Hashing:** Uses `bcryptjs` for protecting user credentials.
* **Cookie-based sessions:** Enhanced security for web-based clients via `cookie-parser`.

### Account Management
* **Multi-Account Support:** Users can create and manage multiple bank accounts.
* **Status Lifecycle:** Accounts transition between `ACTIVE`, `FROZEN`, and `CLOSED`.
* **Real-time Balance:** Accurate balance calculation based on ledger history.

### Transactions & Ledger
* **Atomic Transfers:** Ensures funds are never lost between accounts during a transfer.
* **Immutable Ledger:** Every credit and debit is recorded permanently to prevent fraud.
* **Calculation Logic:** `Balance = Σ(Credits) - Σ(Debits)`
* **System Funding:** Protected endpoints for initial system liquidity.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB & Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT) & bcryptjs |
| **Dev Tools** | Nodemon, Dotenv, Postman |

---

## Project Structure (file structure)

```text
src
├── config         # Database & environment configurations
├── controllers    # Request handling logic (Auth, Account, Transaction)
├── middleware     # Auth guards and error handling
├── models         # Mongoose schemas (User, Account, Transaction, Ledger, Blacklist)
├── routes         # API endpoint definitions
├── app.js         # Express app initialization
└── server.js      # Server entry point


-> API EndpointsAuthentication :-

Method    Endpoint             Description
POST      /api/auth/register   Register a new user
POST      /api/auth/login      Login and receive JWT
POST      /api/auth/logout     Invalidate token and logout


-> Account Operations :- 

Method  Endpoint                     Description
POST    /api/accounts                Open a new bank account
GET     /api/accounts                List all accounts for the user
GET     /api/accounts/balance/:id    Get specific account balance


-> Transactions :-

Method  Endpoint                    Description
POST    /api/transactions           Transfer funds (requires Auth)
POST    /api/transactions/system    System-level initial funding



Setup & Installation

1. Environment Variables

Create a .env file in the root directory:

