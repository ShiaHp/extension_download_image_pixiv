/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myHeaders": () => (/* binding */ myHeaders),
/* harmony export */   "API": () => (/* binding */ API)
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
const myHeaders = new Headers();
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("referer", "https://www.pixiv.net/");
const requestOptions = {
    method: "GET",
    headers: myHeaders,
};
class API {
    static sendGetRequest(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'get',
                credentials: 'same-origin'
            })
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
    static getArtwordDataTwitter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = ` https://gettweet.onrender.com/tweet/${id}`;
            return this.sendGetRequest(url);
        });
    }
    static getArtwordData(id) {
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


/***/ }),

/***/ "./src/utils/checkUrl.ts":
/*!*******************************!*\
  !*** ./src/utils/checkUrl.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "idReg": () => (/* binding */ idReg),
/* harmony export */   "idTweet": () => (/* binding */ idTweet),
/* harmony export */   "format_pixiv": () => (/* binding */ format_pixiv),
/* harmony export */   "format_twitter": () => (/* binding */ format_twitter),
/* harmony export */   "checkURL": () => (/* binding */ checkURL),
/* harmony export */   "check": () => (/* binding */ check),
/* harmony export */   "buttonDownloadAllCss": () => (/* binding */ buttonDownloadAllCss),
/* harmony export */   "checkboxCss": () => (/* binding */ checkboxCss),
/* harmony export */   "buttonCss": () => (/* binding */ buttonCss),
/* harmony export */   "myImagecss": () => (/* binding */ myImagecss),
/* harmony export */   "myProgresscss": () => (/* binding */ myProgresscss),
/* harmony export */   "processBarcss": () => (/* binding */ processBarcss)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/utils/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const idReg = /[0-9]{7,11}/;
const idTweet = /[0-9]{19,21}/;
const format_pixiv = 0;
const format_twitter = 1;
class checkURL {
    static getDatafromRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = url.match(idReg)[0];
            const data = yield _api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwordData(id);
            return data;
        });
    }
    static checkData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDatafromRequest(url).then((data) => data);
        });
    }
    static classifiedPageCount(data) {
        var _a;
        const urlArr = [];
        if (((_a = data === null || data === void 0 ? void 0 : data.body) === null || _a === void 0 ? void 0 : _a.pageCount) <= 1 && data) {
            urlArr.push(data);
        }
        else {
            for (let i = 0; i < data.body.pageCount; i++) {
                const url = `${data.body.urls.original}`.replace("_p0", `_p${i}`);
                urlArr.push(url);
            }
        }
        return urlArr;
    }
}
class check {
    static checkName(name) {
        let isPixiv = name.indexOf("pixiv") > -1;
        if (isPixiv) {
            return 0;
        }
        else {
            return 1;
        }
    }
}
const buttonDownloadAllCss = `
.styleButtonAll{
  zIndex : 9999;
  background-color: #52e010;
  border-radius : 5px;
  font-size : 18px;
  align-content : center;
  position : fixed;
  color : #fff;
  right : 0;
  bottom : 350px;
  padding : 0.5rem;
  margin : 0.5rem 0.5rem 0.5rem 0;
  transition : 0.2s all;
  cursor : pointer;
  transform : scale(0.98);
  box-shadow : 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const checkboxCss = `
.stylecheckbox {
  z-index : 9998;
  font-size : 20px;
  position : absolute;
  border-radius : 5px;
  top : 0px;
  left : 0px;
  height : 25px;
  width : 25px;
  background-color : rgba(255, 255, 255, 0.5rem);
}
`;
const buttonCss = `
.buttonCss {
z-index : 9999;
background-color: #52e010;
border-radius : 5px;
font-size : 18px;
align-content: center;
color :  #fff;
position : absolute;
right : 0;
top : 1rem;
padding : 0.5rem;
margin : 0.5rem 0.5rem 0.5rem 0;
transition : 0.2s all;
cursor : pointer;
transform : scale(0.98);
opacity : 0.5rem;
box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
`;
const myImagecss = `
.myImage {
  borderRadius : 5px;
  border : 1px solid black;
  padding : 5px;
  width : 150px;
}

`;
const myProgresscss = `
.myProgress {
 width : 100px;
 height : 10px;
 backgroundColor : #ddd;
 display : none;
 
 zIndex : 1000;

 position : fixed;
 right : 0;
 bottom : 0;
 padding : 0.5rem;
 margin : 0.5rem 0.5rem 0.5rem 0;
 display : block;
  
}
`;
const processBarcss = `
  .processBar {
   background-color : #04AA6D;
  font-size :15px;
  width : 10%;
  height : 10px;
  display : block;
  }
`;


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredSingle": () => (/* binding */ setStoredSingle),
/* harmony export */   "getStoredSingle": () => (/* binding */ getStoredSingle),
/* harmony export */   "setImageUrlStorage": () => (/* binding */ setImageUrlStorage),
/* harmony export */   "setImageUrlOriginalStorage": () => (/* binding */ setImageUrlOriginalStorage),
/* harmony export */   "getImageUrlOriginal": () => (/* binding */ getImageUrlOriginal),
/* harmony export */   "getImageUrl": () => (/* binding */ getImageUrl),
/* harmony export */   "clearImageUrl": () => (/* binding */ clearImageUrl),
/* harmony export */   "setIDArtistStorage": () => (/* binding */ setIDArtistStorage),
/* harmony export */   "getIDArtistStorage": () => (/* binding */ getIDArtistStorage)
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
function clearImageUrl() {
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
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/checkUrl */ "./src/utils/checkUrl.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// TODO: background script


const regex = /access-control-allow-origin/i;
function removeMatchingHeaders(headers, regex) {
    for (let i = 0, header; (header = headers[i]); i++) {
        if (header.name.match(regex)) {
            headers.splice(i, 1);
            return;
        }
    }
}
function responseListener(details) {
    removeMatchingHeaders(details.responseHeaders, regex);
    details.responseHeaders.push({
        name: "access-control-allow-origin",
        value: "*",
    });
    return { responseHeaders: details.responseHeaders };
}
chrome.webRequest.onHeadersReceived.addListener(responseListener, {
    urls: ["*://*.pximg.net/*", "*://*.pixiv.cat/*"],
}, ["blocking", "responseHeaders", "extraHeaders"]);
const callAPI = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const apiName = {
        0: _utils_api__WEBPACK_IMPORTED_MODULE_2__.API.getArtwordData(id),
        1: _utils_api__WEBPACK_IMPORTED_MODULE_2__.API.getArtwordDataTwitter(id),
    };
    let infoArtwork = {};
    yield apiName[type].then((data) => {
        infoArtwork = data;
    });
    return infoArtwork;
});
const createNewTab = (infoArtwork, type) => {
    const in4toOpen = type == _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.format_pixiv ? infoArtwork.body.urls.original : Object.values(infoArtwork)[0];
    chrome.tabs.create({
        active: false,
        url: in4toOpen,
    });
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.setImageUrlOriginalStorage)(in4toOpen);
};
const functionDownloadImage = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const infoArtwork = yield callAPI(id, type);
    const artworkName = {
        0: (_a = infoArtwork === null || infoArtwork === void 0 ? void 0 : infoArtwork.body) === null || _a === void 0 ? void 0 : _a.pageCount,
        1: infoArtwork,
    };
    if (type === _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.format_twitter || artworkName[type] <= 1) {
        createNewTab(infoArtwork, type);
    }
    else {
        const imgList = [];
        for (let i = 0; i < artworkName[type]; i++) {
            const url = `${infoArtwork.body.urls.original}`.replace("_p0", `_p${i}`);
            imgList.push(url);
        }
        chrome.storage.local.set({ arrUrl1: imgList }, () => {
            chrome.tabs.query({}, () => __awaiter(void 0, void 0, void 0, function* () {
                chrome.tabs.create({
                    active: false,
                    url: infoArtwork.body.urls.original,
                });
            }));
        });
    }
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        contexts: ["selection", "link"],
        title: "Download image from this code",
        id: "download-image",
    });
});
chrome.contextMenus.onClicked.addListener((event) => {
    if (event.selectionText) {
        functionDownloadImage(event.selectionText, _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.format_pixiv);
    }
    else {
        const typeToCheck = _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.check.checkName(event.linkUrl);
        const exactName = typeToCheck == _utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.format_pixiv ? event.linkUrl.match(_utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.idReg)[0] : event.linkUrl.match(_utils_checkUrl__WEBPACK_IMPORTED_MODULE_0__.idTweet)[0];
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
        });
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
        });
    }
    const getFunctionStrategies = {
        Close: closeTab,
        reloadextension: reloadextension,
        downloadfilename: downloadFileName
    };
    function getFunction(typeFunction) {
        return getFunctionStrategies[typeFunction];
    }
    if (request.notification) {
        console.log(request.notification);
        getFunction(request.notification).call();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map