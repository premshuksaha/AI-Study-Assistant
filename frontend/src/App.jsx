import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import History from "./pages/History";
import Buycredits from "./pages/Buycredits";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:noteId" element={<History />} />
        <Route path="/buy-credits" element={<Buycredits />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App;