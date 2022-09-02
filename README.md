# WeShare Social Network API

## Description

WeShare is a social network that lets user create connections with friends, share their thoughts and react to other thoughts.

In this repository you can find the APIs that power WeShare. The APIs are build on top of Node and use Express for routing, a MongoDB database for persistent data, Mongoose ODM, and moment library to format timestamps. 

You can check the APIs in action [here](https://drive.google.com/file/d/1_7l0U3nc5aEmoZkTNGE4dHZlYNchhuKA/view).


### Table Of Contents

1. Title
2. Description
3. Installation
4. Usage
5. Technologies
6. Tests
7. Author

## Installation

- To set up all the existing npm packages, run `npm init`.
- To install the dependencies on the node_modules folder, run `npm install` or
    - `npm i express` to install Express.js;
    - `npm i mongoose` to install Mongoose;
    - `npm i nodemon` to install Nodemon.

- Next, create a `.env` file and add a field with URI to mongo database `DB_URL=<MONGO DB>`

## Usage

To start the server run `node server.js` from the project folder.

Once the server is up and running, use the following APIs:

`/api/users`
- `GET`  Returns all users
- `POST` Create a new user

`/api/users/:userId`
- `GET` Get a specific user and their thoughts
- `PUT` Update an user
- `DELETE` Delete a specific user.

`/api/users/:userId/friends/:friendUserId`
- `POST` Create a friend connection
- `DELETE` Delete a friend connection.

`/api/thoughts`
- `GET`  Returns all thoughts
- `POST` Create a new thought

`/api/thoughts/:thoughtId`
- `GET` Get a specific thought
- `PUT` Update a thought
- `DELETE` Delete a specific thought

`/api/thoughts/:thoughtId/reactions`
- `POST` Create a reaction
- `DELETE` Delete a reaction
- `PUT` Update a reaction

## Technologies

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Moment.js
- Insomnia

## Tests

Insomnia is used to test REST API calls. Please see the walk-through demonstration videos as well as the sections on Description and Usage to see how data is added and tested using Insomnia.

    1. When the API GET routes for users and thoughts are opened in Insomnia, the data for each   of the routes is displayed in formatted JSON.

    2. When the API POST, PUT, and DELETE routes are tested in Insomnia, the user can successfully create, update, and delete users and thoughts in the user's database.

    3. When the API POST and DELETE routes are tested in Insomnia, the user can successfully create and delete reactions to thoughts, and add and remove friends to a user's friend list.

## Author

This is Anusha, full stack developer with an expertise in MERN stack.