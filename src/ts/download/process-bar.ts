import { ChromeCommand } from "../utils/chrome-command";

const body = document.getElementsByTagName("body")[0];

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
  constructor () {
    this.createElements();
  }

  private readonly wrapHTML = `
    <div class="container">
    <span class="container__progress-text"></span>
    <div class="progress-bar__container">
      <div class="progress-bar">
        <span class="progress-bar__text">0</span>
      </div>
    </div>
  </div>
  `

  private wrap!: HTMLDivElement;
  private progress!: HTMLDivElement;
  private progressText!: HTMLSpanElement;
  private progressBar!: HTMLDivElement
  private progressBarText!: HTMLSpanElement;

  private readonly KB = 1024
  private readonly MB = 1024 * 1024

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private createElements () {
    this.wrap = useSlot(this.wrapHTML) as HTMLDivElement;
    this.progress = this.wrap.querySelector('.progress-bar__container');
    this.progressText = this.wrap.querySelector('.container__progress-text')
    this.progressBar = this.wrap.querySelector('.progress-bar');
    this.progressBarText = this.wrap.querySelector('.progress-bar__text');

  };

  public async createProgress (downloadRes: Response, fileName: string) {
    const existingProgressBar = document.querySelector('.progress-bar__container');

    if (existingProgressBar) {
      this.show();
    };

    let dataDownload = downloadRes.clone();
    const contentLength = +downloadRes.headers.get("Content-Length");
    const reader = dataDownload.body.getReader();
    this.sendDownload(downloadRes, fileName);
    await this.readContentLength(contentLength, reader);
  }

  public async readContentLength (
    contentLength: number,
    reader: ReadableStreamDefaultReader<Uint8Array>,
  ) {
    let receivedLength = 0;
    let total = '';
    total = `Total: ${(contentLength / this.MB).toFixed(1)} MB`;
    this.setTotalProgress(total);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      receivedLength += value.length;
      const percentage = Math.floor((receivedLength / contentLength) * 100);

      this.updateProgressBar(percentage);
    };



    if ((receivedLength === contentLength) || this.isFinishLoad() ) {
      this.reset(100, 0);
      this.hide();
    }
  };

  private sendDownload (downloadRes: Response, fileName: string) {
    return downloadRes.blob().then(async (blob) => {
      const url = URL.createObjectURL(blob);
      ChromeCommand.sendDownload(url, fileName);
    })
  };


  updateProgressBar (percentage: number) {
   if (percentage <=0 ) {
    this.progressBarText.style.display = "initial"
   };
    this.progressBar.style.width = percentage + "%";
    this.progressBarText.innerHTML = percentage + "%";
    this.progress.style.boxShadow = '0 0 5px #4895ef';
  }

  show () {
    this.wrap.style.display = 'block';
  }

  hide() {
    this.wrap.style.display = 'none';
  }

  setTotalProgress(downloaded: string | number) {
    if (typeof downloaded  === 'number') {
      this.progressText.innerText = downloaded.toString();
    } else {
      this.progressText.innerText = downloaded;
    }
  }

  isFinishLoad() {
    return this.progressBarText.innerHTML === '100%' || this.progressBarText.innerHTML === 'Infinity%'
  }

  reset(progressBarNum: number, downloadNum: number = 0) {
    if (progressBarNum === 0) {
      this.hide;
    }

    this.setTotalProgress(downloadNum)
  }
}
const progressBar = new ProgressBar()
export { progressBar }
