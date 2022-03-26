import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { /*NODE_ENV, PORT,*/ ORIGIN, CREDENTIALS } from '@config';
import Routes from '@/interfaces/routes.interface';

class App {
  public app: express.Application;
  //private env: string;
  //private port: number | string;

  constructor(routes: Routes[]) {
    this.app = express();
    //this.env = NODE_ENV || 'development';
    //this.port = PORT;

    this.initializeMiddlewares();
    this.initializeSecurity();
    this.initializeRoutes(routes);
  }

  public static getServer(): express.Application {
    return express();
  }

  private initializeSecurity(): void {
    this.app.enable('trust proxy');
    this.app.use(helmet());
    this.app.use(hpp());

    this.app.use((req, res, next) => (req.secure ? next() : res.redirect(301, `https://${req.headers.host}${req.url}`)));
  }

  private initializeMiddlewares(): void {
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
