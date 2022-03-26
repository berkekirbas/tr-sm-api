import { bool, cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  const env = process.env;
  cleanEnv(env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
      default: 'development',
    }),
    PORT: port({ default: 3000 }),
    CREDENTIALS: bool({ default: true }),
    ORIGIN: str({ default: '*' }),
  });
};

export default validateEnv;
