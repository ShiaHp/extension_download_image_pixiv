import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  InputBase,
  IconButton,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import Info from "../popup/Info/Info";
import UserInfo from "../popup/Info/index";
import {
  setStoredSingle,
  getStoredSingle,
  setImageUrlStorage,
  setIDArtistStorage,
  getIDArtistStorage,
} from "../utils/storage";
import { API, ArtworkData } from "../utils/api";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [idSingle, setIdSingle] = useState<string | "">("");
  const [idInput, setIdInput] = useState<string | "">("");
  const [idArtist, setIdArtist] = useState<string | "">("");
  const [dataArtWord, setdataArtWord] = useState<ArtworkData | "">("");
  const [imageUrl, setImageUrl] = useState<string | "">("");
  const [offset, setOffset] = useState<number | 48>();
  const [limit, setLimit] = useState<number | 48>();

  const [dataInfo, setDataInfo] = useState<Array<number>>([]);

  useEffect(() => {
    getStoredSingle().then((idSingle) => {
      setIdSingle(idSingle);
    });
  }, []);

  const handleInputButtonclick = async () => {
    const updateIdArtist = idInput;
    setIDArtistStorage(updateIdArtist).then(() => {
      setIdInput("");
      setIdArtist(updateIdArtist);
    });
  };
  chrome.storage.local.set({
    item: imageUrl,
  });
  function getUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const id = tabs[0].url.match(/users\/(\d{2,15})/)[1].toString();
      setIDArtistStorage(id).then(() => {
        setIdInput("");
        setIdArtist(id);
      });
    });
  }
  const handleUserClickButton = async () => {
    const arrUrl = [];
    await API.getBookMarkOfUser(idArtist, "illusts", offset * 48, limit).then(
      (data) => {
        data.body.works.map((item) => {
          arrUrl.push(item.id);
        });
        const result1 = [];
        if (arrUrl.length > 0) {
          chrome.storage.local.get({ userKeyIds: [] }, function (result) {
            var userKeyIds = result.userKeyIds;
            userKeyIds.push({ keyPairId: arrUrl, HasBeenUploadedYet: false });
            chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {
              chrome.storage.local.get("userKeyIds", async function (result) {
                const response = result.userKeyIds[0].keyPairId.map((item) => {
                  return API.getArtwordData(item);
                });
                await Promise.all(response).then((files) => {
                  files.forEach((file) => {
                    result1.push(file.body.urls.original);
                  });
                });

                chrome.storage.local.set({ arrUrl1: result1 }, () => {
                  chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                      chrome.tabs.reload(tabs[0].id);
                    }
                  );
                });
              });
            });
          });
        }
      }
    );
  };

  chrome.runtime.sendMessage({ notification: "download" }, () => {
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.notification === "close-window") {
        window.close();
      }
    });
  });
  return (
    <Box mx="9px" my="16px">
      <Grid container>
        <Grid item>
          <Button onClick={getUrl}>get the info about artist : </Button>
          <InputBase
            placeholder="Add a artist"
            value={idInput}
            onChange={(event: any) => {
              setIdInput(event.target.value);
            }}
          />
          <Button onClick={handleInputButtonclick}>
            Download image from this artist
          </Button>
        </Grid>
        <Grid item>
          <Info idArtist={idArtist} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h5">
            Download from your bookmarks : `{idArtist}`
          </Typography>
          <Button onClick={getUrl}>Get Your id</Button>
        </Grid>
        <Grid item>
          {/* offset : là số tranh sẽ bỏ qua : bỏ qua 48 là bỏ page 1 */}
          <InputBase
            placeholder="add your offset to download image. Default type is : illusts"
            value={offset}
            onChange={(event: any) => {
              setOffset(event.target.value);
            }}
          />
          {/* limit : giới hạn tranh tải về trong 1 lượt : mặc định là 48 */}
          <InputBase
            placeholder="add your limit to download image"
            value={limit}
            onChange={(event: any) => {
              setLimit(event.target.value);
            }}
          />
          <Button onClick={handleUserClickButton}>
            Download image from your bookmarks
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
