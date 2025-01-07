import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../constant/APIConstant";
import { useQuestionContext } from "../context/QuestionContext";
import QuestionChart from "../components/QuestionChart";
import Clipboard from "../assets/Clipboard.svg";
import Scholar from "../assets/Scholar.svg";

const Session = () => {
  const location = useLocation();
  const { questionIndex, setQuestionIndex } = useQuestionContext();
  const [questionDataList, setQuestionDataList] = useState([]);
  const [statisticData, setStatisticData] = useState(null);

  const questionSets = {
    "/session3": [1, 2, 3],
    "/session4": [5, 9, 10],
  };

  const fetchQuestionData = async (questionId, index) => {
    try {
      const res = await axios.get(
        `${API_URL}/question/getSurveyResultsByQuestionId/${questionId}`
      );
      const optionsWithLabels = res.data.options.map((option, idx) => ({
        ...option,
        label: String.fromCharCode(65 + idx),
      }));
      setQuestionDataList((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = { ...res.data, questionId, options: optionsWithLabels };
        return updatedData;
      });
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const fetchStatisticData = async () => {
    try {
      const res = await axios.get(`${API_URL}/question/getSurveyStatistics`);
      setStatisticData(res.data);
    } catch (error) {
      console.error("Error fetching statistic data:", error);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const questionsToFetch = questionSets[currentPath] || [];

    // Reset questionDataList based on the number of questions to fetch
    setQuestionDataList(Array(questionsToFetch.length).fill(null));

    // Fetch data for each question based on URL path
    questionsToFetch.forEach((questionId, index) => {
      fetchQuestionData(questionId, index);
    });

    fetchStatisticData();
  }, [location.pathname, questionIndex]);

  return (
    <>
      <h2 className="text-[2.4rem] font-semibold font-nunito ml-[5rem] mt-[2rem] mb-[1.5rem]">
        Overview
      </h2>
      <div className="flex gap-[5rem] mb-8 w-full px-[7rem]">
        {/* Total Response Card */}
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img src={Clipboard} alt="icon" className="w-[2.5rem] h-[2.5rem] mb-2" />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">Todays Response</h3>
            <p className="text-[2.4rem] font-nunito font-bold">{statisticData?.todaysResponses}</p>
          </div>
        </div>
        {/* Undergraduate Card */}
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img src={Scholar} alt="icon" className="w-[2.5rem] h-[2.5rem] mb-2" />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">Undergraduates</h3>
            <p className="text-[2.4rem] font-nunito font-bold">{statisticData?.undergraduate}</p>
          </div>
        </div>
        {/* Postgraduate Card */}
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img src={Scholar} alt="icon" className="w-[2.5rem] h-[2.5rem] mb-2" />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">Postgraduates</h3>
            <p className="text-[2.4rem] font-nunito font-bold">{statisticData?.postgraduate}</p>
          </div>
        </div>
      </div>

      {/* Render Question Charts with questionId as the label */}
      {questionDataList.map((data, idx) => (
        data ? (
          <QuestionChart 
            key={data.questionId} 
            questionData={data} 
            questionIndex={data.questionId}  // Use questionId here as the index/label
          />
        ) : null
      ))}
    </>
  );
};

export default Session;
