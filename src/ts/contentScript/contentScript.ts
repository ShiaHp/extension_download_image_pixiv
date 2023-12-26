import downloader from '../download/download'
import { requestOptions } from '../utils/api'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ExtendNode, Utils } from '../utils/classified'
import { progressBar } from '../download/process-bar'

const button = document.createElement('button')
button.innerText = '\u21E9'
button.classList.add('buttonCss')
button.style.opacity = '0'
let queue = []

async function asyncEachUrl (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const prevHandleBeforeDownload = async (url: string) => {
  queue = []
  const data = await Utils.checkData(url)
  const nameArtist = data?.body.userName || ''
  const count = data.body.pageCount || 0
  const urlFromAPI = data.body.urls.original

  if (data.body.pageCount <= 1) {
    const downloadRes = await getUrlAfterDownload(
      urlFromAPI,
      nameArtist
    ) as Response

    progressBar.createProgress(downloadRes, nameArtist)
    // } else {
    //   for (let i = 0; i < count; i++) {
    //     const url = `${urlFromAPI}`.replace("_p0", `_p${i}`);
    //     const responseafterdownload = await getUrlAfterDownload(url, nameArtist);
    //     queue.push(responseafterdownload);
    //   }

  //   asyncEachUrl(queue, (artwork) => {
  //     createProcess(artwork, nameArtist, urlFromAPI)
  //   });
  // }
  }
}

async function getUrlAfterDownload (newurl: string, filename: string): Promise<Response | void> {
  try {
    return downloader.startDownload(newurl, requestOptions)
  } catch (error) {
    chrome.runtime.sendMessage({ notification: 'reloadExt' })
  }
};

const initExtensionPixiv = () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach((addedNode: ExtendNode) => {
        if (Utils.isImageNode(addedNode)) {
          const myImage = document.createElement('img')
          myImage.className = 'myImage'

          addedNode.addEventListener('mouseover', function (e) {
            button.style.opacity = '1'
            addedNode.parentElement.appendChild(button)
            const srcImg = addedNode.currentSrc

            myImage.src = srcImg
            button.onclick = function (e) {
              e.preventDefault()
              prevHandleBeforeDownload(srcImg)
            }
          })

          addedNode.addEventListener('mouseout', function (e) {

          })
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

const initExtensionTwitter = () => {

};

(() => {
  const currentHost = window.location.toString()
  if (Utils.isPixivWebsite(currentHost)) {
    initExtensionPixiv()
  };
  if (Utils.isTwitter(currentHost)) {
    // do some thing
    initExtensionTwitter()
  }
})()
