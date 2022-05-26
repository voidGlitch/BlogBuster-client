import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";

export default function Recommend({
  selectedFile,
  Title,
  message,
  name,
  likes,
  _id,
}) {
  return (
    <Card
      // sx={{ minWidth: 275 }}
      style={{
        margin: "8px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
      onClick={() => openPost(_id)}
    >
      <img src={selectedFile} width="100px" />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
          {Title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="textSecondary">
          {name}
        </Typography>
        <Typography variant="body2">Likes: {likes.length}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => openPost(_id)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
