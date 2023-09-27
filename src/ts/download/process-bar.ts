import { ChromeCommand } from "../utils/chrome-command";

const useSlot = (element: string | HTMLElement) => {
  // https://stackoverflow.com/questions/27079598/error-failed-to-execute-appendchild-on-node-parameter-1-is-not-of-type-no
  if(typeof element === 'string') {
    const wrap = document.createElement('div');
    wrap.innerHTML = element;
    const el = wrap.children[0];
    document.body.appendChild(el);
    return el;
  }
};

class ProgressBar {
  constructor() {
    this.createElements();
  }

  private readonly wrapHTML = `
    <div class="pgr-container">
    <span class="display-total"></span>
    <div class="progress-bar-container">
      <div class="display-progress">
        <span class="progress-text"></span>
      </div>
      <div class="progress-bar"></div>
    </div>
  </div>
  `;

  private wrap!: HTMLDivElement;
  private progress!: HTMLDivElement;
  private progressText!: HTMLSpanElement;
  private progressBar!: HTMLDivElement;
  private total!: HTMLSpanElement;

  private readonly KB = 1024;
  private readonly MB = 1024 * 1024;

  private createElements() {
    this.wrap = useSlot(this.wrapHTML) as HTMLDivElement;
    console.log('this.wrap ', this.wrap )
    this.progress = this.wrap.querySelector('pgr-container')!;
    this.progressText = this.wrap.querySelector('.progress-text')!;
    this.progressBar = this.wrap.querySelector('.progress-bar')!;
    this.total = this.wrap.querySelector('.display-total')!;

    console.log('this.progress', this.progress)
  }

  public async createProgress(downloadRes: Response, fileName: string) {
    // const existingProgressBar = document.querySelector('.progress-bar-container');

    // if (existingProgressBar) {
    //   this.show();
    // }

    // let dataDownload = downloadRes.clone();
    // const contentLength = +downloadRes.headers.get('Content-Length');
    // const reader = dataDownload.body.getReader();
    // this.sendDownload(downloadRes, fileName);
    // await this.readContentLength(contentLength, reader);
  }

  // public async readContentLength(
  //   contentLength: number,
  //   reader: ReadableStreamDefaultReader<Uint8Array>
  // ) {
  //   let receivedLength = 0;
  //   let total = `Total: ${(contentLength / this.MB).toFixed(1)} MB`;
  //   this.setTotalProgress(total);

  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) {
  //       break;
  //     }

  //     receivedLength += value.length;
  //     const percentage = Math.floor((receivedLength / contentLength) * 100);

  //     this.updateProgressBar(percentage);
  //   }

  //   if (receivedLength === contentLength || this.isFinishLoad()) {
  //     this.reset(100, 0);
  //     this.hide();
  //   }
  // }

  // private sendDownload(downloadRes: Response, fileName: string) {
  //   return downloadRes.blob().then(async (blob) => {
  //     const url = URL.createObjectURL(blob);
  //     ChromeCommand.sendDownload(url, fileName);
  //   });
  // }

  // updateProgressBar(percentage: number) {
  //   if (percentage <= 0) {
  //     this.progressText.style.display = 'initial';
  //   }
  //   this.progressBar.style.width = percentage + '%';
  //   this.progressText.innerHTML = percentage + '%';
  //   this.progressBar.style.boxShadow = '0 0 5px #4895ef';
  // }

  // show() {
  //   this.wrap.style.display = 'block';
  // }

  // hide() {
  //   this.wrap.style.display = 'none';
  // }

  // setTotalProgress(downloaded: string | number) {
  //   if (typeof downloaded === 'number') {
  //     this.total.innerText = downloaded.toString();
  //   } else {
  //     this.total.innerText = downloaded;
  //   }
  // }

  // isFinishLoad() {
  //   return (
  //     this.progressText.innerHTML === '100%' ||
  //     this.progressText.innerHTML === 'Infinity%'
  //   );
  // }

  // reset(progressBarNum: number, downloadNum: number = 0) {
  //   if (progressBarNum === 0) {
  //     this.hide();
  //   }

  //   this.setTotalProgress(downloadNum);
  // }
}

const progressBar = new ProgressBar()
export { progressBar }
