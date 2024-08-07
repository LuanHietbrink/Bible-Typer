import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function LogOut() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

//first clear local storage before someone registers as to not have old access tokens that can cause an error
function RegisterAndLogOut() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<RegisterAndLogOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
