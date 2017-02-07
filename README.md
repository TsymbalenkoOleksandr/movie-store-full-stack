# Movie store application

Test task for Webbylab 

### Installation

1 - Clone repo

```sh
$ git clone https://github.com/wack17s/movie-store-full-stack.git
```

2 - Install dependencies via [npm](https://www.npmjs.com)
```sh
$ npm i
```

3 - Run webpack build
```sh
$ npm run buildf
```

With docker installed:
[Docker](https://docs.docker.com/engine/installation/)
[Docker-compose](https://docs.docker.com/compose/install/)

4 - Run docker-compose build
```sh
$ docker-compose build
```

5 - Run docker-compose up
```sh
$ docker-compose up
```

Without docker:

4 - Run the [mongo](http://www.mongodb.org) database server
```sh
$ mongod
```

5 - Run the server
```sh
$ npm run start
```

Go to [http://localhost:3001/](http://localhost:3001/) and see what happens

---
### Usage
When you first open the application the database should be empty. 

##### Start

Press Add Movie button in left top corner.
Then load text file.
The text file should be formatted like:

```
Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn

Title: Casablanca
Release Year: 1942
Format: DVD
Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre
```

---
### Archtecture

##### General description

Technologies used:
  - React
  - Redux
  - React-router
  - NodeJS (ExpressJS)
  - MongoDB
  - Docker
  - some ugly stuff (react-bootstrap, sematic-ui, react create app)

##### Structure

Front-end:
- components
   - App 
   - Footer
   - Header
   - Pagination
- containers
  - AddMovie - movies adding page
  - FullMovie - full movie information page
  - StarMovies - page with searched star
  - Movies - main page with all movies
- modules - modules with consts, reducers and actions
  - addmovie
  - movie
  - movies
  - starmovies
- reducers - combine reducers from modules
- store - redux store with some middleware
- utils
- routes.js
- index.js

Back-end:
- routes - include all API
- app.js
