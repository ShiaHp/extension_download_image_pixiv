export interface DataFromPixiv {
  illusts: number[];
  manga?: number[];
}
export interface ArtworkData {
  body: {
    illustId: number;
    illustTitle: string;
    urls: {
      mini: string;
      original: string;
    };
    alt: string;
    pageCount : number
  };
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");
const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

export class API {
  static sendGetRequest<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject({
              status: response.status,
              statusText: response.statusText,
            });
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getBookMarkOfUser(
    id: string,
    type: "illusts" | "novel" = "illusts",
    offset: number | 48,
    limit: number | 48
  ): Promise<any> {
    const url = `https://www.pixiv.net/ajax/user/${id}/${type}/bookmarks?tag=&offset=${offset}&limit=${limit}&rest=show&lang=en`;
    return this.sendGetRequest(url);
  }

  static getArtwordData(id: string): Promise<ArtworkData> {
    const url = `https://www.pixiv.net/ajax/illust/${id}`;
    return this.sendGetRequest(url);
  }
  static getAllArtworks(id: string): Promise<any> {
    const url = `https://www.pixiv.net/ajax/user/${id}/profile/all`;
    return this.sendGetRequest(url);
  }
}
