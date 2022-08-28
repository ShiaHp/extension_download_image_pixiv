import { API } from "./api";

const idReg = /[0-9]{9}|[0-9]{8}|[0-9]{10}/;

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

  static checkURLmedium(url: string): string {
    // const message = 'https://i.pximg.net/img-master/img/2022/04/23/00/00/03/97806570_p0_master1200.jpg'
    const parameter = [
      "c/48x48",
      "c/250x250_80_a2",
      "c/360x360_70/",
      "c/540x540_70/",
    ];
    if (url.includes(parameter[0])) {
      const newurl = url
        .replace("master", "original")
        .replace("_square1200", "")
        .split(`${parameter[0]}`)[1];
      const urlPixivOriginal = "https://i.pximg.net".concat(newurl);
      return urlPixivOriginal;
    } else if (url.includes(parameter[1])) {
      if (url.includes("_custom1200")) {
        const newurl = url
          .replace("/custom-thumb", "img-original")
          .replace("_custom1200", "")
          .split(`${parameter[1]}`)[1];
        const urlPixivOriginal = "https://i.pximg.net/".concat(newurl);
        return urlPixivOriginal;
      } else {
        const newurl = url
          .replace("master", "original")
          .replace("_square1200", "")
          .split(`${parameter[1]}`)[1];
        const urlPixivOriginal = "https://i.pximg.net".concat(newurl);
        return urlPixivOriginal;
      }
    } else if (url.includes(parameter[2])) {
      if (url.includes("_custom1200")) {
        const newurl = url
          .replace("/custom-thumb", "img-original")
          .replace("_custom1200", "")
          .split("c/360x360_70")[1];
        const urlPixivOriginal = "https://i.pximg.net/".concat(newurl);
        return urlPixivOriginal;
      } else {
        const newurl = url
          .replace("master", "original")
          .replace("_square1200", "")
          .split(`${parameter[2]}`)[1];
        const urlPixivOriginal = "https://i.pximg.net/".concat(newurl);
        return urlPixivOriginal;
      }
    } else if (url.includes(parameter[3])) {
      const newurl = url
        .replace("master", "original")
        .replace("_master1200", "")
        .split("c/540x540_70/")[1];
      const urlPixivOriginal = "https://i.pximg.net".concat(newurl);
      return urlPixivOriginal;
    } else {
      const urlPixivOriginal = url
        .replace("master", "original")
        .replace("_master1200", "");
      return urlPixivOriginal;
    }
  }
}
