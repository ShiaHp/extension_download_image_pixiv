import { Artwork } from './../interface/artwork';
import { API } from "./api";

export const idPixiv = /\/(\d+)_p\d+_[\w-]+\d+\.(jpg|png|gif|bmp|jpeg|webp)$/i;
export const idTweet = /[0-9]{19,21}/;
export const format_pixiv: number = 0;
export const format_twitter: number = 1;

export interface ExtendNode extends Node {
  tagName: string;
  currentSrc: string;
}
export class Utils {
  static isPixiv(name: string): number {
    let isPixiv: boolean = name.indexOf("pixiv") > -1;
    return isPixiv ? 0 : 1;
  };

  static getIdArtWork(url: string): string {
    return url.match(idPixiv)[1]
  };

  static async getDataUrl(url: string, type = 'id'): Promise<Artwork> {
    const id = this.getIdArtWork(url);
    return await API.getArtwork(id) || {} as Artwork;
  };

  static async checkData(url: string, type = 'url') {
    if (type === 'id') {
      return await API.getArtwork(url);
    }
    return this.getDataUrl(url).then((data) => data);
  };

  static classifiedPageCount(arkwork: Artwork): string[] {
    const urlArr: string[] = [];
    const pageCount = arkwork?.body?.pageCount;
    const img = arkwork?.body?.urls.original
    if (pageCount <= 1 && arkwork) {
      urlArr.push(img);
    } else {
      for (let i = 0; i < pageCount; i++) {
        const url = `${img}`.replace("_p0", `_p${i}`);
        urlArr.push(url);
      }
    }
    return urlArr;
  };

  static isImageNode(node: ExtendNode) {
    return node?.tagName === 'IMG' && node instanceof Element;
  }

  static isPixivWebsite(url: string) {
    const pixivUrlPatterns = [
      /^https?:\/\/www\.pixiv\.net\//,
      /^https?:\/\/[^/]+\.pximg\.net\//,
      /^https?:\/\/pbs\.twimg\.com\//
    ];

    return pixivUrlPatterns.some(p => p.test(url))
  };


  static isTwitter(url: string) {
    const twitterPatterns = [
      /^https?:\/\/twitter\.com\//
    ];
    return twitterPatterns.some(pattern => pattern.test(url));
  };

  static isAIArtWork(node: Node) {
    // to do
  };

}



