import {Router} from 'express';
import {ParseController} from './controllers/parser.controller';

const router = Router();

router.get('/parse', ParseController);

export {router};