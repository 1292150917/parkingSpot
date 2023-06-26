import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import fetch from "../../fetch";
import Drawer from "../../component/Drawer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const stackStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
};

export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false);
  const [parkings, setParkings] = React.useState([]);
  const [msgItem, setMsgItem] = React.useState("");
  React.useEffect(() => {
    if (open) {
      return;
    }
    fetch("/parking", {}, res => {
      setParkings(res.data);
    });
  }, [open]);
  const deleteFun = row => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("确定要执行这个操作吗？")) {
      fetch(
        "/parking/" + row.id,
        {
          method: "delete",
        },
        res => {
          fetch("/parking", {}, res => {
            setParkings(res.data);
          });
        }
      );
    }
  };
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <div style={{height: '15px'}}></div>
      <Button
        onClick={() => [setMsgItem(""), setOpen(true)]}
        style={{ marginBottom: "10px" }}
        variant="contained"
      >
        新增
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>车位名称</StyledTableCell>
              <StyledTableCell align="right">车位简介</StyledTableCell>
              <StyledTableCell align="right">车位地址</StyledTableCell>
              <StyledTableCell align="right">车位价格/天</StyledTableCell>
              <StyledTableCell align="right">车位价格/小时</StyledTableCell>
              <StyledTableCell align="right">地址</StyledTableCell>
              <StyledTableCell align="right">操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkings.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.price_per_day}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.price_per_hour}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.latitude}
                  {row.longitude}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  <div>
                    <Button onClick={() => [setMsgItem(row), setOpen(true)]}>
                      update{" "}
                    </Button>
                    <Button onClick={() => deleteFun(row)}>delete</Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer open={open} msg={msgItem} setOpen={setOpen} />
    </div>
  );
}
