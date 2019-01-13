# Keystroker
Keystroker is the experimental setup for my (Walter Berggren) bachelor's thesis. The setup consists of a website for recording keystroke timing data of login attempts. The keystrioke timing data was then used for user verification using keystroke dynamics. The goal of the thesis (*Improving usability of password authentication using keystroke dynamics*) was to allow sparse character errors when typing passwords for users with otherwise typical typing behavior, and thereby improving the user experience.

The experimental setup allows users to register accounts with a self-chosen password and pattern (similar to password patterns on Android). The website then prompts the users to login regularly to the page by sending them emails. When logging in, keystrokes are registered using JavaScript.

## Running
The project is split into `frontend/` and `backend/`. For running the project, run `npm install` and `npm start` in the respective folders.

## Frontend
The frontend is written in TypeScript with React. The frontend communicates with the backend through AJAX/REST calls.

## Backend
The backend is written in TypeScript and uses PostgreSQL as its database.

Original author: Walter Berggren (walter.berggren@aalto.fi)
