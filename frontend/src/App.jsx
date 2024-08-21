import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/nav"
import UserStats from "./pages/Stats"
import StoryTypeTest from "./pages/Story"
import CustomTypeTest from "./pages/Custom"


//returns a user to the login page when they sign out of the application
function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

//clears all access tokens before a new user is registered
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar/>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/story"
          element={
            <ProtectedRoute>
              <Navbar/>
              <StoryTypeTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/custom"
          element={
            <ProtectedRoute>
              <Navbar/>
              <CustomTypeTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Navbar/>
              <UserStats />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App