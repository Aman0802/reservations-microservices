<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

### Other Scripts

- nest generate library common
- yarn add @nestjs/mongoose mongoose
- nest generate module database -p common
- nest generate module config -p common
- mongod --dbpath=data/db
- nest g app reservations

- docker build ../../ -f Dockerfile -t sleepr_reservations

- nest g app auth
- nest g module users
- pnpm i @nestjs/passport passport passport-local
- pnpm i -D @types/passport-local
- pnpm i @nestjs/jwt passport-jwt
- pnpm i -D @types/passport-jwt
- pnpm i @nestjs/microservices
