import spdy from 'spdy';
import fs from 'fs';
import path from 'path';

import App from '@/app';
import { NODE_ENV, PORT } from '@/config';
import IndexRoute from '@routes/index.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const options = {
  key: fs.readFileSync(path.join(__dirname, './keys/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './keys/server.crt')),
};

const app = new App([new IndexRoute()]);

const spdyServer = spdy.createServer(options, app.app);

spdyServer.listen(NODE_ENV === 'production' ? 443 : PORT, () => {
  console.info(`=================================`);
  console.info(`======= ENV: ${NODE_ENV} =======`);
  console.info(`🚀 App listening on the port ${PORT}`);
  console.info(`=================================`);
});
