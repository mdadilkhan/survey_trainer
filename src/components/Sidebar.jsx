import { useState } from "react";
import { Menu } from "antd";
import { useQuestionContext } from "../context/QuestionContext";
import Logo from "../assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = Array.from({ length: 13 }, (_, i) => `Question ${i + 1}`);
  const { questionIndex, setQuestionIndex } = useQuestionContext();

  const [openKeys, setOpenKeys] = useState([]);

  const onToggleSubMenu = (key) => {
    setOpenKeys(openKeys.includes(key) ? [] : [key]);
  };

  const handleOverallDashboardClick = () => {
    // Navigate to the trainer-dashboard URL
    navigate("/trainer-dashboard");
  };

  return (
    <Menu
      mode="inline"
      className="h-[100vh] w-[30rem] bg-white gap-6 mt-[2rem]"
      selectedKeys={[String(questionIndex)]}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
    >
      <img src={Logo} alt="Logo" className="w-[70%] mx-auto my-6" />

      <SubMenu
        key="overview"
        title={
          <span className="font-bold font-nunito">Overall Dashboard</span>
        }
        className={`font-bold font-nunito text-p-1 ${
          location.pathname === "/trainer-dashboard"
            ? "overview-dashboard-active"
            : "overview-dashboard-inactive"
        }`}      
        onTitleClick={handleOverallDashboardClick} 
      >
        <div className="bg-white">
        {questions.map((question, index) => (
          <Menu.Item
            key={index}
            className={`px-6 py-2 transition-colors duration-200 my-1 rounded ${
              index === questionIndex
                ? "bg-purple-100 text-white"
                : "bg-white"
            }`}
            onClick={() => setQuestionIndex(index)}
          >
            {question}
          </Menu.Item>
        ))}
        </div>
      </SubMenu>

      <Menu.Item
        className={`my-2 mx-2 px-6 py-2 rounded transition-colors font-semibold duration-200 no-hover ${
          location.pathname === "/session3"
            ? "bg-[#9C81CC] text-white"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => navigate("/session3")}
      >
        Session 3
      </Menu.Item>

      <Menu.Item
        className={`my-2 mx-2 px-6 py-2 rounded  text-white transition-colors font-semibold duration-200 no-hover ${
          location.pathname === "/session4"
            ? "bg-[#9C81CC] text-white"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => navigate("/session4")}
      >
        Session 4
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
