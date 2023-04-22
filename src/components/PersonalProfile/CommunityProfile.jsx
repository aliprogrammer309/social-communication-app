import { Button, TextField } from "@mui/material";
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
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

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

const CommunityProfile = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState([]);

  const [output, setOutput] = useState([]);
  // var date = new Date();
  // var day = date.getDate();
  // var month = date.getMonth() + 1;
  // var year = date.getFullYear();

  // const imageRegex = /\.(jpg|jpeg|png|gif)$/i;

  // const isImage = [".gif", ".jpg", ".jpeg", ".png"]; //you can add more
  // const isVideo = [".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mp4"];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUnLikeClick = async (id) => {
    // CnQmp51aTVl2mmRSH9lI
    const postRef = doc(db, "posts", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(postRef, {
      liked: false,
    });

    // setLiked(!liked);
  };
  const handleLikeClick = async (id) => {
    // CnQmp51aTVl2mmRSH9lI
    const postRef = doc(db, "posts", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(postRef, {
      liked: true,
    });

    // setLiked(!liked);
  };

  const handleAddComment = async (id) => {
    // CnQmp51aTVl2mmRSH9lI
    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
    setComment("");
    alert("Data added successfully");
  };

  const user = auth.currentUser;
  useEffect(() => {
    // const fetchData = async () => {
    //   let list1 = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "posts"));
    //     querySnapshot.forEach((doc) => {
    //       list1.push({ id: doc.id, ...doc.data() });
    //     });
    //     setPosts(list1);
    //     console.log(list1);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  // console.log(posts);
  return (
    <>
      {/* Community member */}
      <div className="posts-container">
        {posts.map((post) => (
          <Card
            // className="post-card"
            sx={{ minWidth: 700, maxWidth: 700, margin: "1rem" }}
            key={post.id}
          >
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.ownerName}
              subheader={post.time}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.storyText}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="334"
              image={post.img}
              alt="Paella dish"
            />

            <CardActions
              disableSpacing
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {post.liked && (
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    onClick={() => handleUnLikeClick(post.id)}
                    // color={liked ? "error" : ""}
                    color="error"
                  />
                  Unlike
                </IconButton>
              )}
              {!post.liked && (
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    onClick={() => handleLikeClick(post.id)}
                    // color={liked ? "error" : ""}
                    // color="error"
                  />
                  Like
                </IconButton>
              )}
              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore> */}
              <input
                type="text"
                placeholder="Write comment..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleAddComment(post.id);
                }}
              >
                Comment
              </Button>
            </CardActions>
            {console.log(post.comments)}
            {post.comments?.map((comment) => (
              <>
                <p>{comment}</p>
              </>
            ))}
            {/* {post.comments[1]} */}

            {/* {post.comments.map((comment) => (
              <>
                <p>{comment}</p>
                <hr />
              </>
            ))} */}

            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <li>abc</li>
              <li>abc</li>
              <li>abc</li>
              <li>abc</li>
            </CardContent>
          </Collapse> */}
          </Card>
        ))}
      </div>
    </>
  );
};

export default CommunityProfile;
