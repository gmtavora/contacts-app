const sqlite3 = require("sqlite3").verbose();

const authenticateUser = require("./methods/authenticateUser");
const registerUser = require("./methods/registerUser");
const updateInformation = require("./methods/updateInformation");
const getFriendsList = require("./methods/getFriendsList");
const getFriendRequests = require("./methods/getFriendRequests");
const sendFriendRequest = require("./methods/sendFriendRequest");
const acceptFriendRequest = require("./methods/acceptFriendRequest");
const refuseFriendRequest = require("./methods/refuseFriendRequest");
const searchUserByName = require("./methods/searchUserByName");
const searchUserByUsername = require("./methods/searchUserByUsername");
const resetPassword = require("./methods/resetPassword");
const changePassword = require("./methods/changePassword");
const searchUserById = require("./methods/searchUserById");
const addFavorite = require("./methods/addFavorite");
const removeFavorite = require("./methods/removeFavorite");
const getToken = require("./methods/getToken");
const newToken = require("./methods/newToken");
const deleteToken = require("./methods/deleteToken");

class Database {
  constructor(DB_PATH, dbSchema) {
    this.db = new sqlite3.Database(DB_PATH, function (error) {
      if (error)
        return console.log(error);

      console.log(`Using ${DB_PATH}`);
    });

    this.db.exec("PRAGMA foreign_keys = ON;", function (error) {
      if (error)
        console.log(error.message);
    });

    this.db.exec(dbSchema, function (error) {
      if (error)
        console.log(error.message);
    });
  }
}

Database.prototype.authenticateUser = authenticateUser;
Database.prototype.updateInformation = updateInformation;
Database.prototype.registerUser = registerUser;
Database.prototype.getFriendsList = getFriendsList;
Database.prototype.getFriendRequests = getFriendRequests;
Database.prototype.sendFriendRequest = sendFriendRequest;
Database.prototype.acceptFriendRequest = acceptFriendRequest;
Database.prototype.refuseFriendRequest = refuseFriendRequest;
Database.prototype.searchUserByName = searchUserByName;
Database.prototype.searchUserByUsername = searchUserByUsername;
Database.prototype.resetPassword = resetPassword;
Database.prototype.changePassword = changePassword;
Database.prototype.searchUserById = searchUserById;
Database.prototype.addFavorite = addFavorite;
Database.prototype.removeFavorite = removeFavorite;
Database.prototype.getToken = getToken;
Database.prototype.newToken = newToken;
Database.prototype.deleteToken = deleteToken;

module.exports = Database;

// module.exports = function Database(DB_PATH, dbSchema) {
//   const db = new sqlite3.Database(DB_PATH, function (error) {
//     if (error)
//       return console.log(error);

//     console.log(`Using ${DB_PATH}`);
//   });

//   db.exec("PRAGMA foreign_keys = ON;", function (error) {
//     if (error)
//       console.log(error.message);
//   });

//   db.exec(dbSchema, function (error) {
//     if (error)
//       console.log(error.message);
//   });

//   return {
//     authenticateUser,
//     registerUser,
//     getFriendsList,
//     getPendingFriendRequests,
//     sendFriendRequest,
//     acceptFriendRequest,
//     refuseFriendRequest
//   };
// }