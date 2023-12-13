import React, { useEffect } from "react";
function Home() {
  useEffect(() => {
    console.log("aa");
    fetch("http://localhost:8080/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "test",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  }, []);
  return <div className="home">hello</div>;
}

export default Home;
