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
}
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
    }

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

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      receivedLength += value.length;
      const percentage = Math.floor((receivedLength / contentLength) * 100);

      this.updateProgressBar(percentage);
    };

    let total = '';
    total = `Total: ${(receivedLength / this.MB).toFixed(1)} MB`;
    this.progressText.innerText = total;

    if ((receivedLength === contentLength) || this.isFinishLoad() ) {
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

  isFinishLoad() {
    return this.progressBarText.innerHTML === '100%' || this.progressBarText.innerHTML === 'Infinity%'
  }
}
const progressBar = new ProgressBar()
export { progressBar }
