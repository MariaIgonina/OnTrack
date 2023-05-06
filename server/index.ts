import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './router';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const PORT = 3000;


app.use(bodyParser.json())
app.use(router);


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

//RUN WITH npm run dev