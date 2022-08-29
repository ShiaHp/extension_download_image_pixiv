import { API } from "./api";

export const idReg = /[0-9]{9}|[0-9]{8}|[0-9]{10}/;

export class checkURL {
  static async checkManyPageCount(url: string) {
    const id = url.match(idReg)[0];
    const data = await API.getArtwordData(id);
    if (data.body.pageCount <= 1) {
      return data.body.pageCount;
    } else {
      return data.body.pageCount;
    }
  }

  static async checkURLmedium(url: string): Promise<string> {
 
    const id = url.match(idReg)[0];
    const data = await API.getArtwordData(id);
    return data.body.urls.original
  }
}
