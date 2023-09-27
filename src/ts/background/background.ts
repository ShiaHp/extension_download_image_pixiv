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
    const data = await Utils.checkData(url, 'id');
    const urlFromAPI = data.body.urls.original;
    const nameArtist = data?.body.userName || '';
   const dataAFterDownload = await getUrlAfterDownload(
    urlFromAPI,
    nameArtist
  ) as Response;
  sendDownload(dataAFterDownload, 'something');
  }

});

function sendDownload(downloadRes, fileName) {
  console.log('downloadRes', downloadRes);
  chrome.downloads.download({url: 'data:application/json;base64,' + btoa(JSON.stringify(downloadRes.url)), filename: 'file'})

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
