# 🐝 The Bee Game — Frontend

Welcome to The Bee Game frontend!
This project is built with Vite, TypeScript, Jest, and Husky to provide a fun and well-structured bee-themed game.

## 🚀 Getting Started

### ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js ≥ 18.x
- npm ≥ 9.x

### 📦 Installation

Clone the repo and install dependencies:

```bash
  git clone https://github.com/AndreiCinc/the-bee-game_FE.git.git
  cd the-bee-game-fe
  npm install
```

## ▶️ Start Development Server

```bash
  npm start
```

## 🧪 Running Tests

This project uses Jest for unit testing.

```bash
  npm run test:watch
```

## 🧹 Code Quality

### ✨ Prettier + lint-staged

Code is auto-formatted using Prettier. You can run it manually:

```bash
  npx prettier --write .
```

Linting and formatting are also applied automatically on staged files via lint-staged during commits.

## 🔐 Git Hooks

This project uses Husky and lint-staged to enforce code quality before every commit:
✅ Runs Jest tests on staged files
✅ Applies Prettier formatting
❌ Fails commit if tests or formatting don’t pass

Already configured via postinstall + prepare scripts:

```bash
  npm run postinstall
  npx husky install
```

## 📁 Project Structure (example)

```bash
  ├the-bee-game-fe/
  ├── public/               # Static files
  ├── src/
  │   ├── components/       # Game UI
  │   ├── services/         # Swarm logic, user data
  │   ├── utils/            # Helper functions
  │   ├── shared/           # Types, models
  │   └── main.ts           # App entry point
  ├── package.json
  └── README.md
```

## 🧠 Tech Stack

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Husky](https://typicode.github.io/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Prettier](https://prettier.io/)
