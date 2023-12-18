import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function CreatePost() {
  const [token, setToken] = useState("");
  const [term, setTerm] = useState("");
  const [artist, setArtist] = useState("");
  const [singImage, setSingImage] = useState("");
  const [comment, setComment] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [singInfo, setSingInfo] = useState([]);

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
    <>
      <Box w="50%">
        <FormControl isRequired marginBottom="50px">
          <FormLabel>曲名を入力してください</FormLabel>
          <Input
            onFocus={() => setIsFocus(true)}
            type="text"
            value={term}
            onChange={handleSingChange}
            border="1px solid black"
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
          <FormLabel>コメント</FormLabel>
          <Input
            type="text"
            onChange={handleCommentChange}
            border="1px solid black"
          />
        </FormControl>

        <Button backgroundColor="blue" color="white" onClick={PostInfo}>
          投稿
        </Button>
      </Box>
    </>
  );
}

export default CreatePost;
