import { Router, Request, Response } from 'express';
import {controllers} from './controllers/controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! This is the main route');
});

router.get('/companies', controllers.getCompany )

export default router;