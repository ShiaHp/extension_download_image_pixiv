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


const InfoContainer: React.FC<{
    children: React.ReactNode;
    onDelete?: () => void;
}> = ({ children, onDelete }) => {
    return (
        <Box mx={"4px"} my={"16px"}>
            <Card>
                <CardContent>{children}</CardContent>
             
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
const result1 = []
    if (arrUrl.length > 10) {
        chrome.storage.local.get({ userKeyIds: [] }, function (result) {
            var userKeyIds = result.userKeyIds;
            userKeyIds.push({ keyPairId: arrUrl, HasBeenUploadedYet: false });
            chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {
                chrome.storage.local.get("userKeyIds",async function (result) {

                    const response = result.userKeyIds[0].keyPairId.map((item) => {
                        return API.getArtwordData(item);
                      });
                      await Promise.all(response).then((files) => {
                        files.forEach((file) => {
                          result1.push(file.body.urls.original)
                        });
                      });
            chrome.storage.local.set({ arrUrl1 : result1}, () =>{
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.reload(tabs[0].id);
                  });
            })
                });
            
            });
        });
    }


    return (
        <InfoContainer onDelete={onDelete}>
            <Typography variant="h4">{idArtist}</Typography>
        </InfoContainer>
    );
};
export default Info;
