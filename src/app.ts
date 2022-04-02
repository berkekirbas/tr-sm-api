/**
 * @description This file contains the Application logic.
 */

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import redirectSsl from 'redirect-ssl';

import { ORIGIN, CREDENTIALS } from '@config';
import Routes from '@/interfaces/routes.interface';

class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();

    this.initializeMiddlewares(); // Initialize middlewares
    this.initializeSecurity(); // Initialize security
    this.initializeRoutes(routes); // Initialize routes
  }

  /**
   * @description This method returns the express application instance.
   * @returns {express.Application}
   */
  public static getServer(): express.Application {
    return express();
  }

  /**
   * @description This method initializes the security middlewares.
   */
  private initializeSecurity(): void {
    this.app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    this.app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
    this.app.use(hpp()); // Prevent http param pollution

    this.app.use(redirectSsl); // Redirect http to https
  }

  /**
   * @description This method initializes the middlewares.
   */
  private initializeMiddlewares(): void {
    this.app.use(compression()); // Compress all routes
    this.app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS })); // Enable CORS for all routes
    this.app.use(express.json()); // Parse JSON body
    this.app.use(express.urlencoded({ extended: true })); // Parse URL encoded body
  }

  /**
   * @param routes
   * @description This method initializes the routes.
   */
  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
