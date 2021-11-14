# Overview

A full stack application that keeps all your contacts up to date. ContactsApp acts like a social network,
where you mantain your current phone, email and company, and share them with your colleagues and
friends.

This application was developed for educational purposes.

## Screens
![Screen 1](https://github.com/gmtavora/contacts-app/blob/master/screens/screen1.jpg)
![Screen 2](https://github.com/gmtavora/contacts-app/blob/master/screens/screen2.jpg)
![Screen 4](https://github.com/gmtavora/contacts-app/blob/master/screens/screen4.jpg)

## Prerequisites

You'll need Expo and NodeJS installed.

## Getting started

1. Clone the repository ```git clone https://github.com/gmtavora/contacts-app/```
2. In ```mobile```, install the needed packages using ```npm install```.
3. Create a .env file in the ```backend``` folder. Use the following lines:
    ```
    NODE_ENV=development

    HOST=http://yourip.com
    PORT=8000

    EMAIL_HOST=host
    EMAIL_USERNAME=user
    EMAIL_PASSWORD=password
    EMAIL_PASSWORD_RESET=reset@mail.com
    ```

4. Create a .env file in the ```mobile``` folder. Use the following line:
    ```
    HOST=http://yourip.com
    PORT=8000
    ```

5. Run the server ```node index.js```
6. Run the application using Expo or your preferred simulator.

Optional: in the backend folder, you'd may like to use the mock database and mock uploads. If that's your case, rename ```mockDatabase.db``` as ```database.db```, and also unzip ```mockUploads.zip``` and rename it to ```uploads```.

## Built with

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [NodeJS](http://nodejs.org/)
* [Express](https://expressjs.com/)
* [SQLite](https://www.sqlite.org/)
* [Formik](https://formik.org/)
* [Yup](https://github.com/jquense/yup)
* [Multer](https://github.com/expressjs/multer)
* [Axios](https://axios-http.com/docs/intro)

## Authors

* **Gabriel Távora**