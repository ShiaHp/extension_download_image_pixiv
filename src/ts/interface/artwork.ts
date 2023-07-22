export interface PixivImages {
  illusts: number[];
  manga?: number[];
}

export interface Artwork {
  body?: {
    illustId: number;
    illustTitle: string;
    urls: {
      mini: string;
      original: string;
    };
    alt: string;
    pageCount : number,
    userName: string;
  };
}
