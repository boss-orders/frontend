/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const title = css`
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

const appTitle = css`
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const container = css`
  background-color: #004d29;
  height: 70px;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  const [cookies] = useCookies();
  const [myInfo, setMyInfo] = useState({});

  const accessToken = cookies.token;

  useEffect(() => {
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
  }, []);
  return (
    <header css={container}>
      <h3 css={appTitle}>
        <Link to={"/"}>Share Music</Link>
      </h3>

      <h3 css={title}>
        ログイン：<Link to={`/user/${myInfo.id}`}>{myInfo.username}</Link>
      </h3>
    </header>
  );
}

export default Header;
