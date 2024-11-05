import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector((state) => state.userDetails.currentUser);

  return (
    <div className="flex justify-between items-center h-[70px] bg-[#fff] px-[5rem] py-[2rem] border-b border-b-[#E3E3EC]">
      <h1 className="text-[2.4rem] font-semibold font-nunito">Careers in Psychology Workshop</h1>
      <div className="flex items-center space-x-2 mr-[0rem] sm:mr-[4rem]">
        <div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-purple-400 text-white font-medium rounded-full capitalize">
          {currentUser ? currentUser.name[0] : "X"}
        </div>

      </div>
    </div>
  );
};

export default Header;