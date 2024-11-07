import { Popover } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";

const Header = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userDetails(null));
    localStorage.clear();
    navigate("/login");
  };

  const popoverContent = (
    <div className="flex flex-col items-center justify-start p-4 space-y-2 w-[20rem]">
      <div className="flex gap-[2rem] items-center">
      <div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-[#9C81CC] text-white font-medium rounded-full cursor-pointer">
            T
      </div>
      <div className="flex flex-col">
      <h2 className="text-[1.6rem] font-semibold text-black">Trainer</h2>
      <p className="text-[1.4rem] text-gray-500">trainer.sage@gmail.com</p>
      </div>
      </div>
      <hr className="w-full border-t border-gray-300 my-2" />
      <button className="text-red-500 text-[1.4rem] w-full flex justify-start items-center gap-3 pl-4"  onClick={handleLogout}>
        <LogoutOutlined className="mr-1" /> Logout
      </button>
    </div>
  );

  return (
    <div className="flex justify-between items-center h-[70px] bg-[#fff] px-[5rem] py-[2rem] border-b border-b-[#E3E3EC]">
      <h1 className="text-[2.4rem] font-semibold font-nunito">Careers in Psychology Workshop</h1>
      <div className="flex items-center space-x-2 mr-[0rem] sm:mr-[4rem]">
        <Popover content={popoverContent} trigger="click">
          <div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-[#9C81CC] text-white font-medium rounded-full cursor-pointer">
            T
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;