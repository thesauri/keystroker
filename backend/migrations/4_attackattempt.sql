CREATE TABLE AttackAttempt(
    id SERIAL NOT NULL,
    participant_email TEXT REFERENCES Participant(email),
    keystroke_timing TEXT NOT NULL,
    success BOOLEAN,
    attacker TEXT,
    user_agent TEXT,
    timestamp TIMESTAMP default current_timestamp
);
