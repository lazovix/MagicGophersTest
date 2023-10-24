
# Magic Gophers Test

## Description

the test demo project.

## Technology stack:

### [Nest](https://nestjs.com) 
#### A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

### [PostgreSQL](https://www.postgresql.org)
#### The World's Most Advanced Open Source Relational Database

### [MinIO](https://min.io)
#### High Performance Object Storage for Modern Data Lakes

## Docker

```bash
# running the docker
$ docker-compose --file docker-compose.yml up -d

# api: http://localhost:3000/api
# swagger: http://localhost:3000/swagger
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
