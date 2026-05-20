export default () => ({
  mode: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.API_PORT ?? 3000),
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(process.env.DATABASE_PORT ?? 5432),
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    name: process.env.DATABASE_NAME ?? 'postgres',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  },
});