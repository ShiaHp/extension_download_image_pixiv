// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { InputBase, Box, Grid, Typography, Button } from "@material-ui/core";
// import Info from "../popup/Info/Info";
// import { getStoredSingle, setIDArtistStorage } from "../utils/storage";
// import { API, Artwork } from "../utils/api";
// import "./popup.css";

// const App: React.FC<{}> = () => {
//   const [idSingle, setIdSingle] = useState<string | "">("");
//   const [idInput, setIdInput] = useState<string | "">("");
//   const [idArtist, setIdArtist] = useState<string | "">("");
//   const [imageUrl, setImageUrl] = useState<string | "">("");
//   const [offset, setOffset] = useState<number | 48>();
//   const [limit, setLimit] = useState<number | 48>();
//   const [illusts, setIllusts] = useState<string[] | []>([]);

//   useEffect(() => {
//     getStoredSingle().then((idSingle) => {
//       setIdSingle(idSingle);
//     });
//   }, []);
//   const setValueAndDownload = (value: Array<string>) => {
//     const imgList = [];
//     if (value.length > 0) {
//       chrome.storage.local.get({ userKeyIds: [] }, function (result) {
//         var userKeyIds = result.userKeyIds;
//         userKeyIds.push({ keyPairId: value, HasBeenUploadedYet: false });
//         chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {
//           chrome.storage.local.get("userKeyIds", async function (result) {
//             const response = result.userKeyIds[0].keyPairId.map((item) => {
//               return API.getArtwork(item);
//             });

//             await Promise.all(response)
//               .then((files) => {
//                 files.forEach((file : Artwork) => {
//                   if (file.body.pageCount <= 1) {
//                     imgList.push(file.body.urls.original);
//                   } else {
//                     for (let i = 0; i < file.body.pageCount; i++) {
//                       const url = `${file.body.urls.original}`.replace(
//                         "_p0",
//                         `_p${i}`
//                       );
//                       imgList.push(url);
//                     }
//                   }
//                 });
//               })
//               .catch(function (err) {
//                 console.log(err.message);
//               });

//             chrome.storage.local.set({ arrUrl1: imgList, isClose : 0 }, () => {
//               chrome.tabs.query(
//                 { active: true, currentWindow: true },
//                 function (tabs) {
//                   chrome.tabs.reload(tabs[0].id);
//                 }
//               );
//             });
//           });
//         });
//       });
//     }
//   };
//   const handleInputButtonclick = async () => {
//     const updateIdArtist = idArtist;
//     await API.getAllArtworks(updateIdArtist).then((data) => {
//       setIllusts(data.body.illusts);
//     });

//     const arrUrl = Object.keys(illusts);
//     setValueAndDownload(arrUrl);
//   };
//   chrome.storage.local.set({
//     item: imageUrl,
//   });
//   function getUrl() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       const id = tabs[0].url.match(/users\/(\d{2,15})/)[1].toString();
//       setIDArtistStorage(id).then(() => {
//         setIdInput("");
//         setIdArtist(id);
//       });
//     });
//   }

//   const handleUserClickButton = async () => {
//     const arrUrl = [];
//     await API.getBookMarkOfUser(idArtist, "illusts", offset * 48, limit).then(
//       (data) => {
//         data.body.works.map((item) => {
//           if (item.isMasked === false) {
//             arrUrl.push(item.id);
//           }
//         });
//         setValueAndDownload(arrUrl);
//       }
//     );
//   };

//   chrome.runtime.sendMessage({ notification: "download" }, () => {
//     chrome.runtime.onMessage.addListener(function (request) {
//       if (request.notification === "close-window") {
//         window.close();
//       }
//     });
//   });

//   const cssButton = {
//     backgroundColor: "#10a1ef",
//     border: "none",
//     color: "white",
//     padding: "10px 28px",
//     TextAlign: "center",
//     display: "inline-block",
//     fontSize: "14px",
//     fontWeight: "bold",
//     margin: "4px 2px",
//     cursor: "pointer",
//   };

//   const styleFont = {
//     border: "1px solid black",
//     color: "black",
//     padding: "10px",
//     fontFamily: "Sans-Serif",
//   };

//   return (
//     <Box mx="9px" my="16px">
//       <Grid container spacing={2}>
//         <Grid item>
//           <Button onClick={getUrl} style = {cssButton} >
//             get the info about artist{" "}
//           </Button>
//           <InputBase
//             placeholder="Add a artist"
//             value={idInput}
//             style={styleFont}
//             onChange={(event: any) => {
//               setIdInput(event.target.value);
//             }}
//           />
//           <Button
//             onClick={handleInputButtonclick}
//             style={cssButton }
//           >
//             Download Artworkfrom this artist. (click 2 time to download )
//           </Button>
//         </Grid>
//         <Grid item>
//           <Info idArtist={idArtist}  />
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item>
//           <Typography variant="h5">
//             Download from your bookmarks
//           </Typography>
//           <Button onClick={getUrl} style={{ border: "3px solid black" }}>
//             Get Your id
//           </Button>
//         </Grid>
//         <Grid item>
//           {/* offset : là số tranh sẽ bỏ qua : bỏ qua 48 là bỏ page 1 */}
//           <InputBase
//             placeholder="add your offset to download image. Default type is : illusts"
//             value={offset}
//             style={styleFont}
//             onChange={(event: any) => {
//               setOffset(event.target.value);
//             }}
//           />
//           {/* limit : giới hạn tranh tải về trong 1 lượt : mặc định là 48 */}
//           <InputBase
//             placeholder="add your limit to download image"
//             value={limit}
//             style={styleFont}
//             onChange={(event: any) => {
//               setLimit(event.target.value);
//             }}
//           />
//           <Button
//             onClick={handleUserClickButton}
//             style={cssButton }
//           >
//             Download Artworkfrom your bookmarks
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const root = document.createElement("div");
// document.body.appendChild(root);
// ReactDOM.render(<App />, root);
