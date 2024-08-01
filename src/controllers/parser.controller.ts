import { Request, Response } from 'express';
import {ParserService} from '../services/parser.service';
import {validateUrl} from '../utils';

export const ParseController = async (req: Request, res: Response) => {
  const url = validateUrl(req.query['url'] as string)
  const service = new ParserService();
  res.setHeader('Content-type', 'application/pdf');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Header to force download
  // res.setHeader('Content-disposition', 'attachment; filename=Report.pdf');
  await service.parseSite(url, res);
}