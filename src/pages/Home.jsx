import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "./style.css";

import classes from "../style/Home.module.css";

import Header from "../component/Header";

function Home() {
  const [term, setTerm] = useState("");
  const [artist, setArtist] = useState("");
  const [singImage, setSingImage] = useState("");
  const [comment, setComment] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [singInfo, setSingInfo] = useState([]);
  const [songId, setSongId] = useState("");
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [newPost, setNewPost] = useState();
  const [myInfo, setMyInfo] = useState();

  const spotifyToken = cookies.spotifyToken;
  const accessToken = cookies.token;

  const handleSingChange = (e) => {
    setTerm(e.target.value);

    if (term) {
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=7`, {
        method: "GET",
        headers: { Authorization: `Bearer ${spotifyToken}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log(info.tracks.items);
          setSingInfo(info.tracks.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const PostInfo = () => {
    fetch(`http://127.0.0.1:8000/users/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        music: term,
        image: singImage,
        artist: artist,
        comment: comment,
        music_id: songId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((post) => {
        alert("投稿されました");
        setTerm("");
        setComment("");
        setNewPost(post);
      });
  };

  useEffect(() => {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${process.env.REACT_APP_API_CLIENT}:${process.env.REACT_APP_API_CLIENT_SECRET}`
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.REACT_APP_API_REFRESH_TOKEN,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((tokenData) => {
        setCookie("spotifyToken", tokenData.access_token);
      })
      .then(() => {
        fetch(`http://127.0.0.1:8000/users/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((myInfo) => {
            setMyInfo(myInfo);
          });
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/?skip=0&limit=100")
      .then((res) => {
        return res.json();
      })
      .then((post) => {
        const reversePost = [...post].reverse();
        setPosts(reversePost);
      });
  }, [newPost]);

  return (
    <>
      {myInfo && <Header name={myInfo.username} id={myInfo.id} />}
      <div className={classes.HomeContainer}>
        <Box className={classes.formContainer}>
          <FormControl isRequired>
            <FormLabel className={classes.label}>
              曲名を入力してください
            </FormLabel>
            <Input
              onFocus={() => setIsFocus(true)}
              type="text"
              value={term}
              onChange={handleSingChange}
              className={classes.form}
            />

            {isFocus && (
              <Box className={classes.suggestBox}>
                {singInfo.map((sing, index) =>
                  sing ? (
                    <>
                      <Text
                        key={index}
                        className={classes.suggest}
                        onClick={async () => {
                          await setTerm(sing.name);
                          await setArtist(sing.artists[0].name);
                          await setSingImage(sing.album.images[0].url);
                          await setSongId(sing.id);
                          await setIsFocus(false);
                        }}
                      >
                        <img
                          src={sing.album.images[0].url}
                          style={{
                            marginRight: "30px",
                            height: "50px",
                            width: "50px",
                          }}
                          alt="曲の画像"
                        />
                        {sing.name} <br />
                        {sing.artists[0].name}
                      </Text>
                    </>
                  ) : null
                )}
              </Box>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel className={classes.label}>コメント</FormLabel>
            <Input
              type="text"
              onChange={handleCommentChange}
              className={classes.form}
              value={comment}
            />
          </FormControl>

          <Button className={classes.postbutton} onClick={PostInfo}>
            投稿
          </Button>
        </Box>

        {posts.map((post) => (
          <Box className={classes.pos} key={post.id}>
            <img src={post.image} alt="曲の画像" className={classes.songImg} />
            <Box className={classes.postRight}>
              <Text className={classes.postText}>{post.music}</Text>
              <Text className={classes.postText}>{post.artist}</Text>
              <Text className={classes.postText}>{post.comment}</Text>
              <Text className={classes.postCreater}>
                作成者：{post.user.username}
              </Text>
            </Box>
          </Box>
        ))}
      </div>
    </>
  );
}

export default Home;
