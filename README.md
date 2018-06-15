# MyReads Project

This repository contains my implementation of MyReads app (first assessment project for the [Udacity React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019)).

This project is a bookshelf app that allows users to categorize books they are currently reading, want to read or they have read.

## Getting started

### Step 1:
Check out the project's "master" branch and install the latest version of [Node](https://nodejs.org/) or [Yarn](https://yarnpkg.com/en/docs/install) .

### Step 2:

After successfully finish the installation, cd into your project directory and run the command "npm install" if you installed Node or "yarn start" if you choose Yarn. This will take a while for your first install as it will download all the project dependencies.

```
cd /project-marion
$ npm install
```

```
cd /project-marion
$ yarn install
```

### Step 3:
When the installation of the dependencies has finished, you should be able to do:

```
$ npm start
```

or

```
$ yarn start
```

This will start the local server for development and the project will be now running on: `http://localhost:3000/`

## Backend Server

This project is using the backend server provided by Udacity. The provided file [`BooksAPI.js`](src/api/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
