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
import Drawer from "@mui/material/Drawer";
import { TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const stackStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
};

export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <Button
        style={{ marginBottom: "10px" }}
        onClick={() => setOpen(true)}
        variant="contained"
      >
        新增
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>问题</StyledTableCell>
              <StyledTableCell align="right">答案</StyledTableCell>
              <StyledTableCell align="right">状态</StyledTableCell>
              <StyledTableCell align="right">操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">1</StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  <div>
                    <Button onClick={() => setOpen(true)}>修改</Button>
                    <Button onClick={() => setOpen(true)}>删除</Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={stackStyle}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
      <Drawer width="400px" anchor={"right"} open={open}>
        <div className="drawer">
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-controlled"
                label="问题"
                variant="standard"
                onChange={event => {
                  // setName(event.target.value);
                }}
              />
              <TextField
                id="outlined-uncontrolled"
                variant="standard"
                label="答案"
                defaultValue="foo"
              />
              <p>状态</p>
              <RadioGroup aria-label="answer" name="answer">
                <FormControlLabel
                  value="answerA"
                  control={<Radio />}
                  label="启用"
                />
                <FormControlLabel
                  value="answerB"
                  control={<Radio />}
                  label="禁用"
                />
              </RadioGroup>
            </Box>
          </div>
          <div>
            <Button variant="contained" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button style={{ marginLeft: "10px" }} variant="contained">
              修改
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
