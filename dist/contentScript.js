/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/button.ts":
/*!*****************************!*\
  !*** ./src/style/button.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buttonDownloadAllCss: () => (/* binding */ buttonDownloadAllCss),
/* harmony export */   checkboxCss: () => (/* binding */ checkboxCss),
/* harmony export */   myImagecss: () => (/* binding */ myImagecss),
/* harmony export */   processBarcss: () => (/* binding */ processBarcss)
/* harmony export */ });
const buttonDownloadAllCss = `
.styleButtonAll{
  zIndex: 9999;
  background-color: #52e010;
  border-radius: 5px;
  font-size: 18px;
  align-content: center;
  position: fixed;
  color: #fff;
  right: 0;
  bottom: 350px;
  padding: 0.5rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  transition: 0.2s all;
  cursor: pointer;
  transform: scale(0.98);
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const checkboxCss = `
.stylecheckbox {
  z-index: 9998;
  font-size: 20px;
  position: absolute;
  border-radius: 5px;
  top: 0px;
  left: 0px;
  height: 25px;
  width: 25px;
  background-color: rgba(255, 255, 255, 0.5rem);
}
`;
const myImagecss = `
.myImage {
  borderRadius: 5px;
  border: 1px solid black;
  padding: 5px;
  width: 150px;
}

`;
const processBarcss = `
  .processBar {
    background-color: #04AA6D;
    font-size: 15px;
    width: 10%;
    height: 10px;
    display: block;
  }
`;


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
    static getDataUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = url.match(idPixiv)[1];
            const data = yield _api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwork(id);
            return data || {};
        });
    }
    static checkData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDataUrl(url).then((data) => data);
        });
    }
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
/*!***********************************************!*\
  !*** ./src/ts/contentScript/contentScript.ts ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/ts/utils/api.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/storage */ "./src/ts/utils/storage.ts");
/* harmony import */ var _utils_classified__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/classified */ "./src/ts/utils/classified.ts");
/* harmony import */ var _style_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../style/button */ "./src/style/button.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function downloadImage(url, msg = "undifined") {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "get",
            credentials: "same-origin",
            headers: _utils_api__WEBPACK_IMPORTED_MODULE_0__.myHeaders,
        })
            .then((response) => response.blob())
            .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `Ex-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        })
            .then(() => {
            if (msg === "undifined") {
                return;
            }
            else {
                chrome.runtime.sendMessage({ notification: "Close" });
            }
        })
            .catch((e) => {
            downloadImage(url);
            resolve(e);
            chrome.runtime.sendMessage({ notification: `reloadextension"` });
        });
    });
}
const body = document.getElementsByTagName("body")[0];
let imgIdArr = [];
const imagesArray = document.getElementsByTagName("img");
let myImage = document.createElement("img");
const styleImage = document.createElement("style");
styleImage.innerHTML = _style_button__WEBPACK_IMPORTED_MODULE_3__.checkboxCss;
myImage.className = "myImage";
const buttonDownloadAll = document.createElement("button");
buttonDownloadAll.innerHTML = "Download all";
const styleButtonAll = document.createElement("style");
styleImage.innerHTML = _style_button__WEBPACK_IMPORTED_MODULE_3__.buttonDownloadAllCss;
buttonDownloadAll.className = "styleButtonAll";
body.appendChild(buttonDownloadAll);
body.appendChild(styleImage);
body.appendChild(styleButtonAll);
let linkImg = "";
// Create the button and checkbox outside the interval loop
const checkbox = document.createElement("input");
const style = document.createElement("style");
style.innerHTML = _style_button__WEBPACK_IMPORTED_MODULE_3__.checkboxCss;
checkbox.className = "stylecheckbox";
checkbox.type = "checkbox";
checkbox.id = "checkbox";
document.body.appendChild(style);
const button = document.createElement("button");
button.innerText = "\u21E9";
button.classList.add("buttonCss");
button.style.opacity = "0"; // Initially set the opacity to 0 for fade-in effect
document.body.appendChild(button);
setInterval(() => {
    for (let i = 2; i < imagesArray.length; i++) {
        if (imagesArray.length > 2 &&
            imagesArray[i].parentElement &&
            imagesArray[i].parentElement.childNodes &&
            imagesArray[i].parentElement.childNodes.length <= 1) {
            imagesArray[i].addEventListener("mouseover", function () {
                button.style.opacity = "1";
                checkbox.style.opacity = "1";
                const id = imagesArray[i].src.match(_utils_classified__WEBPACK_IMPORTED_MODULE_2__.idPixiv)[0];
                myImage.src = this.src;
                linkImg = this.src;
                checkbox.addEventListener("click", function (e) {
                    e.stopPropagation();
                    // check if the id is already in array
                    if (imgIdArr.includes(id)) {
                        const index = imgIdArr.indexOf(id);
                        imgIdArr.splice(index, 1);
                    }
                    else {
                        imgIdArr.push(id);
                    }
                });
                imagesArray[i].parentElement.appendChild(button);
                imagesArray[i].parentElement.appendChild(checkbox);
                button.onclick = function (e) {
                    // e.stopPropagation();
                    // e.preventDefault();
                    checkImage(linkImg);
                };
            });
            imagesArray[i].addEventListener("mouseout", function () {
                button.style.opacity = "0";
                checkbox.style.opacity = "0";
            });
        }
    }
}, 100);
//   for (let i = 2; i < imagesArray.length; i++) {
//     if (
//       imagesArray.length > 2 &&
//       imagesArray[i].parentElement &&
//       imagesArray[i].parentElement.childNodes &&
//       imagesArray[i].parentElement.childNodes.length <= 1
//     ) {
//       imagesArray[i].addEventListener('mouseover', function() {
//         const checkbox = document.createElement("input");
//       const style = document.createElement("style");
//       style.innerHTML = checkboxCss
//       checkbox.className = "stylecheckbox"
//       checkbox.type = "checkbox";
//       checkbox.id = "checkbox";
//       body.appendChild(style)
//       const button = document.createElement("button");
//       button.innerText = "\u21E9";
//       button.classList.add('buttonCss');
//       checkbox.addEventListener("click", function (e: any) {
//         e.stopPropagation();
//         const id = e.path[1].innerHTML.match(idPixiv)[0];
//         // check if the id is already in array
//         if (imgIdArr.includes(id)) {
//           const index = imgIdArr.indexOf(id);
//           imgIdArr.splice(index, 1);
//         } else {
//           imgIdArr.push(id);
//         }
//       });
//       myImage.src = this.src;
//       linkImg = this.src;
//       imagesArray[i].parentElement.appendChild(button);
//       imagesArray[i].parentElement.appendChild(checkbox);
//       button.onclick = function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//         checkImage(linkImg);
//       };
//       })
//     }
//   }
// }, 100);
buttonDownloadAll.addEventListener("click", function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (imgIdArr.length > 0) {
            const urlArr = [];
            const isAllCheck = false;
            Array.from(document.querySelectorAll("input[type=checkbox]")).forEach((el) => (el.checked = isAllCheck));
            for (let i = 0; i < imgIdArr.length; i++) {
                const data = yield _utils_api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwork(imgIdArr[i]);
                urlArr.push(_utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.classifiedPageCount(data));
            }
            const flatUrl = urlArr.flat();
            const response = flatUrl.map((artworkAfterClassified) => {
                return downloadImage(artworkAfterClassified);
            });
            yield Promise.all(response).then(() => {
                imgIdArr = [];
            });
        }
        else {
            alert("Please select an artwork");
        }
    });
});
let queue = [];
const myProgress = document.createElement("div");
myProgress.setAttribute("id", "myProgress");
const processBar = document.createElement("div");
processBar.setAttribute("id", "myBar");
myProgress.appendChild(processBar);
function createProcess(responseafterdownload, filename, urlFromAPI) {
    return __awaiter(this, void 0, void 0, function* () {
        myProgress.classList.add('myProgress');
        processBar.style.display = "block";
        body.appendChild(myProgress);
        let dataDownload = yield responseafterdownload.clone();
        const reader = dataDownload.body.getReader();
        const contentLength = +responseafterdownload.headers.get("Content-Length");
        yield readContentLength(contentLength, reader, processBar, myProgress);
        responseafterdownload.blob().then((blob) => __awaiter(this, void 0, void 0, function* () {
            const url = URL.createObjectURL(blob);
            sendDownload(url, filename);
        }));
    });
}
function readContentLength(contentLength, reader, processBar, myProgress1) {
    return __awaiter(this, void 0, void 0, function* () {
        let receivedLength = 0;
        while (true) {
            const { done, value } = yield reader.read();
            if (done) {
                break;
            }
            receivedLength += value.length;
            processBar.style.width =
                Math.floor((receivedLength / contentLength) * 100) + "%";
            processBar.innerHTML =
                Math.floor((receivedLength / contentLength) * 100) + "%";
        }
        if (receivedLength === contentLength ||
            processBar.innerHTML === "100%" ||
            processBar.innerHTML === "Infinity%") {
            myProgress1.style.display = "none";
            processBar.style.width = 0 + "%";
            processBar.innerHTML = 0 + "%";
        }
    });
}
function asyncEachUrl(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
function checkImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        queue = [];
        const data = yield _utils_classified__WEBPACK_IMPORTED_MODULE_2__.Utils.checkData(url);
        const nameArtist = (data === null || data === void 0 ? void 0 : data.body.userName) || '';
        const count = data.body.pageCount || 0;
        const urlFromAPI = data.body.urls.original;
        if (data.body.pageCount <= 1) {
            const responseafterdownload = yield getUrlAfterDownload(urlFromAPI, nameArtist);
            createProcess(responseafterdownload, nameArtist, urlFromAPI);
        }
        else {
            for (let i = 0; i < count; i++) {
                const url = `${urlFromAPI}`.replace("_p0", `_p${i}`);
                const responseafterdownload = yield getUrlAfterDownload(url, nameArtist);
                queue.push(responseafterdownload);
            }
            asyncEachUrl(queue, (artwork) => {
                createProcess(artwork, nameArtist, urlFromAPI);
            });
        }
    });
}
function waitToDownloadAgain(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
}
function getRetryDownload(newurl, delay, tries, fetchOptions) {
    function onError(err) {
        let triesLeft = tries - 1;
        if (!triesLeft) {
            throw new Error(err);
        }
        return waitToDownloadAgain(delay).then(() => getRetryDownload(newurl, delay, triesLeft, fetchOptions));
    }
    return fetch(newurl, fetchOptions).catch(onError);
}
function getUrlAfterDownload(newurl, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseafterdownload = yield fetch(newurl, {
            method: "get",
            credentials: "same-origin",
            headers: _utils_api__WEBPACK_IMPORTED_MODULE_0__.myHeaders,
        }).catch((e) => __awaiter(this, void 0, void 0, function* () {
            chrome.runtime.sendMessage({ notification: `reloadextension"` });
            const responseafterdownload = yield getRetryDownload(newurl, 3000, 5, _utils_api__WEBPACK_IMPORTED_MODULE_0__.requestOptions);
            return responseafterdownload;
        }));
        return responseafterdownload;
    });
}
function sendDownload(urlInput, filename) {
    chrome.runtime.sendMessage({
        notification: "downloadfilename",
        url: urlInput,
        filename: filename,
    });
}
(0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.getImageUrlOriginal)().then((res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.length > 0) {
        downloadImage(res, 'Close');
    }
}));
// chrome.storage.local.get("arrUrl1", async function (res) {
//   if (res || res.arrUrl1.length > 0) {
//     const response = res.arrUrl1.map((url) => {
//       return downloadImage(url);
//     });
//     let timeWaitToResolve = 2000
//     await new Promise<void>((resolve) => {
//       setTimeout(() => {
//         if(res.isClose == 1){
//           chrome.runtime.sendMessage({ notification: "Close" })
//         }
//         resolve();
//       }, timeWaitToResolve);
//     });
//     await Promise.all(response);
//   }
// });
(0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.clearImage)();

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map