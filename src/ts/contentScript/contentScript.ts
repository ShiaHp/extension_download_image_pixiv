import { API, myHeaders, requestOptions } from "../utils/api";
import {
  getImageUrl,
  clearImage,
  getImageUrlOriginal,
} from "../utils/storage";
import { Utils, idPixiv } from "../utils/classified";
import { checkboxCss, buttonDownloadAllCss  } from '../../style/button';
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

let imgIdArr = [];
const imagesArray = document.getElementsByTagName("img");
let myImage = document.createElement("img") as HTMLImageElement;
const styleImage = document.createElement("style");
styleImage.innerHTML = checkboxCss
myImage.className = "myImage"

const buttonDownloadAll = document.createElement("button");
buttonDownloadAll.innerHTML = "Download all";
const styleButtonAll = document.createElement("style");
styleImage.innerHTML = buttonDownloadAllCss
buttonDownloadAll.className = "styleButtonAll"


body.appendChild(buttonDownloadAll);
body.appendChild(styleImage)
body.appendChild(styleButtonAll);
let linkImg = "";



// Create the button and checkbox outside the interval loop
const checkbox = document.createElement("input");
const style = document.createElement("style");
style.innerHTML = checkboxCss;
checkbox.className = "stylecheckbox";
checkbox.type = "checkbox";
checkbox.id = "checkbox";
document.body.appendChild(style);

const button = document.createElement("button");
button.innerText = "\u21E9";
button.classList.add("buttonCss");
button.style.opacity = "0"; // Initially set the opacity to 0 for fade-in effect
document.body.appendChild(button);

setInterval(() => {
  for (let i = 2; i < imagesArray.length; i++) {
    if (
      imagesArray.length > 2 &&
      imagesArray[i].parentElement &&
      imagesArray[i].parentElement.childNodes &&
      imagesArray[i].parentElement.childNodes.length <= 1
    ) {

      imagesArray[i].addEventListener("mouseover", function () {
        button.style.opacity = "1";
        checkbox.style.opacity = "1";
        const id = imagesArray[i].src.match(idPixiv)[0];

        myImage.src = this.src;
        linkImg = this.src;
        checkbox.addEventListener("click", function (e) {
          e.stopPropagation();

          // check if the id is already in array
          if (imgIdArr.includes(id)) {
            const index = imgIdArr.indexOf(id);
            imgIdArr.splice(index, 1);
          } else {
            imgIdArr.push(id);
          }
        });

        imagesArray[i].parentElement.appendChild(button);
        imagesArray[i].parentElement.appendChild(checkbox);

        button.onclick = function (e) {
          // e.stopPropagation();
          // e.preventDefault();
          checkImage(linkImg);
        };
      });

      imagesArray[i].addEventListener("mouseout", function () {
        button.style.opacity = "0";
        checkbox.style.opacity = "0";
      });
    }
  }
}, 100);

//   for (let i = 2; i < imagesArray.length; i++) {
//     if (
//       imagesArray.length > 2 &&
//       imagesArray[i].parentElement &&
//       imagesArray[i].parentElement.childNodes &&
//       imagesArray[i].parentElement.childNodes.length <= 1
//     ) {
//       imagesArray[i].addEventListener('mouseover', function() {
//         const checkbox = document.createElement("input");
//       const style = document.createElement("style");
//       style.innerHTML = checkboxCss
//       checkbox.className = "stylecheckbox"
//       checkbox.type = "checkbox";
//       checkbox.id = "checkbox";
//       body.appendChild(style)


//       const button = document.createElement("button");
//       button.innerText = "\u21E9";
//       button.classList.add('buttonCss');


//       checkbox.addEventListener("click", function (e: any) {
//         e.stopPropagation();

//         const id = e.path[1].innerHTML.match(idPixiv)[0];
//         // check if the id is already in array
//         if (imgIdArr.includes(id)) {
//           const index = imgIdArr.indexOf(id);
//           imgIdArr.splice(index, 1);
//         } else {
//           imgIdArr.push(id);
//         }
//       });
//       myImage.src = this.src;
//       linkImg = this.src;
//       imagesArray[i].parentElement.appendChild(button);
//       imagesArray[i].parentElement.appendChild(checkbox);

//       button.onclick = function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//         checkImage(linkImg);
//       };
//       })

//     }
//   }
// }, 100);




buttonDownloadAll.addEventListener("click", async function (e) {
  if (imgIdArr.length > 0) {
    const urlArr = [];

    const isAllCheck = false;
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(
      (el: any) => (el.checked = isAllCheck)
    );
    for (let i = 0; i < imgIdArr.length; i++) {
      const data = await API.getArtwork(imgIdArr[i]);
      urlArr.push(Utils.classifiedPageCount(data));
    }
    const flatUrl: any[] = urlArr.flat();
    const response = flatUrl.map((artworkAfterClassified) => {
      return downloadImage(artworkAfterClassified);
    })

    await Promise.all(response).then(() => {
      imgIdArr = [];
    })
  } else {
    alert("Please select an artwork");
  }
});

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

async function checkImage(url: string) {
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
