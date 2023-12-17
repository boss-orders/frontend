import React, { useEffect } from "react";
function Home() {
  const clickButton = () => {
    fetch("http://localhost:8080/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "hogehoge",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/")
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  }, []);
  return (
    <>
      <div className="home">hello</div>
      <button type="button" onClick={clickButton}>
        クリック
      </button>
    </>
  );
}

export default Home;
