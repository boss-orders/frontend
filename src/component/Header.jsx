import { Link } from "react-router-dom";

import classes from "../style/Header.module.css";

function Header(props) {
  const name = props.name;
  const id = props.id;

  return (
    <header className={classes.container}>
      <h3 className={classes.appTitle}>
        <Link to={"/"}>Share Music</Link>
      </h3>

      <h3 className={classes.title}>
        ログイン：<Link to={`/user/${id}`}>{name}</Link>
      </h3>
    </header>
  );
}

export default Header;
