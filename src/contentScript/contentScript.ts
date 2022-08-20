const data = [
        "33939854",
        "35242191",
        "35436128",
        "38186269",
        "38499040",
        "38983834",
        "39079714",
        "39409685",
        "39909818",
        "40073872",
        "41438445",
        "41516481",
        "41581105",
        "41817334",
        "42006739",
        "42169711",
        "42262190",
        "42638148",
        "43077103",
        "43187051",
        "43554341",
        "43704420",
        "44478833",
        "44797710",
        "45146170",
        "46263528",
        "46542789",
        "46742077",
        "46878938",
        "46921308",
        "47080375",
        "47280298",
        "47391203",
        "47930861",
        "48535956",
        "48930074",
        "49619346",
        "49857173",
        "50443992",
        "50859710",
        "51401484",
        "52433915",
        "53187227",
        "53396028",
        "53801498",
        "54131406",
        "54343804",
        "54533609",
        "54703286",
        "55497451",
        "55857534",
        "56110587",
        "56135681",
        "56363117",
        "56441236",
        "56465195",
        "57472819",
        "57510629",
        "57923866",
        "58186265",
        "58374050",
        "59312799",
        "59679826",
        "59836658",
        "60040062",
        "60323285",
        "60538386",
        "60616020",
        "60656504",
        "60867326",
        "61337179",
        "61561358",
        "61863322",
        "62207681",
        "63597636",
        "63693585",
        "64209615",
        "64779715",
        "64810877",
        "64974489",
        "65479982",
        "65506159",
        "66244454",
        "66304738",
        "66385580",
        "66492550",
        "66648119",
        "66908313",
        "67467188",
        "68201570",
        "68322947",
        "68906461",
        "68957892",
        "69354158",
        "69391223",
        "69568035",
        "69906264",
        "70199121",
        "70837727",
        "71187346",
        "71216465",
        "71244843",
        "71801255",
        "72149983",
        "72479931",
        "72630169",
        "73297999",
        "73739882",
        "73770690",
        "74252295",
        "74280353",
        "74318774",
        "75262760",
        "75293213",
        "75608904",
        "76406193",
        "77330027",
        "78112510",
        "78251615",
        "78332836",
        "78376600",
        "78446937",
        "78738394",
        "78792733",
        "79251641",
        "80296589",
        "81543324",
        "82004445",
        "82092895",
        "82331306",
        "82374329",
        "83273500",
        "83314317",
        "83451607",
        "83493772",
        "85054286",
        "85102747",
        "85176725",
        "85944857",
        "86239024",
        "86361540",
        "87013774",
        "87925419",
        "88004929",
        "88050343",
        "88293422",
        "88360264",
        "88501231",
        "90325444",
        "90603692",
        "90786036",
        "90881578",
        "90946305",
        "91383439",
        "91609948",
        "92239259",
        "92417036",
        "94505675",
        "94764149",
        "94802884",
        "97361926",
        "98136177",
        "98215373",
        "99078878",
        "99079200",
        "99192764"
]

import { API } from '../utils/api';
import {
        setStoredSingle,
        getStoredSingle,
        getImageUrl,
        setImageUrlStorage,
        clearImageUrl,

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

const result = []
chrome.storage.local.get('userKeyIds', async function () {
        var myHeaders = new Headers();
        myHeaders.append("sec-fetch-site", "cross-site");
        myHeaders.append("referer", "https://www.pixiv.net/");
        var requestOptions = {
                method: "GET",
                headers: myHeaders,
        };

        const response = data.map((item) => {
                return API.getArtwordData(item)
        })
        await Promise.all(response).then(files => {
                files.forEach((file) => result.push(file.body.urls.original));
        })

        if (result.length > 0) {
                const response = result.map((url) => {
                        return fetch(url, requestOptions)
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
                                }).catch((e) => console.log(e));
                });

                await Promise.all(response).then(files => {
                        files.forEach((file) => console.log(file));
                })
        }






});
