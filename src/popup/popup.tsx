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
import {
  setStoredSingle,
  getStoredSingle,
  setImageUrlStorage,
} from "../utils/storage";
import { API, ArtworkData } from "../utils/api";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [idSingle, setIdSingle] = useState<string | "">("");
  const [idInput, setIdInput] = useState<string | "">("");
  const [dataArtWord, setdataArtWord] = useState<ArtworkData | "">("");
  const [imageUrl, setImageUrl] = useState<string | "">("");
  const [value, setValue] = useState<number | "">("");
  useEffect(() => {
    getStoredSingle().then((idSingle) => {
      setIdSingle(idSingle);
    });
  }, []);
  const handleCityButtonclick = async () => {
    await API.getArtwordData(idSingle).then((data) => {
      setImageUrl(data.body.urls.original);
      setImageUrlStorage(data.body.urls.original);
    });
  };
  chrome.storage.local.set({
    item: imageUrl,
  });
  function getUrl() {
    chrome.runtime.sendMessage({ greeting: "GetUrl" }, function (response) {
      console.log(response);
    });
  }
  return (
    <Box mx="9px" my="16px">
      <Grid container>
        <Grid item>
          <Typography> {idSingle}</Typography>
          <Button onClick={handleCityButtonclick}>Download image</Button>
          <Button onClick={getUrl}>get the info about artist : </Button>
          <InputBase
                placeholder="Add a artist"
                value={idInput}
                onChange={(event: any) => {
                  setIdInput(event.target.value);
                }}
              />
          <Typography> {imageUrl}</Typography>
          {/* <progress id="imageProgress" value={value} max="100"></progress> */}
        </Grid>
      </Grid>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
