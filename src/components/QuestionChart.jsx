// QuestionChart.js
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, LabelList } from "recharts";
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

const QuestionChart = ({ questionData, questionIndex }) => {
  return (
    <div className="flex flex-col items-center px-[7rem] mt-10  py-[5rem] h-[100%] w-[90%] bg-[#FFF] mx-[7rem] rounded-[2rem] shadow-lg">
      <div className="w-full">
        <h2 className="text-[1.8rem] font-bold mb-2 font-nunito">
          <div className="flex gap-4">
            <h2>Q{questionIndex}.</h2>
            <h2>{questionData?.questionText}</h2>
          </div>
        </h2>
        <div className="flex justify-center gap-4 mt-2 items-center">
          <div className="w-full flex flex-wrap h-[20vh] mx-[2rem]">
            {questionData?.options?.map((option, index) => (
              <span
                className="w-[50%] flex gap-8 text-[1.5rem] font-nunito items-center text-[#393939]"
                key={index}
              >
                <h2>{String.fromCharCode(65 + index)}.</h2>
                <h2>{option?.optionText}</h2>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[4rem]">
        {questionData && (
          <BarChart
            width={900}
            height={400}
            data={questionData.options}
            className="mx-auto"
          >
            <XAxis dataKey="label" tick={{ fill: "#666", fontSize: 14 }} />
            <YAxis
              tick={{ fill: "#666", fontSize: 14 }}
              domain={[0, 100]} // Set the Y-axis to a fixed range
              allowDataOverflow={false} // Prevent overflow beyond the defined domain
              type="number" // Ensure it's a numeric axis
              interval={0} // Show all ticks
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="percentage" barSize={100}>
            <LabelList dataKey="percentage" position="top" fill="#000" fontSize={14} allowOverflow/> 
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
  );
};

export default QuestionChart;
