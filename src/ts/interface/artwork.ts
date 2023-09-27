export interface PixivImages {
  illusts: number[];
  manga?: number[];
}

export interface Artwork {
  error: boolean;
  message: string;
  body: {
    illustId: string;
    illustTitle: string;
    illustComment: string;
    id: string;
    title: string;
    description: string;
    illustType: number;
    createDate: string;
    uploadDate: string;
    restrict: number;
    xRestrict: number;
    sl: number;
    urls: {
      mini: string;
      thumb: string;
      small: string;
      regular: string;
      original: string;
    };
    tags: {
      authorId: string;
      isLocked: boolean;
      tags: Tag[];
      writable: boolean;
    };
    alt: string;
    userId: string;
    userName: string;
    userAccount: string;
    userIllusts: Record<string, UserIllust | null>;
    likeData: boolean;
    width: number;
    height: number;
    pageCount: number;
    bookmarkCount: number;
    likeCount: number;
    commentCount: number;
    responseCount: number;
    viewCount: number;
    bookStyle: string;
    isHowto: boolean;
    isOriginal: boolean;
    imageResponseOutData: any[];
    imageResponseData: any[];
    imageResponseCount: number;
    pollData: null | any;
    seriesNavData: null | any;
    descriptionBoothId: null | any;
    descriptionYoutubeId: null | any;
    comicPromotion: null | any;
    fanboxPromotion: null | any;
    contestBanners: any[];
    isBookmarkable: boolean;
    bookmarkData: null | any;
    contestData: null | any;
    zoneConfig: {
      responsive: Zone;
      rectangle: Zone;
      "500x500": Zone;
      header: Zone;
      footer: Zone;
      expandedFooter: Zone;
      logo: Zone;
      relatedworks: Zone;
    };
    extraData: {
      meta: {
        title: string;
        description: string;
        canonical: string;
        alternateLanguages: {
          [key: string]: string;
        };
        descriptionHeader: string;
        ogp: {
          description: string;
          image: string;
          title: string;
          type: string;
        };
        twitter: {
          description: string;
          image: string;
          title: string;
          card: string;
        };
      };
    };
    titleCaptionTranslation: {
      workTitle: null | any;
      workCaption: null | any;
    };
    isUnlisted: boolean;
    request: null | any;
    commentOff: number;
    aiType: number;
    reuploadDate: null | any;
  };
}

interface Zone {
  url: string
}
interface Tag {
  tag: string;
  locked: boolean;
  deletable: boolean;
  userId: string;
  romaji: string;
  translation: {
    en: string;
  };
  userName: string;
}

interface UserIllust {
  id: string;
  title: string;
  illustType: number;
  xRestrict: number;
  restrict: number;
  sl: number;
  url: string;
  description: string;
  tags: string[];
  userId: string;
  userName: string;
  width: number;
  height: number;
  pageCount: number;
  isBookmarkable: boolean;
  bookmarkData: null | any;
  alt: string;
  titleCaptionTranslation: {
    workTitle: null | any;
    workCaption: null | any;
  };
  createDate: string;
  updateDate: string;
  isUnlisted: boolean;
  isMasked: boolean;
  aiType: number;
  profileImageUrl: string;
}

