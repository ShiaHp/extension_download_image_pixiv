import { Artwork } from './../interface/artwork';
import { idPixiv, idTweet, Utils, format_twitter, format_pixiv } from "../utils/classified";
import {
  setImageUrlOriginalStorage,
} from "../utils/storage";
import { API } from "../utils/api";
import { responseListener } from './header'

// REQUEST REGION
// chrome.webRequest.onHeadersReceived.addListener(
//   responseListener,
//   {
//     urls: ["*://*.pximg.net/*", "*://*.pixiv.cat/*"],
//   },
//   ["blocking", "responseHeaders", "extraHeaders"]
// );

const callAPI = async (id: string, type: number): Promise<object> => {
  const apiName = {
    0: API.getArtwork(id),
    1: API.getArtworkTwitter(id),
  }
  let infoArtwork: object = {};
  await apiName[type].then((data : object) => {
      infoArtwork = data;
    });
  return infoArtwork;
};

const createNewTab = (infoArtwork, type : number) => {
  const in4toOpen = type == format_pixiv ? infoArtwork.body.urls.original : Object.values(infoArtwork)[0] as string;
  chrome.tabs.create({
    active: false,
    url: in4toOpen,
  });
  setImageUrlOriginalStorage(in4toOpen);
}

const functionDownloadImage = async (id: string, type: number) => {
  const infoArtwork: Artwork = await callAPI(id, type)

  const artworkName = {
    0: infoArtwork?.body?.pageCount,
    1: infoArtwork,
  }
  if (type === format_twitter || artworkName[type] <=1) {
    createNewTab(infoArtwork, type)
  } else  {
    const imgList = [];
    for (let i = 0; i < artworkName[type]; i++) {
      const url = `${infoArtwork.body.urls.original}`.replace("_p0", `_p${i}`);
      imgList.push(url);
    }
    chrome.storage.local.set({ arrUrl1: imgList, isClose : 1 }, () => {
      chrome.tabs.query({}, async() => {
        chrome.tabs.create(
          {
            active: false,
            url: infoArtwork.body.urls.original,
          },
        );

      });
    });
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ["selection", "link"],
    title: "Download image from this code",
    id: "download-image",
  });

});
chrome.contextMenus.onClicked.addListener((event) => {
  if (event.selectionText) {
    functionDownloadImage(event.selectionText, format_pixiv );
  } else {
    const typeToCheck: number = Utils.isPixiv(event.linkUrl)
    const exactName: string = typeToCheck == format_pixiv  ? event.linkUrl.match(idPixiv)[0] : event.linkUrl.match(idTweet)[0]
    functionDownloadImage(exactName, typeToCheck);
  }
});
chrome.runtime.onMessage.addListener(function (request) {
  const data = request.data || 1;

  function closeTab() {
    return chrome.tabs.query({}, (tabs) => {
        for (let i = 1; i <= data; i++) {
          chrome.tabs.remove(tabs[tabs.length - i].id);
        }
      })
    }
  function reloadextension() {
    return chrome.runtime.requestUpdateCheck(() => {
        chrome.runtime.reload();
      });
    }
  function downloadFileName() {
    return chrome.downloads.download({
       url: request.url,
       filename: `downloadFromPixiv/${request.filename}/pixiv-${Date.now()}.filename`,
       conflictAction: 'overwrite',
       saveAs: false,
     })
   }
  const getFunctionStrategies = {
    Close: closeTab,
    reloadextension: reloadextension,
    downloadfilename: downloadFileName
  }
 function getFunction(typeFunction) {
     return getFunctionStrategies[typeFunction]
  }
  if(request.notification ){
    getFunction(request.notification).call()
  }



});
