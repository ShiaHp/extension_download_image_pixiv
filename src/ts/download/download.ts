import { API, RequestOptions } from '../utils/api';

class Downloader {
  private retries: number = 4;
  private delay: number = 1000;
  private url: string;
  private options: RequestOptions;
  constructor() {};

  startDownload(url: string, options: RequestOptions = {}) {
    this.options = options;
    this.url = url;
    return this.getRetryDownload(this.url, this.retries);
  };


  getRetryDownload(newurl: string, retries: number) {
    return fetch(newurl, this.options).catch(
     (e) => this.onError(e, retries))
  };

  private waitToDownloadAgain(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  private onError(e, tries) {
    let triesLeft = tries - 1;
    if (!triesLeft) {
      throw new Error(e);
    }
    return this.waitToDownloadAgain(this.delay).then(() =>
      this.getRetryDownload(this.url, triesLeft)
    );
  }
};


const downloader = new Downloader();
export default downloader;
