// TODO: background script
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage,
  setImageUrlOriginalStorage
} from "../utils/storage";
import { API } from "../utils/api";




const functionDownloadImage = async (id: string) => {
  await API.getArtwordData(id).then((data) => {
    chrome.tabs.create({
      active: false,
      url: data.body.urls.original,
    });
    setImageUrlOriginalStorage(data.body.urls.original);
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ["selection", "link"],
    title: "Download image from that code",
    id: "download-image",
  });

  chrome.contextMenus.onClicked.addListener(async (event) => {
    const UrlPixiv = `${event.linkUrl}`;
    const urlPixiv = event.linkUrl.match(/artworks\/(\d{2,15})/);
    const result = []
    const resultUrl = urlPixiv === null ? UrlPixiv : urlPixiv[1]
    if (resultUrl.length > 25) {
      fetch(resultUrl)
        .then((res) => res.text())
        .then((html) => {
          const url = html.match(/https.*?master1200/gm)[2].replace("master", "original").replace("_master1200", "") + ".jpg";
          chrome.tabs.create({
            active: false,
            url: url,
          });
          setImageUrlStorage(url);
        });
    } else {
      await API.getArtwordData(resultUrl).then((res) => {
        //  res.body.pageCount
        for (let i = 0; i < res.body.pageCount; i++) {
          const url = `${res.body.urls.original}`.replace('_p0', `_p${i}`)
          result.push(url)
          chrome.tabs.create({
            active: false,
            url: url,
          });
        }
        chrome.storage.local.set({ arrUrl: result }, () => {
          console.log(result)
        })
      })
    }


  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.selectionText.length <= 6) {
    chrome.tabs.create({
      url: `https://nhentai.net/g/${event.selectionText.trim()}`,

    });
  } else {
    setStoredSingle(event.selectionText);
    getStoredSingle().then(async (idSingle) => {
      await API.getArtwordData(idSingle).then((data) => {
        chrome.tabs.create({
          active: false,
          url: data.body.urls.original,
        });
        setImageUrlOriginalStorage(data.body.urls.original);
      });
    });
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
          chrome.runtime.sendMessage({ notification: "close-window" }, () => {

          });
        }
      }
    );
  }
});

