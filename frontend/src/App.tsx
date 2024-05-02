import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { Fulldata, UserData, useStore } from "@/zustand";
import EditProfile from "./pages/EditProfile";
import SplashScreen from "./components/SplashScreen";
import Search from "./pages/Search";
import { ThemeProvider } from "./provider/ThemeProvider";
import SinglePost from "./pages/SinglePost";

function App() {
  const { user, loadCurrentUserData } = useStore() as Fulldata & UserData;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && window.location.pathname !== "/register") {
      navigate("/login");
    }
    loadCurrentUserData();
  }, [navigate, loadCurrentUserData]);

  return (
    <>
      <ThemeProvider defaultTheme="system">
        <Routes>
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/feed" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
