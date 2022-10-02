import { API } from "../utils/api";
import {
  getImageUrl,
  clearImageUrl,
  getImageUrlOriginal,
} from "../utils/storage";
import { checkURL, idReg } from "../utils/checkUrl";
const myHeaders = new Headers();
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");
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
        a.download = `pixiv-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      })
      .then(() => {
        if (msg === "undifined") {
          console.log("Shiawase ハンサム ");
        } else {
          chrome.runtime.sendMessage({ notification: "Close" });
        }
      })
      .catch((e) => {
        downloadImage(url);
        resolve(e);
        chrome.runtime.sendMessage({ notification: `reload-extension"` });
      });
  });
}

let imgIdArr = [];
const imagesArray = document.getElementsByTagName("img");

let myImage = document.createElement("img") as HTMLImageElement;
myImage.style.borderRadius = "5px";
myImage.style.border = "1px solid black";
myImage.style.padding = "5px";
myImage.style.width = "150px";
const buttonDownloadAll = document.createElement("button");
buttonDownloadAll.innerHTML = "Download all";
buttonDownloadAll.style.zIndex = "9999";
buttonDownloadAll.style.backgroundColor = "#52e010";
buttonDownloadAll.style.borderRadius = "5px";
buttonDownloadAll.style.fontSize = "18px";
buttonDownloadAll.style.alignContent = "center";
buttonDownloadAll.style.color = " #fff";
buttonDownloadAll.style.position = "fixed";
buttonDownloadAll.style.right = "0";
buttonDownloadAll.style.bottom = "350px";
buttonDownloadAll.style.padding = "0.5rem";
buttonDownloadAll.style.margin = "0.5rem 0.5rem 0.5rem 0";
buttonDownloadAll.style.transition = "0.2s all";
buttonDownloadAll.style.cursor = "pointer";
buttonDownloadAll.style.transform = "scale(0.98)";
buttonDownloadAll.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
const body = document.getElementsByTagName("body")[0];

body.appendChild(buttonDownloadAll);

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
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";

      checkbox.style.fontSize = "20px";
      checkbox.style.position = "absolute";
      checkbox.style.borderRadius = "5px";
      checkbox.style.zIndex = "9998";
      checkbox.style.top = "0px";
      checkbox.style.left = "0px";
      checkbox.style.height = "25px";
      checkbox.style.width = "25px";
      checkbox.style.backgroundColor = "rgba(255, 255, 255, 0.5rem)";

      const button = document.createElement("button");
      button.innerText = "\u21E9";
      button.style.zIndex = "9999";
      button.style.backgroundColor = "#52e010";
      button.style.borderRadius = "5px";
      button.style.fontSize = "18px";
      button.style.alignContent = "center";
      button.style.color = " #fff";
      button.style.position = "absolute";
      button.style.right = "0";
      button.style.top = "1rem";
      button.style.padding = "0.5rem";
      button.style.margin = "0.5rem 0.5rem 0.5rem 0";
      button.style.transition = "0.2s all";
      button.style.cursor = "pointer";
      button.style.transform = "scale(0.98)";
      button.style.opacity = "0.5rem";

      button.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";

      checkbox.addEventListener("click", function (e) {
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
      (el) => (el.checked = isAllCheck)
    );
    for (let i = 0; i < imgIdArr.length; i++) {
      const data = await API.getArtwordData(imgIdArr[i]);
      if (data.body.pageCount <= 1) {
        urlArr.push(data.body.urls.original);
      } else {
        for (let i = 0; i < data.body.pageCount; i++) {
          const url = `${data.body.urls.original}`.replace("_p0", `_p${i}`);
          urlArr.push(url);
        }
      }
    }
    const response = urlArr.map((url) => {
      return downloadImage(url);
    });

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
  responseafterdownload.blob().then( async (blob) => {
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
function pauseDownload(msg) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, msg || 1000);
  });
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
    chrome.runtime.sendMessage({ notification: `reload-extension"` });
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
    notification: "download-filename",
    url: urlInput,
    filename: filename,
  });
}
async function downloadImageFromTwitter(url : string, msg='undifined'){
  console.log('HI')
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "get",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `twitter-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      }).then(() => {
        if (msg === "undifined") {
          console.log("Shiawase ハンサム ");
        } else {
          chrome.runtime.sendMessage({ notification: "Close" });
        }
      })
  });
}


getImageUrlOriginal().then(async (res) => {
  if (res.length > 0) {
    downloadImageFromTwitter(res,'Close');
  }
});

chrome.storage.local.get("arrUrl1", async function (res) {
  if (res || res.arrUrl1.length > 0) {
    console.log(res.arrUrl1);
    const response = res.arrUrl1.map((url) => {
      return downloadImage(url);
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        chrome.runtime.sendMessage({ notification: "Close" });
        resolve();
      }, 2000);
    });
    await Promise.all(response);
  }
});

clearImageUrl();
