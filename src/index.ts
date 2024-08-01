import * as express from 'express';
import {router} from './routes';
import { AppConfig } from './configs/app.config';

const app = express();

app.use('/', router);

/* Error handler middleware */
// eslint-disable-next-line 
app.use((err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(Number(AppConfig.port), '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${AppConfig.port}`)
});