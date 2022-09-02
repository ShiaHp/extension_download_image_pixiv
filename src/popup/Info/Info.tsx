import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

const InfoContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
}> = ({ idArtist }) => {
  return (
    <InfoContainer>
      <Typography variant="h4">{idArtist ? idArtist : "Your id or artist go here"}</Typography>
    </InfoContainer>
  );
};
export default Info;
