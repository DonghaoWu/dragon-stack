CREATE TABLE dragon(
    id              SERIAL PRIMARY KEY,
    birthdate       TIMESTAMP NOT NULL,
    nickname        VARCHAR(64),
    "generationId"  INTEGER,
    "isPublic"      BOOLEAN NOT NULL,
    "saleValue"     INTEGER NOT NULL,
    "sireValue"     INTEGER,
    FOREIGN KEY     ("generationId") REFERENCES generation(id)
);