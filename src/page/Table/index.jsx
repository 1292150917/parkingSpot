import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 240;

const SideNav = styled(Drawer)(({ theme }) => ({
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
  },
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

function ListItemLink(props) {
  const history = useNavigate();

  const handleClick = event => {
    event.preventDefault();
    history(props.to);
  };

  return (
    <ListItem button onClick={handleClick}>
      {props.children}
    </ListItem>
  );
}

const DashboardLayout = ({ children }) => {
  return (
    <div style={{}}>
      <Box sx={{ display: "flex" }}>
        <SideNav
          variant="permanent"
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open={true}
        >
          <List>
            <ListItemLink to="/table/stall">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="车位信息" />
            </ListItemLink>
            <ListItemLink to="/table/history">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="预定历史" />
            </ListItemLink>
            <ListItemLink to="/table/doubt">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="QA 疑问" />
            </ListItemLink>
            <ListItemLink to="/table/info">
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="个人资料" />
            </ListItemLink>
          </List>
        </SideNav>
        <Content>
          <div style={{height: '15px'}}></div>
          <Outlet />
        </Content>
      </Box>
    </div>
  );
};

export default DashboardLayout;
