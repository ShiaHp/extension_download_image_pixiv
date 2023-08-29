import { API, myHeaders, requestOptions } from "../utils/api";
import {
  getImageUrl,
  clearImage,
  getImageUrlOriginal,
} from "../utils/storage";
import { ExtraNode, Utils, idPixiv } from "../utils/classified";
import { checkboxCss, buttonDownloadAllCss } from '../../style/button';
import { toast } from "../toast/toast";
import { get } from 'lodash';


function downloadImage(url: string, msg = "undifined") {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "get",
      credentials: "same-origin",
      headers: myHeaders,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `Ex-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      })
      .then(() => {
        toast.success('Download Image', 'Download image success');
        if (msg === "undifined") {
          return
        } else {
          chrome.runtime.sendMessage({ notification: "Close" });
        }
      })
      .catch((e) => {
        downloadImage(url);
        resolve(e);
        chrome.runtime.sendMessage({ notification: `reloadextension"` });
      });
  });
}
const body = document.getElementsByTagName("body")[0];
const button = document.createElement("button");
button.innerText = "\u21E9";
button.classList.add("buttonCss");
button.style.opacity = "0";
let queue = [];

const myProgress = document.createElement("div");
myProgress.setAttribute("id", "myProgress");
const processBar = document.createElement("div");
processBar.setAttribute("id", "myBar");
myProgress.appendChild(processBar);

async function createProcess(responseafterdownload, filename, urlFromAPI) {

  myProgress.classList.add('myProgress')
  processBar.style.display= "block";
  body.appendChild(myProgress);
  let dataDownload = await responseafterdownload.clone();
  const reader = dataDownload.body.getReader();
  const contentLength = +responseafterdownload.headers.get("Content-Length");
  await readContentLength(contentLength, reader, processBar, myProgress);
  responseafterdownload.blob().then(async (blob) => {
    const url = URL.createObjectURL(blob);
    sendDownload(url, filename);
  });
}


async function readContentLength(
  contentLength: number,
  reader,
  processBar,
  myProgress1
) {
  let receivedLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    receivedLength += value.length;
    processBar.style.width =
      Math.floor((receivedLength / contentLength) * 100) + "%";
    processBar.innerHTML =
      Math.floor((receivedLength / contentLength) * 100) + "%";
  }

  if (
    receivedLength === contentLength ||
    processBar.innerHTML === "100%" ||
    processBar.innerHTML === "Infinity%"
  ) {
    myProgress1.style.display = "none";
    processBar.style.width = 0 + "%";
    processBar.innerHTML = 0 + "%";
  }
}



async function asyncEachUrl(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function prevHandleBeforeDownload(url: string) {
  queue = []
  const data = await Utils.checkData(url);
  const nameArtist = data?.body.userName || '';
  const count = data.body.pageCount || 0;
  const urlFromAPI = data.body.urls.original;

  if (data.body.pageCount <= 1) {
    const responseafterdownload = await getUrlAfterDownload(
      urlFromAPI,
      nameArtist
    );

    createProcess(responseafterdownload, nameArtist, urlFromAPI);
  } else {
    for (let i = 0; i < count; i++) {
      const url = `${urlFromAPI}`.replace("_p0", `_p${i}`);
      const responseafterdownload = await getUrlAfterDownload(url, nameArtist);
      queue.push(responseafterdownload);
    }

    asyncEachUrl(queue, (artwork) => {
      createProcess(artwork, nameArtist, urlFromAPI)
    });
  }

}

function waitToDownloadAgain(delay: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

function getRetryDownload(
  newurl: string,
  delay: number,
  tries: number,
  fetchOptions: {}
) {
  function onError(err) {
    let triesLeft = tries - 1;
    if (!triesLeft) {
      throw new Error(err);
    }
    return waitToDownloadAgain(delay).then(() =>
      getRetryDownload(newurl, delay, triesLeft, fetchOptions)
    );
  }
  return fetch(newurl, fetchOptions).catch(onError);
}

async function getUrlAfterDownload(newurl: string, filename: string) {
  const responseafterdownload = await fetch(newurl, {
    method: "get",
    credentials: "same-origin",
    headers: myHeaders,
  }).catch(async (e) => {
    chrome.runtime.sendMessage({ notification: `reloadextension"` });
    const responseafterdownload = await getRetryDownload(
      newurl,
      3000,
      5,
      requestOptions
    );
    return responseafterdownload;
  });

  return responseafterdownload;
}

function sendDownload(urlInput, filename) {
  chrome.runtime.sendMessage({
    notification: "downloadfilename",
    url: urlInput,
    filename: filename,
  });
}

getImageUrlOriginal().then(async (res) => {
  if (res.length > 0) {
    downloadImage(res, 'Close');
  }
});

// chrome.storage.local.get("arrUrl1", async function (res) {
//   if (res || res.arrUrl1.length > 0) {
//     const response = res.arrUrl1.map((url) => {
//       return downloadImage(url);
//     });
//     let timeWaitToResolve = 2000

//     await new Promise<void>((resolve) => {
//       setTimeout(() => {
//         if(res.isClose == 1){
//           chrome.runtime.sendMessage({ notification: "Close" })
//         }
//         resolve();
//       }, timeWaitToResolve);
//     });
//     await Promise.all(response);
//   }
// });

clearImage();


const render = () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach((addedNode: ExtraNode) => {
        if (Utils.isImageNode(addedNode)) {
          let myImage = document.createElement("img") as HTMLImageElement;
          myImage.className = "myImage"
          addedNode.addEventListener('mouseover', function(e) {
            button.style.opacity = "1";
            addedNode.parentElement.appendChild(button);
            const srcImg = addedNode.currentSrc;


            myImage.src = srcImg;
            button.onclick = function(e) {
              e.preventDefault();
              prevHandleBeforeDownload(srcImg);
            }
          });

          addedNode.addEventListener('mouseout', function(e) {
            // button.style.opacity = "0";

          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

render();


