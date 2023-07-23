import { Artwork } from "../interface/artwork";


export const myHeaders = new Headers();
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");

export const requestOptions = {
  method: "GET",
  headers: myHeaders,
};
export class API {
  static sendGetRequest<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(url,  {
          method: 'get',
          credentials: 'same-origin'
        }
          )
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
  static async getArtworkTwitter(id: string) : Promise<any> {
    const url = `https://gettweet.onrender.com/tweet/${id}`
    return this.sendGetRequest(url);
  }
  static getArtwork(id: any): Promise<Artwork> {
    const url = `https://www.pixiv.net/ajax/illust/${id}`;
    return this.sendGetRequest(url);
  }

  static getAllArtworks(id: string): Promise<Artwork> {
    const url = `https://www.pixiv.net/ajax/user/${id}/profile/all`;
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
  })
}
}


