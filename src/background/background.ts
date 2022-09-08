import { idReg } from "./../utils/checkUrl";
// TODO: background script
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage,
  setImageUrlOriginalStorage,
} from "../utils/storage";
import { API } from "../utils/api";
import { checkURL } from "../utils/checkUrl";
const regex = /access-control-allow-origin/i;

function removeMatchingHeaders(
  headers: chrome.webRequest.HttpHeader[],
  regex: RegExp
) {
  for (let i = 0, header; (header = headers[i]); i++) {
    if (header.name.match(regex)) {
      headers.splice(i, 1);
      return;
    }
  }
}

function responseListener(
  details: chrome.webRequest.WebResponseHeadersDetails
) {
  removeMatchingHeaders(details.responseHeaders!, regex);
  details.responseHeaders!.push({
    name: "access-control-allow-origin",
    value: "*",
  });

  return { responseHeaders: details.responseHeaders };
}

chrome.webRequest.onHeadersReceived.addListener(
  responseListener,
  {
    urls: ["*://*.pximg.net/*", "*://*.pixiv.cat/*"],
  },
  ["blocking", "responseHeaders", "extraHeaders"]
);

const functionDownloadImage = async (id: string) => {
  await API.getArtwordData(id).then((data) => {
    if (data.body.pageCount <= 1) {
      chrome.tabs.create({
        active: false,
        url: data.body.urls.original,
      });
      setImageUrlOriginalStorage(data.body.urls.original);
    } else {
      const imgList = [];
      for (let i = 0; i < data.body.pageCount; i++) {
        const url = `${data.body.urls.original}`.replace("_p0", `_p${i}`);
        imgList.push(url);
      }
      chrome.storage.local.set({ arrUrl1: imgList }, () => {
        chrome.tabs.query({}, async (tabs) => {

          chrome.tabs.create(
            {
              active: false,
              url: data.body.urls.original,
            },
          );

        });
      });
    }
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ["selection", "link"],
    title: "Download image from this code",
    id: "download-image",
  });

});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.selectionText) {
    functionDownloadImage(event.selectionText);
  } else {
    const urlPixiv = event.linkUrl.match(idReg)[0];
    functionDownloadImage(urlPixiv);
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  const data = request.data || 1;
  if (request.notification === "Close")
    chrome.tabs.query({}, (tabs) => {
      for (let i = 1; i <= data; i++) {
        chrome.tabs.remove(tabs[tabs.length - i].id);
      }
    });

  if (request.notification === "download") {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        if (tabs[0].url.startsWith("https://www.pixiv.net/en/artworks/")) {
          const id = tabs[0].url.split("https://www.pixiv.net/en/artworks/")[1];
          functionDownloadImage(id);
          chrome.runtime.sendMessage(
            { notification: "close-window" },
            () => { }
          );
        }
      }
    );
  }
  if (request.notification === "reload-extension") {
    chrome.runtime.requestUpdateCheck(() => {
      chrome.runtime.reload();
    });
  }
});
