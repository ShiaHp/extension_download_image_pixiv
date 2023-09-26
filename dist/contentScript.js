/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/download/download.ts":
/*!*************************************!*\
  !*** ./src/ts/download/download.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Downloader {
    constructor() {
        this.retries = 4;
        this.delay = 1000;
    }
    ;
    startDownload(url, options = {}) {
        this.options = options;
        this.url = url;
        return this.getRetryDownload(this.url, this.retries);
    }
    ;
    getRetryDownload(newurl, retries) {
        return fetch(newurl, this.options).catch((e) => this.onError(e, retries));
    }
    ;
    waitToDownloadAgain(delay) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }
    ;
    onError(e, tries) {
        let triesLeft = tries - 1;
        if (!triesLeft) {
            throw new Error(e);
        }
        return this.waitToDownloadAgain(this.delay).then(() => this.getRetryDownload(this.url, triesLeft));
    }
}
;
const downloader = new Downloader();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (downloader);


/***/ }),

/***/ "./src/ts/download/process-bar.ts":
/*!****************************************!*\
  !*** ./src/ts/download/process-bar.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   progressBar: () => (/* binding */ progressBar)
/* harmony export */ });
/* harmony import */ var _utils_chrome_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/chrome-command */ "./src/ts/utils/chrome-command.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const body = document.getElementsByTagName("body")[0];
const useSlot = (element) => {
    // https://stackoverflow.com/questions/27079598/error-failed-to-execute-appendchild-on-node-parameter-1-is-not-of-type-no
    if (typeof element === 'string') {
        const wrap = document.createElement('div');
        wrap.innerHTML = element;
        const el = wrap.children[0];
        document.body.appendChild(el);
        return el;
    }
};
class ProgressBar {
    constructor() {
        this.wrapHTML = `
    <div class="container">
    <span class="container__progress-text"></span>
    <div class="progress-bar__container">
      <div class="progress-bar">
        <span class="progress-bar__text">0</span>
      </div>
    </div>
  </div>
  `;
        this.KB = 1024;
        this.MB = 1024 * 1024;
        this.createElements();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    createElements() {
        this.wrap = useSlot(this.wrapHTML);
        this.progress = this.wrap.querySelector('.progress-bar__container');
        this.progressText = this.wrap.querySelector('.container__progress-text');
        this.progressBar = this.wrap.querySelector('.progress-bar');
        this.progressBarText = this.wrap.querySelector('.progress-bar__text');
    }
    ;
    createProgress(downloadRes, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProgressBar = document.querySelector('.progress-bar__container');
            if (existingProgressBar) {
                this.show();
            }
            ;
            let dataDownload = downloadRes.clone();
            const contentLength = +downloadRes.headers.get("Content-Length");
            const reader = dataDownload.body.getReader();
            this.sendDownload(downloadRes, fileName);
            yield this.readContentLength(contentLength, reader);
        });
    }
    readContentLength(contentLength, reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedLength = 0;
            let total = '';
            total = `Total: ${(contentLength / this.MB).toFixed(1)} MB`;
            this.setTotalProgress(total);
            while (true) {
                const { done, value } = yield reader.read();
                if (done) {
                    break;
                }
                receivedLength += value.length;
                const percentage = Math.floor((receivedLength / contentLength) * 100);
                this.updateProgressBar(percentage);
            }
            ;
            if ((receivedLength === contentLength) || this.isFinishLoad()) {
                this.reset(100, 0);
                this.hide();
            }
        });
    }
    ;
    sendDownload(downloadRes, fileName) {
        return downloadRes.blob().then((blob) => __awaiter(this, void 0, void 0, function* () {
            const url = URL.createObjectURL(blob);
            _utils_chrome_command__WEBPACK_IMPORTED_MODULE_0__.ChromeCommand.sendDownload(url, fileName);
        }));
    }
    ;
    updateProgressBar(percentage) {
        if (percentage <= 0) {
            this.progressBarText.style.display = "initial";
        }
        ;
        this.progressBar.style.width = percentage + "%";
        this.progressBarText.innerHTML = percentage + "%";
        this.progress.style.boxShadow = '0 0 5px #4895ef';
    }
    show() {
        this.wrap.style.display = 'block';
    }
    hide() {
        this.wrap.style.display = 'none';
    }
    setTotalProgress(downloaded) {
        if (typeof downloaded === 'number') {
            this.progressText.innerText = downloaded.toString();
        }
        else {
            this.progressText.innerText = downloaded;
        }
    }
    isFinishLoad() {
        return this.progressBarText.innerHTML === '100%' || this.progressBarText.innerHTML === 'Infinity%';
    }
    reset(progressBarNum, downloadNum = 0) {
        if (progressBarNum === 0) {
            this.hide;
        }
        this.setTotalProgress(downloadNum);
    }
}
const progressBar = new ProgressBar();



/***/ }),

/***/ "./src/ts/utils/api.ts":
/*!*****************************!*\
  !*** ./src/ts/utils/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API: () => (/* binding */ API),
/* harmony export */   myHeaders: () => (/* binding */ myHeaders),
/* harmony export */   requestOptions: () => (/* binding */ requestOptions)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
const myHeaders = new Headers();
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    credentials: 'same-origin'
};
class API {
    static sendGetRequest(url, options = {}) {
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    reject({
                        status: response.status,
                        statusText: response.statusText,
                    });
                }
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static getBookMarkOfUser(id, type = "illusts", offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://www.pixiv.net/ajax/user/${id}/${type}/bookmarks?tag=&offset=${offset}&limit=${limit}&rest=show&lang=en`;
            return this.sendGetRequest(url);
        });
    }
    static getArtworkTwitter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://gettweet.onrender.com/tweet/${id}`;
            return this.sendGetRequest(url);
        });
    }
    static getArtwork(id) {
        const url = `https://www.pixiv.net/ajax/illust/${id}`;
        return this.sendGetRequest(url);
    }
    static getAllArtworks(id) {
        const url = `https://www.pixiv.net/ajax/user/${id}/profile/all`;
        return new Promise((resolve, reject) => {
            fetch(url, requestOptions)
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    reject({
                        status: response.status,
                        statusText: response.statusText,
                    });
                }
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
;


/***/ }),

/***/ "./src/ts/utils/chrome-command.ts":
/*!****************************************!*\
  !*** ./src/ts/utils/chrome-command.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChromeCommand: () => (/* binding */ ChromeCommand)
/* harmony export */ });
class ChromeCommand {
    static closeTab(data) {
        chrome.tabs.query({}, (tabs) => {
            for (let i = 1; i <= data; i++) {
                chrome.tabs.remove(tabs[tabs.length - i].id);
            }
        });
    }
    ;
    static reloadExtension() {
        chrome.runtime.requestUpdateCheck(() => {
            chrome.runtime.reload();
        });
    }
    ;
    static downloadFileName(url, filename) {
        chrome.downloads.download({
            url: url,
            filename: `downloadFromPixiv/${filename}/pixiv-${Date.now()}.filename`,
            conflictAction: 'overwrite',
            saveAs: false,
        });
    }
    ;
    static handleRequest(request) {
        const data = request.data || 1;
        const functionStrategies = {
            Close: ChromeCommand.closeTab,
            reloadextension: ChromeCommand.reloadExtension,
            downloadfilename: ChromeCommand.downloadFileName,
        };
        if (request.notification) {
            const selectedFunction = functionStrategies[request.notification];
            if (selectedFunction) {
                selectedFunction(request.url, request.filename, data);
            }
        }
    }
    ;
    static sendMessage(notification, url, filename, data) {
        chrome.runtime.sendMessage({
            notification: notification,
            url: url,
            filename: filename,
            data: data,
        });
    }
    ;
    static closeExtensionRequired(msg) {
        if (msg !== 'undifined') {
            chrome.runtime.sendMessage({ notification: "Close" });
        }
    }
    ;
    static sendDownload(url, filename) {
        return chrome.runtime.sendMessage({
            notification: "downloadfilename",
            url: url,
            filename: filename,
        });
    }
}


/***/ }),

/***/ "./src/ts/utils/classified.ts":
/*!************************************!*\
  !*** ./src/ts/utils/classified.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: () => (/* binding */ Utils),
/* harmony export */   format_pixiv: () => (/* binding */ format_pixiv),
/* harmony export */   format_twitter: () => (/* binding */ format_twitter),
/* harmony export */   idPixiv: () => (/* binding */ idPixiv),
/* harmony export */   idTweet: () => (/* binding */ idTweet)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/ts/utils/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const idPixiv = /\/(\d+)_p\d+_[\w-]+\d+\.(jpg|png|gif|bmp|jpeg|webp)$/i;
const idTweet = /[0-9]{19,21}/;
const format_pixiv = 0;
const format_twitter = 1;
class Utils {
    static isPixiv(name) {
        let isPixiv = name.indexOf("pixiv") > -1;
        return isPixiv ? 0 : 1;
    }
    ;
    static getIdArtWork(url) {
        return url.match(idPixiv)[1];
    }
    ;
    static getDataUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getIdArtWork(url);
            const data = yield _api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwork(id);
            return data || {};
        });
    }
    ;
    static checkData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDataUrl(url).then((data) => data);
        });
    }
    ;
    static classifiedPageCount(arkwork) {
        var _a, _b;
        const urlArr = [];
        const pageCount = (_a = arkwork === null || arkwork === void 0 ? void 0 : arkwork.body) === null || _a === void 0 ? void 0 : _a.pageCount;
        const img = (_b = arkwork === null || arkwork === void 0 ? void 0 : arkwork.body) === null || _b === void 0 ? void 0 : _b.urls.original;
        if (pageCount <= 1 && arkwork) {
            urlArr.push(img);
        }
        else {
            for (let i = 0; i < pageCount; i++) {
                const url = `${img}`.replace("_p0", `_p${i}`);
                urlArr.push(url);
            }
        }
        return urlArr;
    }
    ;
    static isImageNode(node) {
        return (node === null || node === void 0 ? void 0 : node.tagName) === 'IMG' && node instanceof Element;
    }
    static isPixivWebsite(url) {
        const pixivUrlPatterns = [
            /^https?:\/\/www\.pixiv\.net\//,
            /^https?:\/\/[^/]+\.pximg\.net\//,
            /^https?:\/\/pbs\.twimg\.com\//
        ];
        return pixivUrlPatterns.some(p => p.test(url));
    }
    ;
    static isTwitter(url) {
        const twitterPatterns = [
            /^https?:\/\/twitter\.com\//
        ];
        return twitterPatterns.some(pattern => pattern.test(url));
    }
    ;
    static isAIArtWork(node) {
        // to do
    }
    ;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./src/ts/contentScript/contentScript.ts ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prevHandleBeforeDownload: () => (/* binding */ prevHandleBeforeDownload)
/* harmony export */ });
/* harmony import */ var _download_download__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../download/download */ "./src/ts/download/download.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "./src/ts/utils/api.ts");
/* harmony import */ var _utils_classified__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/classified */ "./src/ts/utils/classified.ts");
/* harmony import */ var _download_process_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../download/process-bar */ "./src/ts/download/process-bar.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// eslint-disable-next-line @typescript-eslint/consistent-type-imports


const button = document.createElement('button');
button.innerText = '\u21E9';
button.classList.add('buttonCss');
button.style.opacity = '0';
let queue = [];
function asyncEachUrl(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
const prevHandleBeforeDownload = (url) => __awaiter(void 0, void 0, void 0, function* () {
    queue = [];
    const data = yield _utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.checkData(url);
    const nameArtist = (data === null || data === void 0 ? void 0 : data.body.userName) || '';
    const count = data.body.pageCount || 0;
    const urlFromAPI = data.body.urls.original;
    if (data.body.pageCount <= 1) {
        const downloadRes = yield getUrlAfterDownload(urlFromAPI, nameArtist);
        _download_process_bar__WEBPACK_IMPORTED_MODULE_3__.progressBar.createProgress(downloadRes, nameArtist);
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
});
function getUrlAfterDownload(newurl, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return _download_download__WEBPACK_IMPORTED_MODULE_0__["default"].startDownload(newurl, _utils_api__WEBPACK_IMPORTED_MODULE_1__.requestOptions);
        }
        catch (error) {
            chrome.runtime.sendMessage({ notification: 'reloadExt' });
        }
    });
}
;
const initExtensionPixiv = () => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach((addedNode) => {
                if (_utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.isImageNode(addedNode)) {
                    const myImage = document.createElement('img');
                    myImage.className = 'myImage';
                    addedNode.addEventListener('mouseover', function (e) {
                        button.style.opacity = '1';
                        addedNode.parentElement.appendChild(button);
                        const srcImg = addedNode.currentSrc;
                        myImage.src = srcImg;
                        button.onclick = function (e) {
                            e.preventDefault();
                            prevHandleBeforeDownload(srcImg);
                        };
                    });
                    addedNode.addEventListener('mouseout', function (e) {
                    });
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
};
const initExtensionTwitter = () => {
};
(() => {
    const currentHost = window.location.toString();
    if (_utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.isPixivWebsite(currentHost)) {
        initExtensionPixiv();
    }
    ;
    if (_utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.isTwitter(currentHost)) {
        // do some thing
        initExtensionTwitter();
    }
})();

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map