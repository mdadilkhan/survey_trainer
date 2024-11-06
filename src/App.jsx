import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from './components/Login';
import TrainerDashboard from "./pages/TrainerDashboard";
import { QuestionProvider } from "./context/QuestionContext";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.userDetails.currentUser); // Get the current user from Redux

  return (
    <QuestionProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex">
          {/* Conditionally render Sidebar only on login page */}
          {currentUser && <Sidebar />}
          <div className="flex flex-col w-[100%]">
            {currentUser && <Header />} {/* Show Header only if logged in */}
            <Routes>
              <Route path="/login" element={<LoginRedirect />} />
              <Route path="/trainer-dashboard" element={<PrivateRoute><TrainerDashboard /></PrivateRoute>} />
              <Route path="*" element={<Navigate to={currentUser ? "/trainer-dashboard" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QuestionProvider>
  );
}

// Redirect logged-in user from login page to dashboard
function LoginRedirect() {
  const currentUser = useSelector((state) => state.userDetails.currentUser);
  return currentUser ? <Navigate to="/trainer-dashboard" /> : <Login />;
}

// PrivateRoute component for protecting routes
function PrivateRoute({ children }) {
  const currentUser = useSelector((state) => state.userDetails.currentUser);
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;