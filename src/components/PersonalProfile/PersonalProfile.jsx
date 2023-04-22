import { Button } from "@mui/material";
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
import UserProfile from "../UserProfile/UserProfile";
import "./personalProfile.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useState } from "react";

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

const PersonalProfile = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [output, setOutput] = useState([]);
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const [storyText, setStoryText] = React.useState("");
  const [file, setFile] = React.useState("");

  const storage = getStorage();
  // const storageRef = ref(storage, "images/rivers.jpg");
  const [data, setData] = useState({});
  // const uploadTask = uploadBytesResumable(storageRef, file);
  console.log(storyText);

  const user = auth.currentUser;

  
  React.useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     let list = [];
  //     try {
  //       const q = query(
  //         collection(db, "posts"),
  //         where("owner", "==", user?.uid)
  //       );
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         list.push({ id: doc.id, ...doc.data() });
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //       setOutput(list);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        ...data,
        storyText: storyText,
        ownerId: user.uid,
        ownerName: user.displayName,
        time: day + "/" + month + "/" + year,
      });
      alert("Successfully Post Added!");
      window.location.reload();
    } catch (err) {
      alert("Failed to Post!");
      console.log(err);
    }
  };

  // const handleUpload
  return (
    <div className="personal-profile-container">
      <form className="ask-for-post">
        <input
          type="text"
          required
          placeholder="What's on your mind?"
          onChange={(e) => {
            setStoryText(e.target.value);
          }}
          style={{ margin: "0 auto" }}
        />
        <div className="media-upload">
          <input
            required
            type="file"
            style={{ width: "200px" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {/* <PermMediaIcon /> */}

          <Button variant="contained" size="small" onClick={handleAdd}>
            Post
          </Button>
        </div>
      </form>
      {/* <div className="posts-container">
        {output.map((post) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              // avatar={
              //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              //     R
              //   </Avatar>
              // }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user?.displayName}
              subheader={post.time}
            />
            <CardMedia
              component="img"
              height="194"
              image={post.img}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.storyText}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon
                  onClick={handleLikeClick}
                  color={liked ? "error" : ""}
                />
              </IconButton>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Card>
        ))}
      </div> */}
    </div>
  );
};

export default PersonalProfile;
