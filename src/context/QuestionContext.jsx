import { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  return (
    <QuestionContext.Provider value={{ questionIndex, setQuestionIndex }}>
      {children}
    </QuestionContext.Provider>
  );
};
