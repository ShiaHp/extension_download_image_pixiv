import { API } from "./api";

export const idReg = /[0-9]{9}|[0-9]{8}|[0-9]{10}[0-9]{7}/;

export class checkURL {
  static async getDatafromRequest(url: string): Promise<any> {
    const id = url.match(idReg)[0];
    const data = await API.getArtwordData(id);
    return data;
  }
  static async checkData(url: string) {
    return this.getDatafromRequest(url).then((data) => data)
  }

 
}
