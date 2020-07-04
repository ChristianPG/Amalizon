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
