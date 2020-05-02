# contacts-app

Simple contacts app.

## Prerequisites

You'll need a package manager, Expo and NodeJS.

## Getting started

To install the application, follow this instructions:

1. Clone the repository ```git clone https://github.com/gmtavora/contacts-app/```
2. In ```mobile```, install the needed packages using your package manager.
3. In the backend folder, you may need to fill the database with some fake contacts using ```node fillDatabase.js```
4. Run the server ```node index.js```
5. Run the application using Expo or a simulator.

## Tests

No support yet.

## Built with

* [React Native](https://reactnative.dev/) - Used for cross-platform;
* [Expo](https://expo.io/) - Used to iterate between React Native, native Android and native iOS;
* [NodeJS](http://nodejs.org/) - The application backend was built on Node;
* [Express](https://expressjs.com/) - Web framework for Node;
* [SQLite](https://www.sqlite.org/) - SQL database engine;

## Authors

* **Gabriel Távora**

## Issues

* HTTP is not secure, must switch to HTTPS.
* User data is not being stored with safety in the database.
* User should be able to block other user.
