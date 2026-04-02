import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import History from "./pages/History";
import Buycredits from "./pages/Buycredits";
import Payment_success from "./pages/Payment_success";
import Payment_failed from "./pages/Payment_failed";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:noteId" element={<History />} />
        <Route path="/buy-credits" element={<Buycredits />} />
        <Route path="/payment-success" element={<Payment_success />} />
        <Route path="/payment-failed" element={<Payment_failed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App;