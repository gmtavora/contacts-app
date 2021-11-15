# Overview

A full stack application that keeps all your contacts up to date. ContactsApp acts like a social network, where you mantain your current phone, email and company, and share them with your colleagues and friends.

This application was developed for educational purposes. The frontend is a React Native application, while the backend is a NodeJS Rest API. The user can send friendship requests, search for other users and update his own informations.

## Screens
<div style="display:flex">
<img alt="Screen 1" src="https://github.com/gmtavora/contacts-app/blob/master/screens/screen1.jpg" width=240 height=400 />
<img alt="Screen 2" src="https://github.com/gmtavora/contacts-app/blob/master/screens/screen2.jpg" width=240 height=400 />
<img alt="Screen 3" src="https://github.com/gmtavora/contacts-app/blob/master/screens/screen3.jpg" width=240 height=400 />
<img alt="Video" src="https://github.com/gmtavora/contacts-app/blob/master/screens/video.gif" width=240 height=400 />
</div>

## Prerequisites

You'll need Expo and NodeJS installed.

## Getting started

1. Clone the repository
    ```git clone https://github.com/gmtavora/contacts-app/```

2. In ```mobile``` and ```backend```, install the needed packages
    ```npm install```

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

4. Create a .env file in the ```mobile``` folder. Use the following lines:
    ```
    HOST=http://yourip.com
    PORT=8000
    ```

5. In ```backend```, run the server
    ```node index.js```

6. In ```mobile```, run the application
    ```expo start```.

Optional: in the backend folder, you'd may like to use the mock database and mock uploads. If that's your case, rename ```mockDatabase.db``` to ```database.db```. Unzip ```mockUploads.zip``` and rename it to ```uploads```. In this case, the username and password of the test account is ```johnsmith```.

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
* [NodeMailer](https://nodemailer.com/)

## Authors

* **Gabriel Távora**