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

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

  const accessToken = cookies.token;
  const spotifyToken = cookies.spotifyToken;

  const formContainer = css`
    width: 60%;
    margin: 30px 0;
  `;

  const form = css`
    border: 2px solid white;
    margin-bottom: 20px;
    color: white;
  `;

  const label = css`
    color: white;
  `;

  const button = css`
    background-color: rgb(6, 130, 68);
    padding: 10px 20px;
    color: white;
    margin-bottom: 30px;

    &:hover {
      background-color: #004d29;
    }
  `;

  const suggestBox = css`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 90%;
    z-index: 1;
  `;

  const suggest = css`
    text-align: left;
    cursor: pointer;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 8px 8px;

    &:hover {
      background-color: #949593;
    }
  `;

  const HomeContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    margin-bottom: 70px;
    background-color: #002417;
  `;

  const pos = css`
    display: flex;
    align-items: center;
    width: 500px;
    border: 3px solid white;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 10px;
  `;

  const songImg = css`
    height: 150px;
    width: 150px;
  `;

  const postRight = css`
    margin-left: 40px;
    color: white;
    font-size: 18px;
  `;

  const postText = css`
    padding: 5px 0;
  `;

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
      <Header />
      <div css={HomeContainer}>
        <Box css={formContainer}>
          <FormControl isRequired>
            <FormLabel css={label}>曲名を入力してください</FormLabel>
            <Input
              onFocus={() => setIsFocus(true)}
              type="text"
              value={term}
              onChange={handleSingChange}
              css={form}
            />

            {isFocus && (
              <Box css={suggestBox}>
                {singInfo.map((sing, index) =>
                  sing ? (
                    <>
                      <Text
                        key={index}
                        css={suggest}
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
            <FormLabel css={label}>コメント</FormLabel>
            <Input
              type="text"
              onChange={handleCommentChange}
              css={form}
              value={comment}
            />
          </FormControl>

          <Button css={button} onClick={PostInfo}>
            投稿
          </Button>
        </Box>

        {posts.map((post) => (
          <Box css={pos} key={post.id}>
            <img src={post.image} alt="曲の画像" css={songImg} />
            <Box css={postRight}>
              <Text css={postText}>{post.music}</Text>
              <Text css={postText}>{post.artist}</Text>
              <Text css={postText}>{post.comment}</Text>
            </Box>
          </Box>
        ))}
      </div>
    </>
  );
}

export default Home;
