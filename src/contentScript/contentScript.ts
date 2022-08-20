

import {
        setStoredSingle,
        getStoredSingle,
        getImageUrl,
        setImageUrlStorage,
        clearImageUrl
} from '../utils/storage'
getImageUrl().then((res) => {
        var myHeaders = new Headers();
        myHeaders.append("sec-fetch-site", "cross-site");
        myHeaders.append("referer", "https://www.pixiv.net/");
        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36");
        var requestOptions = {
                method: 'GET',
                headers: myHeaders,
        };


        if (res.length > 0) {
                fetch(res, requestOptions)
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
                        }).then(() => {
                                chrome.runtime.sendMessage({ notification: "Close" });
                        })
                        .catch((e) => console.log(e));
        }
})

clearImageUrl()
