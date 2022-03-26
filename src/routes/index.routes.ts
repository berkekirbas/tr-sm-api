import { Router } from 'express';
import Routes from '@/interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  // declare a constructor and assign to Router
  constructor() {
    this.initRoutes();
  }

  // declare a routes method
  private initRoutes(): void {
    this.router.get(`${this.path}`, (req, res) => {
      res.send('Hello World!');
    });
  }
}

export default IndexRoute;
