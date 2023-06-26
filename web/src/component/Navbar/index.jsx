import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./index.scss";
export default function NavBar() {
  const history = useNavigate();
  const isHome = window.location.pathname === "/";
  const style = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  };
  const userInfo = sessionStorage.userInfo
    ? JSON.parse(sessionStorage.userInfo)
    : "";
  return (
    <div className="nav-bar" style={isHome ? style : {}}>
      <div>
        <img src="images/logo.jpg" alt="" />
        <div style={{ marginLeft: "6%" }}>
          <Button onClick={() => history("/")}>首页</Button>
          <Button onClick={() => history("/map")}>地图</Button>
        </div>
      </div>
      <div className="nav-bar-right">
        {!userInfo && (
          <Button onClick={() => history("/register")}>注册</Button>
        )}
        {!userInfo && <Button onClick={() => history("/login")}>登录</Button>}
        {userInfo && (
          <Button
            onClick={() => history("/table")}
            size="small"
            variant="contained"
          >
            车位信息
          </Button>
        )}
      </div>
    </div>
  );
}
