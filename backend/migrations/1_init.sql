CREATE TABLE Participant(
    id SERIAL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    pattern text NOT NULL,
    toc_accepted boolean NOT NULL
);
