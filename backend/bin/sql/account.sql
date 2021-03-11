CREATE TABLE account(
    id              SERIAL PRIMARY KEY,
    balance         INTEGER NOT NULL,
    "usernameHash"  CHARACTER(64),
    "passwordHash"  CHARACTER(64),
    "sessionId"     CHARACTER(36)
);