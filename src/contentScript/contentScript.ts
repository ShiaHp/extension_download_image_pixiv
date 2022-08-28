import { API } from "../utils/api";
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage,
  clearImageUrl,
  getImageUrlOriginal,
} from "../utils/storage";
import { checkURL } from "../utils/checkUrl";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");
const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

function downloadImage(url: string) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "get",
      credentials: "same-origin"
    })
      .then((response) => {
        if (response.status == 404) {
          const newUrlToFetch = response.url.replace(".jpg", ".png");
          return fetch(newUrlToFetch, {
            method: "get",
            credentials: "same-origin",
          });
        } else {
          return response;
        }
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
      .catch((e) => {
        console.log(e);
        alert("Please one more time。ありがとうございました。");
    
        chrome.runtime.sendMessage({ notification: `reload-extension"`});
      });
  });
}

const imagesArray = document.getElementsByTagName("img");

let linkImg = "";
setInterval(() => {
  for (let i = 2; i < imagesArray.length; i++) {
    if (
      imagesArray.length > 2 &&
      imagesArray[i].parentElement &&
      imagesArray[i].parentElement.childNodes &&
      imagesArray[i].parentElement.childNodes.length <= 1
    ) {
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
      button.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
      async function DownloadImage(url: string) {
        const count = await checkURL.checkManyPageCount(url);
        if (count <= 1) {
          const newUrl: any = checkURL.checkURLmedium(url);

          downloadImage(newUrl);
        } else {
          const newUrl: any = checkURL.checkURLmedium(url);
          for (let i = 0; i < count; i++) {
            const url = `${newUrl}`.replace("_p0", `_p${i}`);
            downloadImage(url);
          }
        }
      }

      imagesArray[i].addEventListener("mouseover", function (e) {
        linkImg = this.src;
      });
      button.onclick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        DownloadImage(linkImg);
      };
      imagesArray[i].parentElement.appendChild(button);
    }
  }
}, 1000);

getImageUrl().then((res) => {
  if (res.length > 0) {
    fetch(res, requestOptions).then((response) => {
      if (response.status == 404) {
        const newUrlToFetch = response.url.replace(".jpg", ".png");
        return fetch(newUrlToFetch, requestOptions);
      } else {
        return response;
      }
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
        chrome.runtime.sendMessage({ notification: "Close" });
      })
      .catch((e) => console.log(e));
  }
});

getImageUrlOriginal().then((res) => {
  if (res.length > 0) {
    fetch(res, {
      method: "get",
      credentials: "same-origin",
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
        chrome.runtime.sendMessage({ notification: "Close" });
      })
      .catch((e) => console.log(e));
  }
});

chrome.storage.local.get("arrUrl1", async function (res) {
  if (res || res.arrUrl1.length > 0) {
    const response = res.arrUrl1.map((url) => {
      return downloadImage(url);
    });

    await Promise.all(response).then((files) => {
      console.log(files);
    });
  }
});

chrome.storage.local.get("arrUrl", async function (res) {
  if (res || res.arrUrl.length > 0) {
    const response = res.arrUrl.map((url) => {
      return downloadImage(url);
    });
    await Promise.all(response).then((files) => {
      chrome.runtime.sendMessage({ notification: `Close`, data: files.length });
    });
  }
});

clearImageUrl();
