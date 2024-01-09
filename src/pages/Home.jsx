import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import "./style.css";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CreatePost from "./CreatePost";
import Header from "../component/Header";

function Home() {
  const [posts, setPosts] = useState([]);

  const postContainer = css`
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/?skip=0&limit=100")
      .then((res) => {
        return res.json();
      })
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
  }, []);
  return (
    <div css={postContainer}>
      <Header />
      <CreatePost />

      {posts.map((post) => (
        <Box css={pos}>
          <img src={post.image} alt="曲の画像" css={songImg} />
          <Box css={postRight}>
            <Text css={postText}>{post.music}</Text>
            <Text css={postText}>{post.artist}</Text>
            <Text css={postText}>{post.comment}</Text>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default Home;
