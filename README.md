# Amalizon API

## Stack
- apollo-server-express as graphql server
- PRISMA as ORM
- MySQL as database
- eslint for code linting

## Database/PRISMA Setup
- Download and install docker and docker compose
- Setup a local instance of MySQL (see user/pass in docker compose file)
- Using the compose file in the project running `docker-compose up -d`
- Run `prisma deploy` to create the database and when the datamodel changes
- Prisma will be running at `http://localhost:4566`

## GraphQL API Setup
- Install dependencies: `npm i`
- Create a `.env` file. See the `.env-development` file
- Run the server: `npm start`
- Query data from `http://locahost:4000/graphql`


# Amalizon WEB

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).