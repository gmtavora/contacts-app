if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const login = require('./post/login');
const logout = require('./post/user/logout');
const signup = require('./post/signup');
const changeAvatar = require('./post/user/changeAvatar');
const updateInformations = require('./post/user/updateInformations');
const changePassword = require('./post/user/changePassword');
const contacts = require('./post/contacts');
const contactsSearch = require('./post/contacts/search');
const request = require('./post/request');
const requestSend = require('./post/request/send');
const requestAccept = require('./post/request/accept');
const requestRefuse = require('./post/request/refuse');
const addFavorite = require('./post/favorites/add');
const removeFavorite = require('./post/favorites/remove');

const multerConfig = {
  dest: path.resolve(__dirname, 'uploads', 'avatars'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "uploads", "avatars"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'));
    }
  }
};

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.send("Hello, world.");
});

app.post("/login", login);
app.post("/logout", logout);
app.post("/signup", signup);
app.post("/user/changeAvatar", multer(multerConfig).single('avatar'), changeAvatar);
app.post("/user/clearAvatar", changeAvatar);
app.post("/user/updateInformations", updateInformations);
app.post("/user/changePassword", changePassword);
app.post("/contacts", contacts);
app.post("/contacts/search", contactsSearch);
app.post("/request", request);
app.post("/request/send", requestSend);
app.post("/request/accept", requestAccept);
app.post("/request/refuse", requestRefuse);
app.post("/favorites/add", addFavorite);
app.post("/favorites/remove", removeFavorite);

app.use("/static/avatars/", express.static(__dirname + "/uploads/avatars"));

app.use((request, response, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => response.status(error.status || 500).send(error.message || "There was a problem."));

app.listen(PORT);
console.log(`Listening on port ${PORT}`);