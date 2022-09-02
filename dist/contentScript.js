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
myHeaders.append("Content-Type", "application/json");
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
/* harmony export */   "checkURL": () => (/* binding */ checkURL)
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

const idReg = /[0-9]{9}|[0-9]{8}|[0-9]{10}/;
class checkURL {
    static getDatafromRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = url.match(idReg)[0];
            const data = yield _api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwordData(id);
            return data;
        });
    }
    static checkManyPageCount(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDatafromRequest(url).then((data) => data.body.pageCount);
        });
    }
    static checkURLmedium(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDatafromRequest(url).then((data) => data.body.urls.original);
        });
    }
}


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
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
/* harmony import */ var _utils_checkUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/checkUrl */ "./src/utils/checkUrl.ts");
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
function downloadImage(url, msg = "undifined") {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "get",
            credentials: "same-origin",
            headers: myHeaders,
        })
            .then((response) => response.blob())
            .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `pixiv-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        })
            .then(() => {
            if (msg === "undifined") {
                console.log("Shiawase ハンサム ");
            }
            else {
                chrome.runtime.sendMessage({ notification: "Close" });
            }
        })
            .catch((e) => {
            downloadImage(url);
            resolve(e);
            chrome.runtime.sendMessage({ notification: `reload-extension"` });
        });
    });
}
let imgIdArr = [];
const imagesArray = document.getElementsByTagName("img");
let myImage = document.createElement("img");
myImage.style.borderRadius = "5px";
myImage.style.border = "1px solid black";
myImage.style.padding = "5px";
myImage.style.width = "150px";
const buttonDownloadAll = document.createElement("button");
buttonDownloadAll.innerHTML = "Download all";
buttonDownloadAll.style.zIndex = "9999";
buttonDownloadAll.style.backgroundColor = "#52e010";
buttonDownloadAll.style.borderRadius = "5px";
buttonDownloadAll.style.fontSize = "18px";
buttonDownloadAll.style.alignContent = "center";
buttonDownloadAll.style.color = " #fff";
buttonDownloadAll.style.position = "fixed";
buttonDownloadAll.style.right = "0";
buttonDownloadAll.style.bottom = "350px";
buttonDownloadAll.style.padding = "0.5rem";
buttonDownloadAll.style.margin = "0.5rem 0.5rem 0.5rem 0";
buttonDownloadAll.style.transition = "0.2s all";
buttonDownloadAll.style.cursor = "pointer";
buttonDownloadAll.style.transform = "scale(0.98)";
buttonDownloadAll.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
const body = document.getElementsByTagName("body")[0];
body.appendChild(buttonDownloadAll);
let linkImg = "";
setInterval(() => {
    for (let i = 2; i < imagesArray.length; i++) {
        if (imagesArray.length > 2 &&
            imagesArray[i].parentElement &&
            imagesArray[i].parentElement.childNodes &&
            imagesArray[i].parentElement.childNodes.length <= 1) {
            // const tab = document.getElementsByTagName('li')
            // if (tab[i].className.includes("sc-9y4be5-2")) {
            //   liArr.push(tab[i].className.includes("sc-9y4be5-2"))
            // }
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "checkbox";
            checkbox.style.fontSize = "20px";
            checkbox.style.position = "absolute";
            checkbox.style.borderRadius = "5px";
            checkbox.style.zIndex = "9998";
            checkbox.style.top = "0px";
            checkbox.style.left = "0px";
            checkbox.style.height = "25px";
            checkbox.style.width = "25px";
            checkbox.style.backgroundColor = "rgba(255, 255, 255, 0.5rem)";
            const button = document.createElement("button");
            button.innerText = "\u21E9";
            button.style.zIndex = "9999";
            button.style.backgroundColor = "#52e010";
            button.style.borderRadius = "5px";
            button.style.fontSize = "18px";
            button.style.alignContent = "center";
            button.style.color = " #fff";
            button.style.position = "absolute";
            button.style.right = "0";
            button.style.top = "1rem";
            button.style.padding = "0.5rem";
            button.style.margin = "0.5rem 0.5rem 0.5rem 0";
            button.style.transition = "0.2s all";
            button.style.cursor = "pointer";
            button.style.transform = "scale(0.98)";
            button.style.opacity = "0.5rem";
            button.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
            function checkImage(url) {
                return __awaiter(this, void 0, void 0, function* () {
                    const count = yield _utils_checkUrl__WEBPACK_IMPORTED_MODULE_2__.checkURL.checkManyPageCount(url);
                    if (count <= 1) {
                        const newUrl = yield _utils_checkUrl__WEBPACK_IMPORTED_MODULE_2__.checkURL.checkURLmedium(url);
                        downloadImage(newUrl);
                    }
                    else {
                        const newUrl = yield _utils_checkUrl__WEBPACK_IMPORTED_MODULE_2__.checkURL.checkURLmedium(url);
                        for (let i = 0; i < count; i++) {
                            const url = `${newUrl}`.replace("_p0", `_p${i}`);
                            downloadImage(url);
                        }
                    }
                });
            }
            checkbox.addEventListener("click", function (e) {
                e.stopPropagation();
                const id = e.path[1].innerHTML.match(_utils_checkUrl__WEBPACK_IMPORTED_MODULE_2__.idReg)[0];
                // check if the id is already in array
                if (imgIdArr.includes(id)) {
                    const index = imgIdArr.indexOf(id);
                    imgIdArr.splice(index, 1);
                }
                else {
                    imgIdArr.push(id);
                }
            });
            imagesArray[i].addEventListener("mouseover", function (e) {
                myImage.src = this.src;
                linkImg = this.src;
            });
            button.onclick = function (e) {
                e.stopPropagation();
                e.preventDefault();
                checkImage(linkImg);
            };
            imagesArray[i].parentElement.appendChild(button);
            imagesArray[i].parentElement.appendChild(checkbox);
        }
    }
}, 100);
buttonDownloadAll.addEventListener("click", function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (imgIdArr.length > 0) {
            const urlArr = [];
            const isAllCheck = false;
            Array.from(document.querySelectorAll("input[type=checkbox]")).forEach((el) => (el.checked = isAllCheck));
            for (let i = 0; i < imgIdArr.length; i++) {
                const data = yield _utils_api__WEBPACK_IMPORTED_MODULE_0__.API.getArtwordData(imgIdArr[i]);
                if (data.body.pageCount <= 1) {
                    urlArr.push(data.body.urls.original);
                }
                else {
                    for (let i = 0; i < data.body.pageCount; i++) {
                        const url = `${data.body.urls.original}`.replace("_p0", `_p${i}`);
                        urlArr.push(url);
                    }
                }
            }
            const response = urlArr.map((url) => {
                return downloadImage(url);
            });
            yield Promise.all(response).then(() => {
                imgIdArr = [];
            });
        }
        else {
            alert("Please select artworks");
        }
    });
});
(0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.getImageUrlOriginal)().then((res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.length > 0) {
        downloadImage(res, "Download");
    }
}));
chrome.storage.local.get("arrUrl1", function (res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (res || res.arrUrl1.length > 0) {
            const response = res.arrUrl1.map((url) => {
                return downloadImage(url);
            });
            yield Promise.all(response);
        }
    });
});
(0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.clearImageUrl)();

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map