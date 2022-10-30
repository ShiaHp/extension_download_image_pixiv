import { API, ArtworkData } from "./api";

export const idReg = /[0-9]{7,11}/;
export const idTweet = /[0-9]{19,21}/;
export const format_pixiv: number = 0;
export const format_twitter: number = 1;

export class checkURL {
  static async getDatafromRequest(url: string): Promise<any> {
    const id = url.match(idReg)[0];
    const data = await API.getArtwordData(id);
    return data;
  }
  static async checkData(url: string) {
    return this.getDatafromRequest(url).then((data) => data);
  }
  static classifiedPageCount(data: ArtworkData): any[] {
    const urlArr = [];
    if (data?.body?.pageCount <= 1 || data) {
      urlArr.push(data);
    } else {
      for (let i = 0; i < data.body.pageCount; i++) {
        const url = `${data.body.urls.original}`.replace("_p0", `_p${i}`);
        urlArr.push(url);
      }
    }
    return urlArr;
  }
}

export class check {
  static checkName(name: string): number {
    let isPixiv: boolean = name.indexOf("pixiv") > -1;
    if (isPixiv) {
      return 0;
    } else {
      return 1;
    }
  }
}

export const buttonDownloadAllCss = `
.style {
  zIndex : 9999;
  background-color: #52e010;
  border-radius : 5px;
  font-size : 18px;
  align-content : center;
  color : #fff;
  position : fixed;
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

export const checkboxCss = `
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
`

export const buttonCss = `
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
`


export const myProgresscss = `
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
`

export const processBarcss = `
  .processBar {
   background-color : #04AA6D;
  font-size :15px;
  width : 10%;
  height : 10px;
  display : block;
  }
`

