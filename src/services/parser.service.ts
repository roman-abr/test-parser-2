import axios from "axios";
import {JSDOM} from 'jsdom';
import {getMaxTen, unique} from "../utils";
import {Tags} from "./parser.models";
import { Response } from "express";
import * as pdf from 'pdfkit';
import {readFile} from 'fs/promises';
import {join} from 'path';
export class ParserService {
  
  public async parseSite(url: string, res: Response) {
    const words = await this.getWords(url);
    const choosed = getMaxTen(words)
    await this.makePdf(choosed, res);
  }

  private async makePdf(words: string[], res: Response) {
    const doc = new pdf({lang: 'ru-RU'});
    doc.pipe(res);
    const fontPath = 'misc/Alice-Regular.ttf';
    const font = await readFile(join(__dirname, '../../',fontPath));
    doc.font(font).fontSize(15)

    for (const word of words) {
      doc.moveDown();
      doc.text(word);
    }

    doc.end()
  }

  private async getWords(url: string) {
    const response = await axios.get(url)
    const {window} = new JSDOM(response.data);
    const document = window.document;
    const xpath = "//*[normalize-space(text()) != '']";
    const result = [];
    const xPathResult = document.evaluate(xpath, document, null, window.XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
    try {
      let thisNode: Node = xPathResult.iterateNext();
      while (thisNode) {
        thisNode.normalize();
        if (![Tags.script, Tags.style].includes(thisNode.nodeName as Tags)) {
          const text = thisNode.textContent;
          if (text?.length) {
            const splited = text.split(' '); 
            result.push(...splited.map(w => w.trim()));
          }
        }
        
        thisNode = xPathResult.iterateNext();
      }
    } catch (e) {
      console.error(`Error: Document tree modified during iteration ${e}`);
    }
    return unique(result);
  }
}