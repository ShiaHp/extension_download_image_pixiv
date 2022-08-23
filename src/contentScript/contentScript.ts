import { API } from "../utils/api";
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage,
  clearImageUrl,
  getImageUrlOriginal
} from "../utils/storage";
var myHeaders = new Headers();
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");
myHeaders.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
};

getImageUrl().then((res) => {
  if (res) {
    fetch(res, requestOptions)
      .then((response) => {
        if (response.status === 404) {
          return fetch(res.replace(".jpg", ".png"), requestOptions);
        } else{
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
    fetch(res, requestOptions)
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
  if (res.arrUrl1.length > 0) {
    const response = res.arrUrl1.map((url) => {
      return fetch(url, requestOptions)
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
        .catch((e) => console.log(e));
    });

    await Promise.all(response).then((files) => {
        console.log(files)
      
    });
  }
});









chrome.storage.local.get("arrUrl", async function (res) {
  if (res.arrUrl.length > 0) {
    const response = res.arrUrl.map((url) => {
      return fetch(url, requestOptions)
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
        .catch((e) => console.log(e));
    });

    await Promise.all(response).then((files) => {
      
        chrome.runtime.sendMessage({ notification: `Close` , data : files.length} )
      
     
    });
  }
});




clearImageUrl();
