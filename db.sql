CREATE TABLE admins (
    username TEXT PRIMARY KEY,
    password TEXT
);

CREATE TABLE students (
    rollno TEXT PRIMARY KEY,
    name TEXT,
    year TEXT,
    email TEXT,
    phone TEXT
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag TEXT
);

CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    title TEXT,
    date TIMESTAMP,
    description TEXT,
    status INTEGER DEFAULT 0,
    author TEXT REFERENCES students(rollno),
    assignee TEXT REFERENCES admins(username),
    votes INTEGER DEFAULT 0,
    priority INTEGER,
    eta INTEGER
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    cid INTEGER REFERENCES complaints(id),
    date TIMESTAMP,
    comment TEXT,
    author TEXT
);

CREATE TABLE tags_complaints (
    tid INTEGER REFERENCES tags(id),
    cid INTEGER REFERENCES complaints(id)
);


INSERT INTO tags(tag)
VALUES('Canteen');

INSERT INTO tags(tag)
VALUES('Washroom');

INSERT INTO tags(tag)
VALUES('Water');

INSERT INTO tags(tag)
VALUES('Room');

INSERT INTO tags(tag)
VALUES('Internet Connectivity');

INSERT INTO tags(tag)
VALUES('Common Room');

INSERT INTO tags(tag)
VALUES('Other');
