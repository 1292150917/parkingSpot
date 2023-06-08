import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import "./index.scss";
export default function NavBar() {
  const history = useNavigate()
  return (
    <div className="nav-bar">
      <div>
        <img src="images/logo.jpg" alt="" />
        <div style={{marginLeft: '6%'}}>
          <Button onClick={()=> history('/')}>首页</Button>
          <Button onClick={()=> history('/map')}>地图</Button>
        </div>
      </div>
      <div className="nav-bar-right">
        <Button onClick={()=> history('/login')}>注册</Button>
        <Button onClick={()=> history('/register')}>登录</Button>
        <Button onClick={()=> history('/table')} size="small" variant="contained">
          车位信息
        </Button>
      </div>
    </div>
  );
}
