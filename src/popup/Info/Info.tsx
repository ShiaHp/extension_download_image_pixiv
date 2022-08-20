import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { API } from "../../utils/api";
// import {setArrayImageStorage ,getArrayImageStorage} from "../../utils/storage"
const InfoContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        {/* <CardActions>
          {onDelete && <Button color ="primary" onClick={onDelete}>Delete</Button>}
        </CardActions> */}
      </Card>
    </Box>
  );
};

const Info: React.FC<{
  idArtist: string;
  onDelete?: () => void;
}> = ({ idArtist, onDelete }) => {
  const [illusts, setIllusts] = useState<string[] | []>([]);
  const [manga, setManga] = useState<string[] | []>([]);

  useEffect(() => {
    API.getAllArtworks(idArtist).then((data) => {
      setIllusts(data.body.illusts);
      setManga(data.body.manga);
    });
  }, [idArtist]);
  const arrUrl = Object.keys(illusts);
if(arrUrl.length > 10) {
    chrome.storage.local.get({ userKeyIds: [] }, function (result) {
        var userKeyIds = result.userKeyIds;
        userKeyIds.push({ keyPairId: arrUrl, HasBeenUploadedYet: false });
        chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {
          chrome.storage.local.get("userKeyIds", function (result) {
            console.log(result.userKeyIds);
          });
        });
      });
}


  return (
    <InfoContainer onDelete={onDelete}>
      <Typography variant="h4">{idArtist}</Typography>

      <Typography variant="body1"></Typography>
    </InfoContainer>
  );
};
export default Info;
