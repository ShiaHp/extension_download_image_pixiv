// TODO: background script
import {
  setStoredSingle,
  getStoredSingle,
  getImageUrl,
  setImageUrlStorage
} from '../utils/storage'
import { API } from '../utils/api'


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ['selection', 'link'],
    title: 'Download image from that code',
    id: 'download-image'
  })

  chrome.contextMenus.onClicked.addListener((event) => {
    const UrlPixiv = `${event.linkUrl}`;

    fetch(UrlPixiv)
      .then((res) => res.text())
      .then((html) => {
        const url = html.match(/https.*?master1200/gm)[2] + ".jpg";
        // const newUrl = url.replace('master', 'original').split('_master1200')[0] + ".jpg" | '.png';

        chrome.tabs.create({
          active: false,
          url: url,
        });
        setImageUrlStorage(url)

      });
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.selectionText.length <= 6) {
    chrome.tabs.create({
      url: `https://nhentai.net/g/${event.selectionText.trim()}`,
    });
  } else {
  setStoredSingle(event.selectionText)
  getStoredSingle().then(async (idSingle) => {
    await API.getArtwordData(idSingle).then((data) => {
      chrome.tabs.create({
        active: false,
        url: data.body.urls.original,
      });
      setImageUrlStorage(data.body.urls.original)
    })
  })
}
})


chrome.runtime.onMessage.addListener(function (request) {
  if (request.notification === "Close")
    chrome.tabs.query({}, (tabs) => {
      chrome.tabs.remove(tabs[tabs.length - 1].id);
    });
});