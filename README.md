# Keystroker
Typing passwords on smartphones is frustrating. A single type leads to a rejected login attempt. But what if you could do a typo when logging in to your account, but no one else?

In my bachelor's thesis, [*Improving usability of password authentication using keystroke dynamics*](https://www.dropbox.com/s/urdxhyhelewko4w/Improving%20usability%20of%20password%20authentication%20using%20keystroke%20dynamics%200004%20PDFA.pdf?dl=0), I attempted to use keystroke timing data as a second factor for recognizing users during a login attempt. The idea was to let users log in with typos if their typing behavior matched the typing behavior of their previous login attempts.

`Keystroker` is the experimental setup for collecting keystroke timing data. It allows users to register accounts with a self-chosen password and pattern (similar to password patterns on Android). The website then prompts the users to login regularly to the page by sending them emails. When logging in, keystrokes are registered using JavaScript.

Analysis of keystroke data and attempts to recognize users based on the timing data was done later using a separate set of Python scripts.

The core findings of the thesis were presented as a lightning talk at SOUPS '19, Santa Clara (Symposium on Usable Privacy and Security).

## Running
The project is split into `frontend/` and `backend/`. For running the project, run `npm install` and `npm start` in the respective folders.

## Frontend
The frontend is written in TypeScript with React. The frontend communicates with the backend through AJAX/REST calls.

## Backend
The backend is written in TypeScript and uses a PostgreSQL database.

Original author: Walter Berggren (walter.berggren@aalto.fi)
