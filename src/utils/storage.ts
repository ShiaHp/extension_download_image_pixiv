export interface LocalStorage {
  idSingle?: string;
  options?: LocalStorageOptions;
  imgUrl?: string;
  idArtist?: string;
  arrUrl?: Array<string>;
  imgUrlOriginal? : string;
}
export interface LocalStorageOptions {
  userDefault: string;
}
export type LocalStorageKeys = keyof LocalStorage;

export function setStoredSingle(idSingle: string): Promise<void> {
  const vals: LocalStorage = {
    idSingle,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
export function getStoredSingle(): Promise<string> {
  const keys: LocalStorageKeys = "idSingle";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.idSingle ?? "");
    });
  });
}
export function setImageUrlStorage(imgUrl: string): Promise<void> {
  const vals: LocalStorage = {
    imgUrl,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function setImageUrlOriginalStorage(imgUrlOriginal: string): Promise<void> {
  const vals: LocalStorage = {
    imgUrlOriginal,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
export function getImageUrlOriginal(): Promise<string> {
  const keys: LocalStorageKeys = "imgUrlOriginal";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.imgUrlOriginal ?? "");
    });
  });
}
export function getImageUrl(): Promise<string> {
  const keys: LocalStorageKeys = "imgUrl";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.imgUrl ?? "");
    });
  });
}

export function clearImageUrl(): Promise<void> {
  const keys: LocalStorageKeys = "imgUrl";
  return new Promise(() => {
    chrome.storage.local.clear();
  });
}

export function setIDArtistStorage(idArtist: string): Promise<void> {
  const val: LocalStorage = {
    idArtist,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(val, () => {
      resolve();
    });
  });
}

export function getIDArtistStorage(): Promise<string> {
  const keys: LocalStorageKeys = "idArtist";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.idArtist ?? "");
    });
  });
}
