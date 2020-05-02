module.exports = `CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  cell text,
  picture text,
  email text NOT NULL UNIQUE,
  address text,
  city text,
  state text,
  country text,
  birthday date,
  company text,
  nationality text
);

CREATE TABLE IF NOT EXISTS Friends (
  id integer NOT NULL PRIMARY KEY,
  member1 integer NOT NULL,
  member2 integer NOT NULL,
  status integer NOT NULL,
  lastUserID integer NOT NULL,
  isFavoriteOf1 integer,
  isFavoriteOf2 integer,
  FOREIGN KEY (member1) REFERENCES Users (id),
  FOREIGN KEY (member2) REFERENCES Users (id),
  FOREIGN KEY (lastUserID) REFERENCES Users (id),
  UNIQUE (member1, member2),
  CHECK (member1 < member2),
  CHECK (status >= 0 AND status < 3)
);`;