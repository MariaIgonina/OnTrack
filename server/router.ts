import { Router, Request, Response } from 'express';
import { applicantControllers } from './controllers/applicantControllers'
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! This is the main route');
});

router.get('/applicant/:id', applicantControllers.getApplicantById)
// router.post('/createApplicant', applicantControllers.createApplicant)

export default router;