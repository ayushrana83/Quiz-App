import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { HomePage } from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import QuizPage from "./Components/QuizPage";
import Leaderboard from "./Components/Leaderboard";
import CheckAuth from "./Components/CheckAuth";
import {Bounce, ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <CheckAuth>
              <HomePage />
            </CheckAuth>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <CheckAuth>
              <QuizPage />
            </CheckAuth>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
