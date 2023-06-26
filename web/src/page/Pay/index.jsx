import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  FaInfoCircle,
  FaCreditCard,
  FaCheck,
  FaUser,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCar,
  FaLock,
  FaParking,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import fetch from "../../fetch";
import "./index.scss";
import { useMemo } from "react";

const steps = [
  { label: "基础信息", icon: <FaInfoCircle /> },
  { label: "支付确认", icon: <FaCreditCard /> },
  { label: "确认订单", icon: <FaCheck /> },
];


function convertTimeStr(isoTime) {
  const dateObj = new Date(isoTime);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

let isType = 0; //1天 2小时

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");

  const payItem = sessionStorage.item ? JSON.parse(sessionStorage.item) : {};
  const [formData, setFormData] = useState({
    publisherName: "1",
    subscriptionPlan: "2",
    paymentMethod: "3",
    cardNumber: "4",
    expirationDate: "5",
    securityCode: "6",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const goClick = () => {
    const data = {
      user_id: JSON.parse(sessionStorage.userInfo).id,
      start_time: convertTimeStr(startTime),
      end_time: convertTimeStr(endTime),
      service_change: amount * 0.15,
      bank_card: formData.cardNumber,
      bank_name: formData.cardName,
      bank_code: formData.securityCode,
      bank_time: formData.expirationDate,
      price: amount,
      type: isType,
      parking_id: payItem.id,
      total_prices: amount + amount * 0.15,
      state: 1,
    };
    fetch(
      "/reserve",
      {
        method: "POSt",
        body: JSON.stringify(data),
      },
      res => {
        if (res.code === "200") {
          alert("预定成功");
        }
      }
    );
    return;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const amount = useMemo(() => {
    if (!startTime || !endTime) {
      return 0;
    }
    const newStartTime = new Date(convertTimeStr(startTime));
    const newEndTime = new Date(convertTimeStr(endTime));
    const totalMs = Math.abs(newEndTime - newStartTime); // 计算两个时间的时间差（毫秒）
    const totalHours = totalMs / (60 * 60 * 1000); // 将时间差转换为小时数
    if (totalHours <= 9) {
      const amount = Math.ceil(totalHours) * payItem.price_per_hour;
      isType = 2;
      return amount;
    } else {
      const days = Math.floor(totalHours / 24); // 计算停车的天数
      const remainderHours = totalHours % 24; // 计算除去整天后剩余的小时数
      const amount =
        days * payItem.price_per_day +
        Math.ceil(remainderHours / 9) * payItem.price_per_day;
      isType = 1;
      return amount;
    }
  }, [startTime, endTime]);

  return (
    <div className="checkout">
      <div className="checkout__form">
        <Typography variant="h6" gutterBottom>
          计费信息
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(step => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === 0 && (
            <div
              style={{
                lineHeight: "75px",
                paddingTop: "20px",
              }}
            >
              <TextField
                label="发布者名称"
                name="publisherName"
                fullWidth
                disabled
                value={payItem.info.name}
                InputProps={{
                  startAdornment: <FaUser style={{ marginRight: "8px" }} />,
                }}
              />
              <TextField
                label="车位名字"
                name="parkingName"
                fullWidth
                disabled
                value={payItem.name}
                InputProps={{
                  startAdornment: <FaCar style={{ marginRight: "8px" }} />,
                }}
              />
              <TextField
                label="车位位置"
                name="parkingLocation"
                onChange={handleChange}
                disabled
                value={payItem.description}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                  ),
                }}
              />
              <TextField
                label="可停放类型"
                name="parkingPrice"
                fullWidth
                disabled
                value={payItem.standard}
                InputProps={{
                  startAdornment: <FaParking style={{ marginRight: "8px" }} />,
                }}
              />

              <TextField
                label="预定类型"
                name="subscriptionPlan"
                select
                fullWidth
                SelectProps={{ native: true }}
                value={subscriptionPlan}
                onChange={e => setSubscriptionPlan(e.target.value)}
                InputProps={{
                  startAdornment: <FaParking style={{ marginRight: "8px" }} />,
                }}
              >
                <option value="day">${payItem.price_per_day}/天</option>
                <option value="hour">${payItem.price_per_hour}/小时</option>
              </TextField>
              <TextField
                label="开始时间"
                name="startTime"
                fullWidth
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                type={"datetime-local"}
                InputProps={{
                  startAdornment: (
                    <div className="startAdornment">
                      <FaCalendarAlt style={{ marginRight: "8px" }} />
                    </div>
                  ),
                }}
              />

              <TextField
                label="结束时间"
                name="endTime"
                fullWidth
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                type={"datetime-local"}
                InputProps={{
                  startAdornment: (
                    <div className="startAdornment">
                      <FaCalendarAlt style={{ marginRight: "8px" }} />
                    </div>
                  ),
                }}
              />

              <p style={{ textAlign: "right" }}>价格：{amount}元</p>
            </div>
          )}
          {activeStep === 1 && (
            <div
              style={{
                lineHeight: "75px",
                paddingTop: "20px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                支付信息
              </Typography>
              <TextField
                label="持卡人姓名"
                InputProps={{
                  startAdornment: <FaUser style={{ marginRight: "8px" }} />,
                }}
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="卡号"
                InputProps={{
                  startAdornment: (
                    <FaCreditCard style={{ marginRight: "8px" }} />
                  ),
                }}
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="过期日期"
                name="expirationDate"
                InputProps={{
                  startAdornment: (
                    <FaCalendarAlt style={{ marginRight: "8px" }} />
                  ),
                }}
                value={formData.expirationDate}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="安全码"
                name="securityCode"
                InputProps={{
                  startAdornment: <FaLock style={{ marginRight: "8px" }} />,
                }}
                value={formData.securityCode}
                onChange={handleChange}
                fullWidth
              />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Typography variant="h6" gutterBottom>
                确认订单
              </Typography>
              <div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">发布者名称</Typography>
                  <Typography variant="subtitle1">
                    {payItem.info.name}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位名字</Typography>
                  <Typography variant="subtitle1">{payItem.name}</Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位位置</Typography>
                  <Typography variant="subtitle1">{payItem.address}</Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">付款方式</Typography>
                  <Typography variant="subtitle1">
                    {formData.paymentMethod}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">姓名</Typography>
                  <Typography variant="subtitle1">
                    {formData.cardName}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">卡号</Typography>
                  <Typography variant="subtitle1">
                    {formData.cardNumber}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">过期日期</Typography>
                  <Typography variant="subtitle1">
                    {formData.expirationDate}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">安全码</Typography>
                  <Typography variant="subtitle1">
                    {formData.securityCode}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">预定类型</Typography>
                  <Typography variant="subtitle1">
                    $
                    {subscriptionPlan === "day"
                      ? payItem.price_per_day + "/天"
                      : payItem.price_per_hour + "/小时"}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">开始时间</Typography>
                  <Typography variant="subtitle1">
                    {convertTimeStr(startTime)}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">结束时间</Typography>
                  <Typography variant="subtitle1">
                    {convertTimeStr(endTime)}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位价格</Typography>
                  <Typography variant="subtitle1">{amount}</Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">手续费</Typography>
                  <Typography variant="subtitle1">{amount * 0.15}</Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">总金额</Typography>
                  <Typography variant="subtitle1">
                    {amount + amount * 0.15}
                  </Typography>
                </div>
              </div>
            </div>
          )}
          <div className="checkout__actions">
            {activeStep === 0 ? (
              <div></div>
            ) : (
              <Button onClick={handleBack}>上一步</Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => goClick()}
              >
                提交订单
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                下一步
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
