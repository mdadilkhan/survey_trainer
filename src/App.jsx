import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from './components/Login';
import TrainerDashboard from "./pages/TrainerDashboard";
import { QuestionProvider } from "./context/QuestionContext";

function App() {
  return (
    <QuestionProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex">
          {/* <Sidebar /> */}
          <div className="flex flex-col w-[100%]">
            {/* <Header /> */}
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QuestionProvider>
  );
}

export default App;
