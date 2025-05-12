import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigation } from '@react-navigation/native'; // Thay vì react-router-dom

const PhoneOtpAuth = () => {

  const [step, setStep] = useState('enter-phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [tries, setTries] = useState(0);
  const correctOtp = '123456'; 

  const handlePhoneSubmit = () => {
    if (!phone.match(/^0\d{9}$/)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }
    toast.success(`Mã OTP đã được gửi đến ${phone}`);
    setStep('enter-otp');
  };

  const handleOtpSubmit = () => {
    if (otp === correctOtp) {
      toast.success('Xác thực thành công!');
    } else {
      const nextTries = tries + 1;
      setTries(nextTries);
      if (nextTries >= 3) {
        toast.error('Nhập sai quá 3 lần. Vui lòng nhập lại số điện thoại.');
        setStep('enter-phone');
        setPhone('');
        setOtp('');
        setTries(0);
      } else {
        toast.error(`Mã OTP sai. Còn lại ${3 - nextTries} lần thử.`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Toaster />
    </div>
  );
};

export default PhoneOtpAuth;
