import React, { useEffect } from "react";
function Home() {
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/test")
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  });
  return <div className="home">hello</div>;
}

export default Home;
