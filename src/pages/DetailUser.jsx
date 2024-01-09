import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import Header from "../component/Header";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function DetailUser() {
  const userId = useParams().id;
  const [userInfo, setUserInfo] = useState({});

  const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    margin-bottom: 70px;
    background-color: #002417;
  `;

  const title = css`
    color: white;
    font-size: 25px;
    margin: 30px 0;
  `;

  const info = css`
    color: white;
    font-size: 20px;
    list-style: none;
  `;

  const infoList = css`
    text-align: left;
    margin-bottom: 50px;
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
    fetch(`http://127.0.0.1:8000/users/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        console.log(user);
        setUserInfo(user);
      });
  }, []);

  return (
    <>
      <Header />
      <div css={container}>
        <h1 css={title}>ユーザー詳細</h1>
        <ul css={infoList}>
          <li css={info}>ユーザー名：{userInfo.username}</li>
          <li css={info}>作成日：{userInfo.created_at}</li>
        </ul>
        {userInfo.posts &&
          userInfo.posts.map((post) => (
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

export default DetailUser;
