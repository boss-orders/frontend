import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import Header from "../component/Header";

import classes from "../style/DetailUser.module.css";

function DetailUser() {
  const userId = useParams().id;
  const [userInfo, setUserInfo] = useState({});

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
      <div className={classes.container}>
        <h1 className={classes.title}>ユーザー詳細</h1>
        <ul className={classes.infoList}>
          <li className={classes.info}>ユーザー名：{userInfo.username}</li>
          <li className={classes.info}>作成日：{userInfo.created_at}</li>
        </ul>
        {userInfo.posts &&
          userInfo.posts.map((post) => (
            <Box className={classes.pos} key={post.id}>
              <img
                src={post.image}
                alt="曲の画像"
                className={classes.songImg}
              />
              <Box className={classes.postRight}>
                <Text className={classes.postText}>{post.music}</Text>
                <Text className={classes.postText}>{post.artist}</Text>
                <Text className={classes.postText}>{post.comment}</Text>
              </Box>
            </Box>
          ))}
      </div>
    </>
  );
}

export default DetailUser;
