CREATE TABLE LoginAttempt(
    id SERIAL NOT NULL,
    participant_email TEXT REFERENCES Participant(email),
    keystroke_timing TEXT NOT NULL,
    success TEXT,
    timestamp TIMESTAMP default current_timestamp
);
