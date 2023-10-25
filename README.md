# Spacevis

Express + React app

Description: Inspect and manipulate data about meteorites. You will have access to a 3d globe representation of over 45k meteorite impact zones over the span of over 1100 years.

861 AD - 2023 AD

## Structure

There are two directories in the __root__ of the project.

* The Express server is in `server/`
* The React app is in `client/
* The server responsd to API calls and serves the __built__ React app.

There are 3 package.json files -- see what `scripts` they define.

## Setup

To install all the dependencies and build the React app run:

```
npm run build
```

## To run the app

### Just the client

If `metro-map-client/package.json` has a `proxy` line, remove it. 

```
cd client
npm start
```

### Just the server

to run just the server you can run the following commands

```
cd server
node server.mjs
```

### Client and Server

To run both at the same time rum this command.

```
npm run start
```
