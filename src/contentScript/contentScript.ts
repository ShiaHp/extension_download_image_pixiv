import { ArtworkData } from './../utils/api';
import { API, myHeaders } from "../utils/api";
import {
  getImageUrl,
  clearImageUrl,
  getImageUrlOriginal,
} from "../utils/storage";
import { checkURL, idReg, checkboxCss, buttonCss, myImagecss, buttonDownloadAllCss } from "../utils/checkUrl";

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

const body = document.getElementsByTagName("body")[0];
body.appendChild(buttonDownloadAll);
body.appendChild(styleImage)
body.appendChild(styleButtonAll);
let linkImg = "";

setInterval(() => {
  for (let i = 2; i < imagesArray.length; i++) {
    if (
      imagesArray.length > 2 &&
      imagesArray[i].parentElement &&
      imagesArray[i].parentElement.childNodes &&
      imagesArray[i].parentElement.childNodes.length <= 1
    ) {
      const checkbox = document.createElement("input");
      const style = document.createElement("style");
      style.innerHTML = checkboxCss
      checkbox.className = "stylecheckbox"
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";
      body.appendChild(style)


      const button = document.createElement("button");
      button.innerText = "\u21E9";
      const stylebutton = document.createElement("style");
      stylebutton.innerHTML = buttonCss
      button.className = "buttonCss"
      body.appendChild(stylebutton)

      checkbox.addEventListener("click", function (e: any) {
        e.stopPropagation();

        const id = e.path[1].innerHTML.match(idReg)[0];
        // check if the id is already in array
        if (imgIdArr.includes(id)) {
          const index = imgIdArr.indexOf(id);
          imgIdArr.splice(index, 1);
        } else {
          imgIdArr.push(id);
        }
      });

      imagesArray[i].addEventListener("mouseover", function (e) {
        myImage.src = this.src;
        linkImg = this.src;
      });
      imagesArray[i].parentElement.appendChild(button);
      imagesArray[i].parentElement.appendChild(checkbox);

      button.onclick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        checkImage(linkImg);
      };
    }
  }
}, 100);

buttonDownloadAll.addEventListener("click", async function (e) {

  if (imgIdArr.length > 0) {
    const urlArr = [];

    const isAllCheck = false;
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(
      (el: any) => (el.checked = isAllCheck)
    );
    for (let i = 0; i < imgIdArr.length; i++) {
      const data = await API.getArtwordData(imgIdArr[i]);
      urlArr.push(checkURL.classifiedPageCount(data));
    }
    const flatUrl : any[] = urlArr.flat();
    const response = flatUrl.map((artworkAfterClassified)=> {   
      return downloadImage(artworkAfterClassified);
    })

    await Promise.all(response).then(() => {
      imgIdArr = [];
    });
  } else {
    alert("Please select artworks");
  }
});
let countQueue = 0;
let queue = [];
let queueCountEveryArtworkHadBeenChoosed = [];
const myProgress = document.createElement("div");
myProgress.setAttribute("id", "myProgress");
const processBar = document.createElement("div");
processBar.setAttribute("id", "myBar");
myProgress.appendChild(processBar);

async function createProcess(responseafterdownload, filename, urlFromAPI) {

  myProgress.style.width = "100px";
  myProgress.style.height = "10px";
  myProgress.style.backgroundColor = "#ddd";
  myProgress.style.display = "none";
  processBar.style.fontSize = "15px";
  processBar.style.width = "10%";
  processBar.style.height = "10px";
  myProgress.style.zIndex = "1000";
  processBar.style.backgroundColor = "#04AA6D";
  myProgress.style.position = "fixed";
  myProgress.style.right = "0";
  myProgress.style.bottom = "0";
  myProgress.style.padding = "0.5rem";
  myProgress.style.margin = "0.5rem 0.5rem 0.5rem 0";
  myProgress.style.display = "block";
  processBar.style.display = "block";
  myProgress.style.bottom = `${countQueue * 10} px`;
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
    receivedLength == contentLength ||
    processBar.innerHTML == "100%" ||
    processBar.innerHTML == "Infinity%"
  ) {
    myProgress1.style.display = "none";
    processBar.style.width = 0 + "%";
    processBar.innerHTML = 0 + "%";
  }
}



async function asyncEachUrl(array, callback) {
  // let countTime = 0;
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function checkImage(url: string) {
  queue = []
  const data = await checkURL.checkData(url);
  const nameArtist = data.body.userName;
  const count = data.body.pageCount;
  const urlFromAPI = data.body.urls.original;
  queueCountEveryArtworkHadBeenChoosed.push(urlFromAPI);
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

    // limit batch download to 10 image
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
const fetchOptions = {
  method: "get",
  credentials: "same-origin",
  headers: myHeaders,
};
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
      fetchOptions
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

chrome.storage.local.get("arrUrl1", async function (res) {
  if (res || res.arrUrl1.length > 0) {

    const response = res.arrUrl1.map((url) => {
      return downloadImage(url);
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        chrome.runtime.sendMessage({ notification: "Close" });
        resolve();
      }, 2000);
    });
    await Promise.all(response);
  }
});

clearImageUrl();
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}

