import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import "./card.scss";

export default function RecipeReviewCard(props) {
  const history = useNavigate();
  function Pay() {
    history("/pay");
  }
  const message = React.useMemo(() => props.message || {}, [props.message]);
  function copyCode() {
    const href = window.location.href + `?lat=${message.lat}&lng=${message.lng}`;
    // 创建一个新的ClipboardItem并设置要复制的代码块的内容
    var item = new ClipboardItem({
      "text/plain": new Blob([href], { type: "text/plain" }),
    });
    // 将要复制的内容添加到剪贴板
    navigator.clipboard.write([item]);
    alert("复制成功，粘贴即可分享");
  }
  return (
    <Card>
      <div>
        <div className="card-gb">
          <ClearIcon onClick={props.clear}></ClearIcon>
        </div>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
      </div>

      <CardMedia
        component="img"
        height="194"
        image="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ float: "right" }}>
        <Button onClick={copyCode} size="small" color="primary">
          分享
        </Button>
        <Button onClick={Pay} size="small" color="primary">
          预定
        </Button>
      </CardActions>
    </Card>
  );
}
