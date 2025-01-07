import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, LabelList } from "recharts";
import axios from "axios";
import { API_URL } from "../constant/APIConstant";
import { useQuestionContext } from "../context/QuestionContext";
import LeftArrow from "../assets/leftArrow.svg";
import RightArrow from "../assets/rightArrow.svg";
import Clipboard from "../assets/Clipboard.svg";
import Scholar from "../assets/Scholar.svg";

const colorPalette = {
  A: "#FED0EEB2",
  B: "#D0E8FFB2",
  C: "#DBAEFFB2",
  D: "#FBE38EB2",
  E: "#FEAEAEB2",
  F: "#A9F4D0B2",
  G: "#AEC9FEB2",
  H: "#9A89FFB2",
  I: "#FDD09FB2",
  J: "#FFF3D6",
  K: "#E5E4FF",
  L: "#D9F7E8",
  M: "#FF906666",
  N: "#FBE38E80",
  O: "#FF000026",
};

const TrainerDashboard = () => {
  const { questionIndex, setQuestionIndex } = useQuestionContext();
  const [questionData, setQuestionData] = useState(null);
  const [statisticData, setStatisticData] = useState(null);

  const fetchQuestionData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/question/getSurveyResultsByQuestionId/${questionIndex + 1}`
      );
      const optionsWithLabels = res.data.options.map((option, index) => ({
        ...option,
        label: String.fromCharCode(65 + index), // 'A', 'B', 'C', etc.
      }));

      setQuestionData({ ...res.data, options: optionsWithLabels });
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const stasticData = async () => {
    try {
      const res = await axios.get(`${API_URL}/question/getSurveyStatistics`);
      setStatisticData(res.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  useEffect(() => {
    fetchQuestionData();
    stasticData();
  }, [questionIndex]);

  const nextQuestion = () =>
    setQuestionIndex((prev) => (prev < 12 ? prev + 1 : prev));
  const prevQuestion = () => setQuestionIndex((prev) => Math.max(0, prev - 1));

  return (
    <>
      <h2 className="text-[2.4rem] font-semibold font-nunito ml-[5rem] mt-[2rem] mb-[1.5rem]">
        Overview
      </h2>
      <div className="flex gap-[5rem] mb-8 w-full px-[7rem]">
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img
            src={Clipboard}
            alt="icon"
            className="w-[2.5rem] h-[2.5rem] mb-2"
          />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">
              Todays Response
            </h3>
            <p className="text-[2.4rem] font-nunito font-bold">
              {statisticData?.todaysResponses}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img
            src={Scholar}
            alt="icon"
            className="w-[2.5rem] h-[2.5rem] mb-2"
          />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">
              Undergraduates
            </h3>
            <p className="text-[2.4rem] font-nunito font-bold">
              {statisticData?.undergraduate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[2rem] px-[2rem] py-[1rem] bg-[#fffff] rounded-[1rem] w-[20%] shadow-md border-l-[6px] border-[#9C81CC]">
          <img
            src={Scholar}
            alt="icon"
            className="w-[2.5rem] h-[2.5rem] mb-2"
          />
          <div className="w-[1px] bg-[#E3E3EC] h-[80%]" />
          <div className="flex flex-col">
            <h3 className="text-[1.4rem] font-nunito font-semibold">
              Postgraduates
            </h3>
            <p className="text-[2.4rem] font-nunito font-bold">
              {statisticData?.postgraduate}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-[7rem] py-[5rem] h-[100%] w-[90%] bg-[#FFF] mx-[7rem] rounded-[2rem] shadow-lg">
        <div className="w-full">
          <h2 className="text-[1.8rem] font-bold mb-2 font-nunito">
            <div className="flex gap-4">
              <h2>Q{questionIndex + 1}.</h2>
              <h2>{questionData?.questionText}</h2>
            </div>
          </h2>
          <div className="flex justify-center gap-2 mt-2 items-center">
            <button
              onClick={prevQuestion}
              disabled={questionIndex === 0}
              className="cursor-pointer"
            >
              <img src={LeftArrow} alt="" className="w-[40px]" />
            </button>
            <div className="w-full flex flex-wrap h-[20vh] mx-[2rem]">
              {questionData?.options?.map((option, index) => (
                <span
                  className={`w-[28%] flex gap-2 text-[1.5rem] font-nunito items-center text-[#393939]`}
                  key={index}
                >
                  <h2>{String.fromCharCode(65 + index)}.</h2>
                  <h2>{option?.optionText}</h2>
                </span>
              ))}
            </div>
            <button
              onClick={nextQuestion}
              disabled={questionIndex === 14}
              className="cursor-pointer"
            >
              <img src={RightArrow} alt="" className="w-[40px]" />
            </button>
          </div>
        </div>
        <div className="mt-[4rem]">
          {questionData && (
            <BarChart
              width={900}
              height={350}
              data={questionData.options}
              className="mx-auto"
            >
              <XAxis dataKey="label" tick={{ fill: "#666", fontSize: 14 }} />
              <YAxis tick={{ fill: "#666", fontSize: 14 }} />
              <Tooltip cursor={{ fill: "transparent" }}/>
              <Bar dataKey="percentage" barSize={100}>
              <LabelList dataKey="percentage" position="top" fill="#000" fontSize={14} /> {/* Show percentage on top */}
                {questionData.options.map((option, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorPalette[option.label] || "#ccc"}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainerDashboard;
