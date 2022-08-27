import { API } from "./api";


const idReg = /[0-9]{9}|[0-9]{8}|[0-9]{10}/


export class checkURL {

    static async checkManyPageCount(url: string) {
        const id = url.match(idReg)[0];
        const data = await API.getArtwordData(id)
        if (data.body.pageCount <= 1) {
            return data.body.pageCount
        } else {
            return data.body.pageCount
        }

    }

    static checkURLmedium(url: string): string {
        console.log(url)
        const str1 = "custom";

        if (url.indexOf(str1) >= 0) {
            const newmessage = url.replace("/custom-thumb", "img-original").replace("_custom1200", "").split("c/360x360_70")[1];
            const headers = 'https://i.pximg.net/'.concat(newmessage)
            return headers
        } else {
            const newmessage = url.replace("master", "original").replace("_square1200", "").split("/c/360x360_70/")[1];
            const headers = 'https://i.pximg.net/'.concat(newmessage)
            return headers

        }

        // const newmessage = url.replace("master", "original").replace("_master1200", "").split("c/540x540_70/")[1];
        // const headers = 'https://i.pximg.net/'.concat(newmessage)
        // return headers



    }
}