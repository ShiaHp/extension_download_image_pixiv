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
      const id = tabs[0].url.split("https://www.pixiv.net/en/users/")[1];
      setIDArtistStorage(id).then(() => {
        setIdInput("");
        setIdArtist(id);
      });
    });
  }
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
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
