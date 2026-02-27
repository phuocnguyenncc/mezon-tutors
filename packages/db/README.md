# database

## Execute migration

### On production

(TBD)

### On local development

- install

```sh
docker compose up -d
```

- setup database
- create .env file and update TEST_USER_EMAIL for your email which is used for login (all data will reference to this user)

```sh
# POSTGRESQL DB

$ cd db
$ yarn prisma:migrate

# check postgresql
docker exec -it {containerId} psql -U postgres -d postgres
postgres=# \dt
# quit psql
postgres=# \q
```


- Create data migration

```sh
# postgres
yarn prisma:migrate:data
yarn ts-node prisma/data-migrations/20231101044221_example

```

## Test

```bash
cd db/test
yarn prisma:db:push
```

```bash
yarn prisma:gen
```

```bash
yarn test
```
