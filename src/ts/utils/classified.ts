import { Artwork } from './../interface/artwork';
import { API } from "./api";

export const idPixiv = /\/artworks\/(\d+)/;
export const idTweet = /[0-9]{19,21}/;
export const format_pixiv: number = 0;
export const format_twitter: number = 1;

export class Utils {
  static isPixiv(name: string): number {
    let isPixiv: boolean = name.indexOf("pixiv") > -1;
    return isPixiv ? 0 : 1;
  }

  static async getDataUrl(url: string): Promise<Artwork> {
    const id = url.match(idPixiv)[0];
    const data = await API.getArtwork(id);
    return data;
  }

  static async checkData(url: string) {
    return this.getDataUrl(url).then((data) => data);
  }

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
  }
}



