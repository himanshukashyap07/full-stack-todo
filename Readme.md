# Todo

![MyBrandName](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

Todo is a platform that helps users create tasks so they don’t forget important task.

---

## Features

- **Authentication** – Secure user login and registration powered by MongoDB.
- **Database** – Mongodb atlas for storing users, todos, error_log.
- **Frontend** – Responsive UI built with TypeScript, Vite,TailwindCSS and handle state by Zustand.
- **Backend API** – Node.js + Express handles CURD opertion in todo, authentication, and data management.
- **Safe search and data management** - credentials and data is checked by zod before send to the database. 
- **Deployment Ready** – Easily deploy frontend (Vercel) and backend (Vercel).

---

## Tech Stack


- Runtime: Node.js + Express.js.
- Language: TypeScript.
- Frontend: Vite + Tailwind CSS.
- Database: Mongodb altlas.
- stateMangment: Zustand 
- HTTP Client: Axios API.
- Hosting: Vercel (Frontend + Backend).

---

## Quick Start

### Prerequisites

- Node.js 
- MongoDb atlas(for Database)

### Installations

**Clone the repository**

**Clone the repository**
```bash
git clone https://github.com/himanshukashyap07/full-stack-todo.git
Install Dependencies

cd todoBackend && npm install
cd ../todoFrontend && npm install
Environment setup

cp todoBackend/.env.example todoBackend/.env

Update .env with your configuration:
Mongodb URL
cors 

# Run backend
cd todoBackend && npm run dev

# Run frontend
cd todoFrontend && npm run dev

Production Build
npm run build
npm start
Visit: http://localhost:5173

Repository Structure


/todo
├── /todoFrontend
│   ├── /src
│   │   ├── /api             # auth and storage path(useCurrentUser,AuthMiddleware,authStorage,axiosInstance)
│   │   ├── /app             #Dashboard
├   ├   ├   ├── /User        #user route(SigninUser,SignUpUser,ChangePassword)
├   ├   ├                  
│   │   ├── /components      # component (DashboardHeader and Todo)
│   │   ├── /lib             # userInterface
│   │   ├── /schemas         # schemas for validation(signupSchema,signInSchema,ChangePasswordSchema)
│   │   ├── /store           # todoStore handel by the zustand
│   │   ├── App.tsx          # Main routing setup
│   │   └── main.tsx         # React entry point
│   ├── public/              # Public assets (icons, logos)
│   ├── tailwind.config.ts   # Configures Tailwind CSS settings
│   ├── vite.config.ts       # Contains build and development settings for the Vite bundler
│   └── package.json         # Lists frontend project dependencies, scripts, and metadata
│
├── /todoBackend
│   │
│   ├── /dist                #all compiled code of typescript
│   ├── /logs                # user login and logout logs
│   ├── /src
│   │   ├── /controllers     # all funciton of todo and user (user.controller and todo.controller)                 
│   │   ├── /db              # database connection (connectToDb)
│   │   ├── /middlewares     # have auth and errorHandler middleware
│   │   ├── /model           # model of user , todo and error_log
│   │   ├── /route           # handel user route and todo route
│   │   ├── /utils           # have utility (apiErrorHandler,apiResponseHandler and asyncHandler)
│   │   ├── app.ts           # Main routing setup and server starter
│   │   └── index.ts         # for calling database
│   │   
│   ├── .env                 # have all env valiables
│   ├── express.d.ts         # for access user in every route(for typeSafty)
│   └── package.json         # Lists frontend project dependencies, scripts, and metadata
│
└── README.md

Architecture Overview
Frontend
Built with TypeScript + Vite + Tailwind CSS

Connects to Mondodb for data storage and backend API 

Backend
Built with Node.js + Express

API Endpoints
User Routes
Endpoint	                    Method	Description
/api/v1/user/register	        POST	Register new user
/api/v1/user/login	            POST	login user
/api/v1/user/current-user	    GET	    get user
/api/v1/user/logout	            POST	logout user
/api/v1/user/update-password	PATCH	update user password
/api/v1/user/todos	            GET	    get all user todos

Todo Routes
/api/v1/todo/createTodo	                POST	Register new user
/api/v1/todo/updateTodo/:todoId	        POST	login user
/api/v1/todo/deleteTodo/:todoId	        GET	    get user
/api/v1/todo/toggleTodoComplete/:todoId	POST	logout user

Example Request
POST /api/v1/user/register
{
    "username":"intelliSQR",
    "email":"intelliSQR@gmail.com",
    "password":"one@0123"
}

Response:
{
    "statusCode": 201,
    "data": {
        "_id": "6929a9e6965a72156d72bfdf",
        "username": "intelliSQR",
        "email": "intelliSQR@gmail.com",
        "createdAt": "2025-11-28T13:55:50.949Z",
        "updatedAt": "2025-11-28T13:55:50.949Z",
        "__v": 0
    },
    "message": "user created successfully",
    "success": true
}

POST /api/v1/user/login
Request
{
    "email":"intelliSQR@gmail.com",
    "password":"one@0123"
}

Response
{
    "statusCode": 200,
    "data": {
        "_id": "6929a9e69",
        "username": "intelliSQR",
        "email": "intelliSQR@gmail.com",
        "createdAt": "2025-11-28T13:55:50.949Z",
        "updatedAt": "2025-11-28T14:00:30.958Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTI5YTllNj"
    },
    "message": "user logged in successfully",
    "success": true
}

