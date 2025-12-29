// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/lading";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthCotext";
import Home from "./pages/home";
import VideoMeetComponent from "./pages/VideoMaating";
import History from "./pages/history";

function App() {
  return (
    <>

      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/:url" element={<VideoMeetComponent/>} />
          <Route path="/history" element={<History/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter >
    </>
  );
}

export default App;
