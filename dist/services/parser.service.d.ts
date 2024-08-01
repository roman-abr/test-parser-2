import { Response } from "express";
export declare class ParserService {
    parseSite(url: string, res: Response): Promise<void>;
    private makePdf;
    private getWords;
}
