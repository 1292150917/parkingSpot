import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField
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
  FaMoneyCheckAlt
} from "react-icons/fa";
import "./index.scss";

const steps = [
  { label: "基础信息", icon: <FaInfoCircle /> },
  { label: "支付确认", icon: <FaCreditCard /> },
  { label: "确认订单", icon: <FaCheck /> }
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    publisherName: "1",
    subscriptionPlan: "2",
    paymentMethod: "3",
    cardNumber: "4",
    expirationDate: "5",
    securityCode: "6"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="checkout">
      <div className="checkout__form">
        <Typography variant="h6" gutterBottom>
          计费信息
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === 0 && (
            <div style={{
              lineHeight: '75px',
              paddingTop: '20px'}}>
              <TextField
                label="发布者名称"
                name="publisherName"
                fullWidth
                InputProps={{
                  startAdornment: <FaUser style={{ marginRight: "8px" }} />
                }}
              />
              <TextField
                label="车位名字"
                name="parkingName"
                fullWidth
                InputProps={{
                  startAdornment: <FaCar style={{ marginRight: "8px" }} />
                }}
              />
              <TextField
                label="车位位置"
                name="parkingLocation"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                  )
                }}
              />
              <TextField
                label="车位价格"
                name="parkingPrice"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FaMoneyBillAlt style={{ marginRight: "8px" }} />
                  )
                }}
              />
              <TextField
                label="预定日期"
                name="bookingDate"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FaCalendarAlt style={{ marginRight: "8px" }} />
                  )
                }}
              />
              <TextField
                label="车位车型"
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleChange}
                fullWidth
                select
                SelectProps={{ native: true }}
                InputProps={{
                  startAdornment: <FaParking style={{ marginRight: "8px" }} />
                }}
              >
                <option value=""></option>
                <option value="basic">基础</option>
                <option value="pro">专业</option>
                <option value="premium">高级</option>
              </TextField>
            </div>
          )}
          {activeStep === 1 && (
            <div style={{
              lineHeight: '75px',
              paddingTop: '20px'}}>
              <Typography variant="h6" gutterBottom>
                支付信息
              </Typography>
              <TextField
                label="持卡人姓名"
                InputProps={{
                  startAdornment: <FaUser style={{ marginRight: "8px" }} />
                }}
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="付款方式"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FaMoneyCheckAlt style={{ marginRight: "8px" }} />
                  )
                }}
                select
                SelectProps={{ native: true }}
              >
                <option value="visa">VISA</option>
                <option value="mastercard">Mastercard</option>
                <option value="paypal">PayPal</option>
              </TextField>
              <TextField
                label="卡号"
                InputProps={{
                  startAdornment: (
                    <FaCreditCard style={{ marginRight: "8px" }} />
                  )
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
                  )
                }}
                value={formData.expirationDate}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="安全码"
                name="securityCode"
                InputProps={{
                  startAdornment: <FaLock style={{ marginRight: "8px" }} />
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
                    {formData.publisherName}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位名字</Typography>
                  <Typography variant="subtitle1">
                    {formData.subscriptionPlan}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位位置</Typography>
                  <Typography variant="subtitle1">
                    {formData.subscriptionPlan}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位价格</Typography>
                  <Typography variant="subtitle1">
                    {formData.subscriptionPlan}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">预定日期</Typography>
                  <Typography variant="subtitle1">
                    {formData.subscriptionPlan}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">车位车型</Typography>
                  <Typography variant="subtitle1">
                    {formData.subscriptionPlan}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">付款方式</Typography>
                  <Typography variant="subtitle1">
                    {formData.paymentMethod}
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
                  <Typography variant="subtitle1">车位价格</Typography>
                  <Typography variant="subtitle1">
                    {formData.securityCode}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">手续费</Typography>
                  <Typography variant="subtitle1">
                    {formData.securityCode}
                  </Typography>
                </div>
                <div className="checkout__confirmationRow">
                  <Typography variant="subtitle1">总金额</Typography>
                  <Typography variant="subtitle1">
                    {formData.securityCode}
                  </Typography>
                </div>
              </div>
            </div>
          )}
          <div className="checkout__actions">
            {activeStep === 0 ? (
              <Button disabled>上一步</Button>
            ) : (
              <Button onClick={handleBack}>上一步</Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("订单已提交！")}
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
