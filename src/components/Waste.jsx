import { Menu } from 'antd';
import { useQuestionContext } from '../context/QuestionContext';
import Logo from "../assets/Logo.png"

const Sidebar = () => {
  const questions = Array.from({ length: 13 }, (_, i) => `Question ${i + 1}`);
  const { questionIndex, setQuestionIndex } = useQuestionContext();

  return (
    <Menu mode="inline" className="h-[100vh] w-[30rem]" selectedKeys={[String(questionIndex)]}>
      <img src={Logo} alt="" className='w-[70%] mx-auto my-6'/>
      <Menu.Item key="overview" className="font-bold font-nunito">
        Overall Dashboard
      </Menu.Item>
      {questions.map((question, index) => (
        <Menu.Item
          key={index}
          className={`text-purple-700 font-nunito ${index === questionIndex ? 'ant-menu-item-selected' : ''}`}
          onClick={() => setQuestionIndex(index)}
        >
          {question}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;