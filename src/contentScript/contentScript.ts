import { API } from "../utils/api";
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage,
  clearImageUrl,
  getImageUrlOriginal,

} from "../utils/storage";
import { checkURL, idReg } from "../utils/checkUrl";
import { checkboxClasses } from "@mui/material";


const myHeaders = new Headers();

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
      credentials: "same-origin",
      headers: myHeaders,
    }).then((response) => response.blob())
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
        console.log(e)
        downloadImage(url)
        resolve(e);
        chrome.runtime.sendMessage({ notification: `reload-extension"` });
      });
  });
}
let imgIdArr = []
const imagesArray = document.getElementsByTagName("img");
const button1 = document.createElement("button");
button1.innerHTML = "Download all";
button1.style.zIndex = "9999";
button1.style.backgroundColor = "#52e010";
button1.style.borderRadius = "5px";
button1.style.fontSize = "18px";
button1.style.alignContent = "center";
button1.style.color = " #fff";
button1.style.position = "fixed";
button1.style.right = "0";
button1.style.bottom = "350px";
button1.style.padding = "0.5rem";
button1.style.margin = "0.5rem 0.5rem 0.5rem 0";
button1.style.transition = "0.2s all";
button1.style.cursor = "pointer";
button1.style.transform = "scale(0.98)";
button1.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
const body = document.getElementsByTagName("body")[0];
body.appendChild(button1);
let linkImg = "";

setInterval(() => {
  for (let i = 2; i < imagesArray.length; i++) {
    if (
      imagesArray.length > 2 &&
      imagesArray[i].parentElement &&
      imagesArray[i].parentElement.childNodes &&
      imagesArray[i].parentElement.childNodes.length <= 1
    ) {



      const checkbox = document.createElement('input');
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
      button.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
      async function checkImage(url: string) {
        const count = await checkURL.checkManyPageCount(url);
        if (count <= 1) {
          const newUrl: any = await checkURL.checkURLmedium(url);

          downloadImage(newUrl);
        } else {
          const newUrl: any = await checkURL.checkURLmedium(url);
          for (let i = 0; i < count; i++) {
            const url = `${newUrl}`.replace("_p0", `_p${i}`);
            downloadImage(url);
          }
        }
      }

      checkbox.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = e.path[1].innerHTML.match(idReg)[0];
        // check if the id is already in array
        if (imgIdArr.includes(id)) {
          const index = imgIdArr.indexOf(id);
          imgIdArr.splice(index, 1)
        } else {
          imgIdArr.push(id);
        }


      })

      imagesArray[i].addEventListener("mouseover", function (e) {
        linkImg = this.src;
      });

      button.onclick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        checkImage(linkImg);
      };
      imagesArray[i].parentElement.appendChild(button);
      imagesArray[i].parentElement.appendChild(checkbox);
    }
  }
}, 1000);

button1.addEventListener("click", async function (e) {

  // const data = await API.getArtwordData(id);
  const urlArr = []
  for (let i = 0; i < imgIdArr.length; i++) {
    const data = await API.getArtwordData(imgIdArr[i])
    urlArr.push(data.body.urls.original)
  }
  const response = urlArr.map((url) => {
    return downloadImage(url)
  })

  await Promise.all(response).then(() => {
    imgIdArr = [];
    document.getElementById("checkbox")[0].checked = false
  });


})

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
