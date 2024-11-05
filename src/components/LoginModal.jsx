import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import axios from "axios"; // Import axios
import { API_URL } from "../constant/APIConstant";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../store/slices/userSlices";
import { useDispatch } from "react-redux";
export default function LoginModal({ isOpen, onClose }) {
  const [isOtpScreen, setOtpScreen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState(false); // false = email, true = mobile
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = async () => {
    try {
      if (method && mobileNumber) {
        // Send OTP using mobile number
        axios
          .post(`${API_URL}/auth/sendOtpWithSms`, {
            phoneNumber: mobileNumber,
            countryCode: "+91",
          })
          .then((res) => {
            if (res.status == 200) {
              setOtpScreen(true); // Move to OTP screen after successful OTP request
              toast.success(`Otp Sent Successfully`, {
                position: "top-center", // Set the position to top-right
                duration: 3000, // Display for 3 seconds (3000 ms)
                style: {
                  fontWeight: "bold",
                  fontSize: "14px", // Smaller text
                },
              });
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      } else if (!method && email) {
        axios
          .post(`${API_URL}/auth/sendOtpWithEmail`, { email: email })
          .then((res) => {
            if (res.status == 200) {
              setOtpScreen(true); // Move to OTP screen after successful OTP request
              toast.success(`Otp Sent Successfully`, {
                position: "top-center", // Set the position to top-right
                duration: 3000, // Display for 3 seconds (3000 ms)
                style: {
                  fontWeight: "bold",
                  fontSize: "14px", // Smaller text
                },
              });
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerify = () => {
    console.log(`Verifying OTP: ${otp}`);

    axios
      .post(`${API_URL}/auth/validateOTP`, {
        otp,
        email,
        phoneNumber: mobileNumber,
      })
      .then((res) => {
        console.log(res.data.user);

        const isRegistered = res.data.user.isRegistered;
        console.log(isRegistered);
        toast.success(`Otp Verified Successfully`, {
          position: "top-center", // Set the position to top-right
          duration: 3000, // Display for 3 seconds (3000 ms)
          style: {
            fontWeight: "bold",
            fontSize: "14px", // Smaller text
          },
        });
        if (res.status === 200 && isRegistered) {
          dispatch(userDetails(res.data.user));
          handleCloseModal();
          navigate("/");
        } else {
          handleCloseModal();
          navigate(`/register/${res.data.user.id}`);
        }
      })
      .catch((err) => {
        toast.error(`Otp Failed`, {
          position: "top-center", // Set the position to top-right
          duration: 3000, // Display for 3 seconds (3000 ms)
          style: {
            fontWeight: "bold",
            fontSize: "14px", // Smaller text
          },
        });
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    onClose();
    setOtpScreen(false);
    setMobileNumber("");
    setEmail("");
    setOtp("");
  };

  const handleChangeLoginMethod = () => {
    // Reset the field value when switching method
    if (method) {
      setMobileNumber("");
    } else {
      setEmail("");
    }
    setMethod(!method);
  };

  if (!isOpen) return null; // Return null if the modal is not open
  console.log("mobile number", mobileNumber);
  console.log("email", email);
  console.log(method);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-bl bg-opacity-50">
      <div className="bg-b-1 p-[1.5rem] sm:p-[4rem] rounded-[1.5rem] sm:rounded-[2.6rem] shadow-lg relative w-[90%] h-[53%] sm:w-[54rem] sm:h-[62.5rem]">
        {/* Close button */}
        <button
          className="absolute top-6 right-8 text-bl font-bold"
          onClick={handleCloseModal}
        >
          <X size={24} />
        </button>

        {/* Conditional rendering based on isOtpScreen */}
        {!isOtpScreen ? (
          <div>
            <h2 className="text-[28px] sm:text-[35px] font-semibold text-center font-nunito">
              Login
            </h2>
            <p className="text-[20px] sm:text-[24px] font-normal text-center font-nunito mb-[2rem] sm:mb-[5.5rem]">
              Get Started
            </p>
            {method ? (
              <label className="text-[16px] sm:text-[24px] font-light mb-4 font-nunito">
                Enter Your Mobile Number
              </label>
            ) : (
              <label className="text-[16px] sm:text-[24px] font-light mb-4 font-nunito">
                Enter Your Email
              </label>
            )}
            {method ? (
              <div className="flex items-center gap-2">
                <span className="border border-br-1 p-[15px] rounded-[10px] h-[45px] sm:h-[60px] text-[12px] sm:text-[20px] font-normal font-nunito">
                  +91
                </span>
                <input
                  type="number"
                  className="border border-br-1 p-[20px] rounded-[10px] w-full h-[45px] sm:h-[60px] text-[16px] sm:text-[20px] font-normal font-nunito"
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 10) {
                      setMobileNumber(value);
                    }
                  }}
                  placeholder="Mobile Number"
                  maxLength={10} 
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="border border-br-1 p-[20px] rounded-[10px] w-full h-[45px] sm:h-[60px] text-[16px] sm:text-[20px] font-normal font-nunito"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            )}
            <button
              className="bg-p-1 mt-[24px] rounded-[10px] w-full h-[45px] sm:h-[60px] text-b-1 text-[16px] sm:text-[20px] font-normal font-nunito"
              onClick={handleContinue}
            >
              Continue
            </button>
            <div className="flex gap-4 items-center justify-center my-[1.5rem] sm:my-[5.5rem] ">
              <div className="w-[45%] bg-b-3 h-[1px]" />
              <p className="text-[16px] sm:text-[24px] font-normal font-nunito">
                or
              </p>
              <div className="w-[45%] bg-b-3 h-[1px]" />
            </div>
            <button
              className="bg-b-1 border border-br-1 mb-[24px] rounded-[10px] w-full h-[45px] sm:h-[60px] text-bl text-[16px] sm:text-[20px] font-normal font-nunito"
              onClick={handleChangeLoginMethod}
            >
              {method ? "Continue with Email" : "Continue with Mobile Number"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-[28px] sm:text-[35px] font-semibold text-center font-nunito">
              Login
            </h2>
            <p className="text-[20px] sm:text-[24px] font-normal text-center font-nunito mb-[2rem] sm:mb-[5.5rem]">
              Get Started
            </p>
            <label className="text-[14px] sm:text-[24px] font-light mb-5 font-nunito">
              Enter the 6-digit code Send to you at
              <p className="text-[16px] sm:text-[24px] font-light mb-5 font-nunito">
                {method ? mobileNumber : email}
              </p>
            </label>
            <div className="flex justify-between gap-2">
              {Array(6)
                .fill("")
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)} // Assigning ref to each input
                    type="text"
                    maxLength="1"
                    className="border border-br-1 pl-[1px] rounded-[10px] w-[4rem] sm:w-[6rem] h-[4rem] sm:h-[6rem] text-[20px] font-normal font-nunito text-center"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const updatedOtp = otp.split("");
                      updatedOtp[index] = e.target.value;
                      setOtp(updatedOtp.join(""));

                      // Move focus to the next input if not the last input and the input is filled
                      if (e.target.value && index < 5) {
                        inputRefs.current[index + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Move focus to the previous input on backspace
                      if (
                        e.key === "Backspace" &&
                        !e.target.value &&
                        index > 0
                      ) {
                        inputRefs.current[index - 1].focus();
                      }
                    }}
                  />
                ))}
            </div>
            <button
              className="bg-p-1 mt-[24px] rounded-[10px] w-full h-[4.5rem] sm:h-[60px] text-b-1 text-[20px] font-normal font-nunito"
              onClick={handleVerify}
            >
              Verify
            </button>
            <p className="text-[16px] sm:text-[20px] font-thin font-nunito text-g-1 text-center mt-4">
              Resend OTP in{" "}
              <span className="text-[16px] sm:text-[20px] font-normal font-nunito text-g-2">
                00:54
              </span>
            </p>
            <p className="text-[16px] sm:text-[20px] font-light font-nunito text-g-1 text-center mt-3 cursor-pointer">
              Resend OTP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
