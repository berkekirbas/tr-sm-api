import { Router } from 'express';
import Routes from '@/interfaces/routes.interface';
import { allowedHttpMethod } from '@/middlewares/allowedHttpMethod.middleware';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  // declare a constructor and assign to Router
  constructor() {
    this.initRoutes();
  }

  // declare a routes method
  private initRoutes(): void {
    this.router.all(`${this.path}`, allowedHttpMethod(['GET']), (req, res) => {
      res.json({
        success: true,
        message: 'Status = OK',
      });
    });
  }
}

export default IndexRoute;
