# BODY/DOUBLE

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

**BODY/DOUBLE** is an accountability-partner web app inspired by Omegle. Sign up, set your focus preferences, get paired with another person in real time, and work together through a Pomodoro-style session — then take a short break and choose to stay matched or find someone new.

**Live demo:** [https://body-double.onrender.com](https://body-double.onrender.com)

---

<p align="center">
  <img width="700" alt="BODY/DOUBLE screenshot 1" src="public/img/readmeimg1.png" />
  <img width="700" alt="BODY/DOUBLE screenshot 2" src="public/img/readmeimg2.png" />
</p>

## Features

- **Account auth** — Email/password signup and login with Passport and secure sessions
- **Focus preferences** — Choose work type (studying, coding, writing, editing) and camera on/off before matching
- **Real-time matching** — Socket.io queue pairs users into a shared room
- **Video or text sessions** — Camera-on users join a WebRTC video room with chat; camera-off users get a text-only focus room
- **Pomodoro flow** — 25-minute focus timer, then a 5-minute break room with options to stay together or rematch
- **Responsive UI** — EJS views with shared layout partials and custom CSS

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | EJS, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | Passport Local, express-session, bcrypt, connect-mongo |
| Realtime | Socket.io |
| Video | WebRTC (signaling over Socket.io) |
| Hosting | [Render](https://body-double.onrender.com) |

## How it works

1. Visit the landing page and create an account (or log in)
2. Set your preferences on `/filters`
3. Join the match queue on `/match`
4. When paired, you’re sent to `/videoChat/:roomId` or `/textChat/:roomId`
5. After the focus timer, continue to `/break` and choose **stay** or **find new**

## Project structure

```text
body-double/
├── server.js              # Express + Socket.io entry point
├── config/                # Database, Passport, and local .env
├── routes/                # Express route definitions
├── controllers/           # Request handlers
├── models/                # Mongoose models (User, Filters, Post)
├── middleware/            # Auth, Multer, Cloudinary
├── views/                 # EJS templates and partials
└── public/                # Static CSS and images
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB)
- (Optional) [Cloudinary](https://cloudinary.com/) credentials if you use image upload routes

### 1. Clone the repo

```sh
git clone https://github.com/NaimaBogran/body-double.git
cd body-double
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create `config/.env` (this is the path the app loads):

```env
PORT=3000
DB_STRING=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<app>
SESSION_SECRET=a_long_random_string

# Optional — used by legacy post/upload routes
CLOUD_NAME=
API_KEY=
API_SECRET=

# Optional — production only
NODE_ENV=development
```

**Notes**

- Prefer a MongoDB Atlas region close to you (for example, AWS `us-east-1`) so local and hosted connections are reliable
- In Atlas **Network Access**, allow your IP for local development, and `0.0.0.0/0` if you deploy to Render (dynamic IPs)
- Never commit `config/.env`

### 4. Run the app

```sh
npm start
```

This runs `nodemon server.js`. Open [http://localhost:3000](http://localhost:3000).

You should see `MongoDB Connected: ...` in the terminal when the database connection succeeds.

## Deploying on Render

1. Push your code to GitHub (do **not** commit secrets)
2. Create a Web Service on [Render](https://dashboard.render.com) pointed at this repo
3. Suggested settings:
   - **Build command:** `npm install`
   - **Start command:** `node server.js`
4. Add the same environment variables from `config/.env` in the Render **Environment** tab (`DB_STRING`, `SESSION_SECRET`, etc.)
5. Set `NODE_ENV=production`
6. Ensure Atlas Network Access allows Render to connect (typically `0.0.0.0/0` on free tiers)

A `Procfile` is included with `web: node server.js` for production-style starts.

## Main routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Landing page |
| GET/POST | `/signup` | Create an account |
| GET/POST | `/login` | Sign in |
| GET | `/logout` | End session |
| GET/POST | `/filters` | Work type + camera preferences |
| GET | `/match` | Match queue |
| GET | `/videoChat/:roomId` | Video focus session |
| GET | `/textChat/:roomId` | Text focus session |
| GET | `/break` | Break timer + rematch choices |
| GET | `/about` | About the creator |
| GET | `/pomodoroPage` | Pomodoro technique overview |

## License

MIT
