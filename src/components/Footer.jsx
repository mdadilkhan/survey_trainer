import logo from "../assets/Logo.svg";
import React,{useState} from "react";
import location from "../assets/Location.png";
import calling from "../assets/Calling.png";
import message from "../assets/Message.png";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Web from '../assets/Web.svg'
import { API_URL } from "../constant/APIConstant";

const Footer = () => {
  const [email, setEmail] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
          await axios.post(`${API_URL}/auth/insertEmail`,{
            email:email
          }).then((res)=>{
            if(res.status==200){
              toast.success('we will update you ', {
                position: 'top-center', // Set the position to top-center
                duration: 3000, // Display for 3 seconds
                style: {
                  fontWeight: 'bold',
                  fontSize: '14px', // Smaller text
                },
              });
              setEmail('')
            }
          }).catch((err)=>{
            toast.error('Something went wrong', {
              position: 'top-center', // Set the position to top-center
              duration: 3000, // Display for 3 seconds
              style: {
                fontWeight: 'bold',
                fontSize: '14px', // Smaller text
              },
            });
            console.log(err);
          })
  };
  return (
    <div className="h-full sm:h-[300px] w-full bg-[#F4EDFF] sm:py-0 py-5 px-4 flex sm:flex-row flex-col justify-between items-center">
      <div>
        <img src={logo} alt="" className="w-[80%] sm:w-full"/>
      </div>

      <div className="flex flex-col gap-4 sm:w-[15%] w-[88%] mt-4">
        {/* <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <img src={location} alt="" />
            <p>Address:</p>
          </div>

          <p>C-47, Shivalik, Malviya Nagar,New Delhi, Delhi -110017</p>
        </div> */}

        <div className="flex gap-4">
          <img src={calling} alt="" />
          <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">+9129341037</p>
        </div>
        <div className="flex gap-4">
          <img src={Web} alt="" />
          <a href="https://daffodilstherapystudio.com" target="_blank" className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">https://daffodilstherapystudio.com</a>
        </div>
        <div className="flex gap-4">
          <img src={message} alt="" />
          <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">info@daffodilstherapystudio.com</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:w-[15%] w-[88%] mt-4 sm:ml-10">
          <div className="flex gap-4">
            <img src={location} alt="" />
            <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">Centres:</p>
          </div>
          <div className="flex flex-col gap-4 ml-[8px] sm:ml-0">
              <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">1. Rohini, Sector -13</p>
              <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">2. GTB Nagar</p>
              <p className="text-primary font-nunito text-[1.2rem] sm:text-[1.8rem]">3. Shivalik, Malviya Nagar</p>
          </div>
      </div>
      <div className="flex flex-col items-left relative mt-4">
        <h6 className="text-[#000000]font-nunito text-[1.2rem] sm:text-[1.8rem] ml-4 leading-normal tracking-[0.12px]s">
          Stay up to date with the latest courses
        </h6>
        <input
          name="year"
          type="email"
          className="w-[300px]  h-[60px]  text-[1.2rem] sm:text-[1.8rem] p-4 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-2xl outline-none sm:mt-0 mt-4"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <div className="absolute top-[38px] sm:top-[37px] left-[190px]">
           <button  onClick={handleSubmit} className="bg-[#614298] text-white  rounded-3xl w-[100px] h-[40px]">Send</button>
        </div>
       
      </div>
    </div>
  );
};

export default Footer;