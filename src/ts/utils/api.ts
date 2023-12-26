import { Artwork } from "../interface/artwork";

interface FetchCredentials {
  'omit': 'omit';
  'same-origin': 'same-origin';
  'include': 'include';
};

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  headers?: Headers,
  credentials?: 'include' | 'same-origin' | 'omit'
}

export const myHeaders = new Headers();
export const requestOptions: RequestOptions = {
  method: "GET",
  headers: myHeaders,
  credentials: 'same-origin'
};
export class API {
  static sendGetRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(url, options)
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
  static getArtwork(id: string): Promise<Artwork> {
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
};


