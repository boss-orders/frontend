import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function CreatePost() {
  const [token, setToken] = useState("");
  const [term, setTerm] = useState("");
  const [artist, setArtist] = useState("");
  const [singImage, setSingImage] = useState("");
  const [comment, setComment] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [singInfo, setSingInfo] = useState([]);

  const container = css`
    display: flex;
    flex-direction: column; /* Align children in a column */
    align-items: center; /* Center items horizontally */
    background-color: #002417;
    min-height: 100vh;
    text-align: center;
  `;

  const title = css`
    font-size: 40px;
    color: white;
  `;

  const formContainer = css`
    width: 60%;
    margin: 30px 0;
  `;

  const form = css`
    background-color: white;
    border: 1px solid;
  `;

  const label = css`
    color: white;
  `;

  const button = css`
    background-color: rgb(6, 130, 68);
    padding: 10px 20px;
    color: white;

    &:hover {
      background-color: #004d29;
    }
  `;

  const suggest = css`
    text-align: left;
    cursor: pointer;
    background-color: white;
    display: flex;
    align-items: center;

    
                      _hover={{ bg: "#949593" }}
                      key={index}
                      p="8px 8px"
  `;

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
        setToken(tokenData.access_token);
        console.log("トークンセット");
      });
  }, []);

  const handleSingChange = (e) => {
    setTerm(e.target.value);
    console.log(token);

    if (term) {
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=7`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
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
    console.log(term);
    console.log(artist);
    console.log(singImage);
    console.log(comment);
  };

  return (
    <div css={container}>
      <h2 css={title}>投稿画面</h2>
      <Box css={formContainer}>
        <FormControl isRequired marginBottom="50px">
          <FormLabel css={label}>曲名を入力してください</FormLabel>
          <Input
            onFocus={() => setIsFocus(true)}
            type="text"
            value={term}
            onChange={handleSingChange}
            border="1px solid black"
            css={form}
          />

          {isFocus && (
            <Box
              w="100%"
              h="100%"
              boxShadow="md"
              bg="white"
              mt="8px"
              borderRadius="lg"
            >
              {singInfo.map((sing, index) =>
                sing ? (
                  <>
                    <Text
                      cursor="pointer"
                      bg="white"
                      display="flex"
                      alignItems="center"
                      _hover={{ bg: "#949593" }}
                      key={index}
                      p="8px 8px"
                      css={suggest}
                      onClick={async () => {
                        await setTerm(sing.name);
                        await setArtist(sing.artists[0].name);
                        await setSingImage(sing.album.images[0].url);
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

        <FormControl isRequired marginBottom="50px">
          <FormLabel css={label}>コメント</FormLabel>
          <Input
            type="text"
            onChange={handleCommentChange}
            border="1px solid black"
            css={form}
          />
        </FormControl>

        <Button css={button} onClick={PostInfo}>
          投稿
        </Button>
      </Box>
    </div>
  );
}

export default CreatePost;
