# Restaurant API

Backend REST API for a restaurant reservation system built with **Node.js**, **Express**, and **MongoDB**.

The API manages users, restaurant tables, and reservations.
Authentication uses JWT.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token

---

## Features

* User authentication (signup, signin, logout)
* Table management
* Table capacity filtering
* Restaurant reservations
* Protected routes with authentication middleware
* Role-based access for admin operations

---

## Project Structure

```
src
 ├── controllers
 │     ├── user.controller.js
 │     ├── table.controller.js
 │     └── reservation.controller.js
 │
 ├── routes
 │     ├── user.routes.js
 │     ├── table.routes.js
 │     └── reservation.routes.js
 │
 ├── middlewares
 │     ├── auth.middleware.js
 │     └── role.middleware.js
 │
 └── server.js
```

---

## Installation

Clone the repository

```
git clone https://github.com/oumaima1115/Restaurant_Backend.git
```

Move to the project folder

```
cd Restaurant_Backend
```

Install dependencies

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root folder.

Example

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Run the Application

Development mode

```
npm run dev
```

Production mode

```
npm start
```

---

## API Routes

### Authentication

```
POST /signup
POST /signin
POST /logout
```

---

### Users

```
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id
```

---

### Tables

Get tables

```
GET /tables
```

Get table by id

```
GET /tables/:id
```

Create table

```
POST /tables
```

Update table

```
PUT /tables/:id
```

Delete table (admin only)

```
DELETE /tables/:id
```

Find tables by capacity

```
GET /tables/capacity/:min
```

Delete table if capacity rule is respected

```
DELETE /tables/capacity/:id
```

---

### Reservations

Create reservation (authenticated user)

```
POST /reservations
```

Get reservations

```
GET /reservations
```

---

## Authentication

Protected routes require a JWT token.

Header example

```
Authorization: Bearer <token>
```

---

## Example Use Case

1. User signs up
2. User logs in and receives a token
3. User creates a reservation
4. Admin manages restaurant tables

---

## Author

Restaurant API project created for learning backend development with the MERN ecosystem.
