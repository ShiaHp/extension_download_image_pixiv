import { Artwork } from './../interface/artwork';
import { Utils, format_pixiv } from "../utils/classified";
import {
  setImageUrlOriginalStorage,
} from "../utils/storage";
import downloader from '../download/download';
import { prevHandleBeforeDownload } from '../contentScript/contentScript';
import { requestOptions } from '../utils/api';
import { ChromeCommand } from '../utils/chrome-command';



const createNewTab = (infoArtwork, type : number) => {
  const in4toOpen = type == format_pixiv ? infoArtwork.body.urls.original : Object.values(infoArtwork)[0] as string;
  chrome.tabs.create({
    active: false,
    url: in4toOpen,
  });
  setImageUrlOriginalStorage(in4toOpen);
}

// const functionDownloadImage = async (id: string, type: number) => {
//   const infoArtwork: Artwork = await callAPI(id, type)

//   const artworkName = {
//     0: infoArtwork?.body?.pageCount,
//     1: infoArtwork,
//   }
//   if (type === format_twitter || artworkName[type] <=1) {
//     createNewTab(infoArtwork, type)
//   } else  {
//     const imgList = [];
//     for (let i = 0; i < artworkName[type]; i++) {
//       const url = `${infoArtwork.body.urls.original}`.replace("_p0", `_p${i}`);
//       imgList.push(url);
//     }
//     chrome.storage.local.set({ arrUrl1: imgList, isClose : 1 }, () => {
//       chrome.tabs.query({}, async() => {
//         chrome.tabs.create(
//           {
//             active: false,
//             url: infoArtwork.body.urls.original,
//           },
//         );

//       });
//     });
//   }
// }

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ["selection", "link"],
    title: "Download image from this code",
    id: "download-image",
  });
});

const pattern = /illust_id=(\d+)/;

async function getUrlAfterDownload (newurl: string, filename: string): Promise<Response | void> {
  try {
    return downloader.startDownload(newurl, requestOptions)
  } catch (error) {
    chrome.runtime.sendMessage({ notification: 'reloadExt' })
  }
};

chrome.contextMenus.onClicked.addListener(async (event) => {
  const types = ['selectionText', 'linkUrl'];
  const eventTypes = types.filter(type => Object.keys(event).includes(type));

  if (eventTypes.includes('selectionText')) {

  } else if (eventTypes.includes('linkUrl')) {
    const belongsToWhatPlatform = Utils.isPixiv(event.linkUrl);
    const url = decodeURIComponent(event.linkUrl).match(pattern)[1];
    const data = await Utils.checkData(url);
    const urlFromAPI = data.body.urls.original
    const nameArtist = data?.body.userName || ''
   const dataAFterDownload = await  await getUrlAfterDownload(
    urlFromAPI,
    nameArtist
  ) as Response;
  sendDownload(dataAFterDownload, 'something');
  }

});

function sendDownload(downloadRes, fileName) {
  downloadRes.arrayBuffer().then(async (buffer) => {

    chrome.downloads.download({
      url: 'data:application/octet-stream;base64,' + btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')),
      filename: fileName,
    });
  });
}


chrome.runtime.onMessage.addListener(function (request) {
  const data = request.data || 1;

  const closeTab = () => {
    return chrome.tabs.query({}, (tabs) => {
        for (let i = 1; i <= data; i++) {
          chrome.tabs.remove(tabs[tabs.length - i].id);
        }
      })
    };

  const reloadExt = () => {
    return chrome.runtime.requestUpdateCheck(() => {
        chrome.runtime.reload();
      });
    };

  const downloadFileName = () => {
    return chrome.downloads.download({
       url: request.url,
       filename: `downloadFromPixiv/${request.filename}/pixiv-${Date.now()}.filename`,
       conflictAction: 'overwrite',
       saveAs: false,
     })
   };

  const getFunctionStrategies = {
    Close: closeTab,
    reloadExt: reloadExt,
    downloadfilename: downloadFileName
  }

 const getFunction = (typeFunction) => {
  return getFunctionStrategies[typeFunction]
}

  if(request.notification){
    getFunction(request.notification).call()
  }

});
