import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ActorDetail({
  name,
  birthday,
  birthplace,
  nationality,
  relegion,
  personalLife,
  careerLife,
  school,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Card sx={{ marginTop: 5 }}>
        <CardHeader
          style={{ backgroundColor: "#021a33", color: "white" }}
          avatar={
            <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
              {name[0]}
            </Avatar>
          }
          //   action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title={<Typography variant="h6">{name}</Typography>}
          //   subheader={birthday}
          subheader={<span style={{ color: "white" }}>{birthday}</span>}
        />
        {/* <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          /> */}
        <CardContent style={{ backgroundColor: "#bccfe3" }}>
          <Typography variant="subtitle2" component="h6">
            ජාතිය : {nationality}
          </Typography>
          <br />
          <Typography variant="subtitle2" component="h6">
            උපන් ස්ථානය : {birthplace}
          </Typography>
          <br />
          <Typography variant="subtitle2" component="h6">
            ආගම : {relegion}
          </Typography>
          <br />
          <Typography variant="subtitle2" component="h6">
            අධ්‍යාපන ආයතනය : {school}
          </Typography>
          <br />
          <Typography variant="subtitle2" component="h6">
            පෞද්ගලික ජීවිතය
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            {personalLife}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ backgroundColor: "#b1c0f2" }}>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ backgroundColor: "#5F817D", color: "white" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ backgroundColor: "#b1c0f2" }}>    
            <Typography variant="subtitle2" component="h6">
              වෘත්තිිය ජීවිතය
            </Typography>
            <br />
            <Typography variant="subtitle2" color="text.secondary">
              {careerLife}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
