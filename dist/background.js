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


/***/ }),

/***/ "./src/ts/utils/storage.ts":
/*!*********************************!*\
  !*** ./src/ts/utils/storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearImage: () => (/* binding */ clearImage),
/* harmony export */   getIDArtistStorage: () => (/* binding */ getIDArtistStorage),
/* harmony export */   getImageUrl: () => (/* binding */ getImageUrl),
/* harmony export */   getImageUrlOriginal: () => (/* binding */ getImageUrlOriginal),
/* harmony export */   getStoredSingle: () => (/* binding */ getStoredSingle),
/* harmony export */   setIDArtistStorage: () => (/* binding */ setIDArtistStorage),
/* harmony export */   setImageUrlOriginalStorage: () => (/* binding */ setImageUrlOriginalStorage),
/* harmony export */   setImageUrlStorage: () => (/* binding */ setImageUrlStorage),
/* harmony export */   setStoredSingle: () => (/* binding */ setStoredSingle)
/* harmony export */ });
function setStoredSingle(idSingle) {
    const vals = {
        idSingle,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredSingle() {
    const keys = "idSingle";
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.idSingle) !== null && _a !== void 0 ? _a : "");
        });
    });
}
function setImageUrlStorage(imgUrl) {
    const vals = {
        imgUrl,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function setImageUrlOriginalStorage(imgUrlOriginal) {
    const vals = {
        imgUrlOriginal,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getImageUrlOriginal() {
    const keys = "imgUrlOriginal";
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.imgUrlOriginal) !== null && _a !== void 0 ? _a : "");
        });
    });
}
function getImageUrl() {
    const keys = "imgUrl";
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.imgUrl) !== null && _a !== void 0 ? _a : "");
        });
    });
}
function clearImage() {
    chrome.storage.local.clear();
}
function setIDArtistStorage(idArtist) {
    const val = {
        idArtist,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(val, () => {
            resolve();
        });
    });
}
function getIDArtistStorage() {
    const keys = "idArtist";
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.idArtist) !== null && _a !== void 0 ? _a : "");
        });
    });
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
/*!*****************************************!*\
  !*** ./src/ts/background/background.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_classified__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/classified */ "./src/ts/utils/classified.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/storage */ "./src/ts/utils/storage.ts");
/* harmony import */ var _download_download__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../download/download */ "./src/ts/download/download.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/api */ "./src/ts/utils/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const createNewTab = (infoArtwork, type) => {
    const in4toOpen = type == _utils_classified__WEBPACK_IMPORTED_MODULE_0__.format_pixiv ? infoArtwork.body.urls.original : Object.values(infoArtwork)[0];
    chrome.tabs.create({
        active: false,
        url: in4toOpen,
    });
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.setImageUrlOriginalStorage)(in4toOpen);
};
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
function getUrlAfterDownload(newurl, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return _download_download__WEBPACK_IMPORTED_MODULE_2__["default"].startDownload(newurl, _utils_api__WEBPACK_IMPORTED_MODULE_3__.requestOptions);
        }
        catch (error) {
            chrome.runtime.sendMessage({ notification: 'reloadExt' });
        }
    });
}
;
chrome.contextMenus.onClicked.addListener((event) => __awaiter(void 0, void 0, void 0, function* () {
    const types = ['selectionText', 'linkUrl'];
    const eventTypes = types.filter(type => Object.keys(event).includes(type));
    if (eventTypes.includes('selectionText')) {
    }
    else if (eventTypes.includes('linkUrl')) {
        const belongsToWhatPlatform = _utils_classified__WEBPACK_IMPORTED_MODULE_0__.Utils.isPixiv(event.linkUrl);
        const url = decodeURIComponent(event.linkUrl).match(pattern)[1];
        const data = yield _utils_classified__WEBPACK_IMPORTED_MODULE_0__.Utils.checkData(url);
        const urlFromAPI = data.body.urls.original;
        const nameArtist = (data === null || data === void 0 ? void 0 : data.body.userName) || '';
        const dataAFterDownload = yield yield getUrlAfterDownload(urlFromAPI, nameArtist);
        sendDownload(dataAFterDownload, 'something');
    }
}));
function sendDownload(downloadRes, fileName) {
    downloadRes.arrayBuffer().then((buffer) => __awaiter(this, void 0, void 0, function* () {
        chrome.downloads.download({
            url: 'data:application/octet-stream;base64,' + btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')),
            filename: fileName,
        });
    }));
}
chrome.runtime.onMessage.addListener(function (request) {
    const data = request.data || 1;
    const closeTab = () => {
        return chrome.tabs.query({}, (tabs) => {
            for (let i = 1; i <= data; i++) {
                chrome.tabs.remove(tabs[tabs.length - i].id);
            }
        });
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
        });
    };
    const getFunctionStrategies = {
        Close: closeTab,
        reloadExt: reloadExt,
        downloadfilename: downloadFileName
    };
    const getFunction = (typeFunction) => {
        return getFunctionStrategies[typeFunction];
    };
    if (request.notification) {
        getFunction(request.notification).call();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map