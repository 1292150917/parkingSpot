import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fetch from "../../fetch";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Drawer from "../../component/Drawer";
import ReviewForm from "./ReviewForm"

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

let message = {}
export default function CustomizedTables() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [msgItem, setMsgItem] = React.useState("");
  const userInfo = sessionStorage.userInfo
    ? JSON.parse(sessionStorage.userInfo)
    : {};

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    fetch("/reserve", {}, res => {
      res.data.map(item => {
        if (!item.parking) {
          item.parking = {};
        }
        // 下单人 === 自己
        item.isCancel = item.user_id == userInfo.id;
        // 车位人 === 自己
        item.isRefuse = item.parking.user_id == userInfo.id;
      });
      setData(res.data);
    });
  }, [index]);

  const stateFun = state => {
    switch (state) {
      case "1":
        return "申请中";
      case "2":
        return "拒绝预定";
      case "3":
        return "取消预定";
      case "4":
        return "同意预定";
      case "5":
        return "订单完成";

      default:
        break;
    }
  };

  const updateCommon = (res) => {
    message = res
    setOpenDialog(true)
  };

  const commonClick = (res) => {
    const data = {
      ...message,
      comment: res.comment,
      state: 5,
      star: res.rating,
    };
    console.log(message)
    fetch(
      "/reserve/" + message.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      res => {
        setIndex(res => res + 1);
      }
    );
  }

  const updateService = (res, state) => {
    const data = {
      ...res,
      state,
    };
    var confirmed = window.confirm("确定要执行此操作吗？");
    if (!confirmed) {
      return;
    }
    fetch(
      "/reserve/" + res.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      res => {
        setIndex(res => res + 1);
      }
    );
  };
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <div style={{height: '15px'}}></div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>车位名称</StyledTableCell>
              <StyledTableCell>车位地址</StyledTableCell>
              <StyledTableCell align="right">开始时间</StyledTableCell>
              <StyledTableCell align="right">结束时间</StyledTableCell>
              <StyledTableCell align="right">天/小时</StyledTableCell>
              <StyledTableCell align="right">总价</StyledTableCell>
              <StyledTableCell align="right">状态</StyledTableCell>
              <StyledTableCell align="right">操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.parking.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.parking.address}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.start_time}
                </StyledTableCell>
                <StyledTableCell align="right">{row.end_time}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.type === "1" ? "天" : "小时"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.total_prices}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {stateFun(row.state)}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  <div>
                    {row.isCancel && row.state === "1" && (
                      <Button onClick={() => updateService(row, 3)}>
                        取消预定
                      </Button>
                    )}
                    {row.isCancel &&
                      (
                        // (row.state === "2" || row.state === "3") && 
                        <Button onClick={() => updateService(row, 1)}>
                          重新发起
                        </Button>
                      )}
                    {row.isRefuse && row.state === "1" && (
                      <Button onClick={() => updateService(row, 2)}>
                        拒绝预定
                      </Button>
                    )}
                    {row.isRefuse && row.state === "1" && (
                      <Button onClick={() => updateService(row, 4)}>
                        同意预定
                      </Button>
                    )}
                    {row.isCancel && row.state === "4" && (
                      <Button onClick={() => updateCommon(row)}>评价</Button>
                    )}
                    {/* {row.isCancel && (
                      <Button
                        onClick={() => [setMsgItem(row.parking), setOpen(true)]}
                      >
                        查看快照
                      </Button>
                    )} */}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ReviewForm open={openDialog} onClick={commonClick} onClose={setOpenDialog}></ReviewForm>
      <Drawer open={open} msg={msgItem} disabled={true} setOpen={setOpen} />
    </div>
  );
}
