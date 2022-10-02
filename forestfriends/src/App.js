import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";

import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Hikes from "./components/Hikes";
import Hikers from "./components/Hikers";
import DetailedProfile from "./components/DetailedProfile";
import Profile from "./components/Profile"
import LoginPage from "./components/LoginPage";
import Edit from "./components/Edit";
import SignUp from "./components/SignUp";
import Registration from "./components/Registration";
import HikeInfo from "./components/HikeInfo";
import CreateHike from "./components/CreateHike";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";

import { calcLength } from "framer-motion";
import Admin from "./components/Admin";
function App() {
  const [loggedIn, setLoggedIn] = useState(true); //checks if logged in
  const { currentUser } = useAuth();

  function checkIfLoggedIn(user) {
    if (user === null) {
      //not logged in
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkIfLoggedIn(currentUser);
  });

  if (!loggedIn) {
    //if not logged in we send them to registration
    return <Registration setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="App">
      <Box position="absolute" left="0" top="0" right="0">

        <Navbar setLoggedIn={setLoggedIn}/>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/hikes" element={<Hikes />} />
            <Route path="/hikers" element={<Hikers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:hikeId" element={<Edit />} />
            <Route path="/hikeinfo/:hikeId" element={<HikeInfo />} />
            <Route path="/createHike" element={<CreateHike />}></Route>
            <Route path="/detailedProfile/:userId" element={<DetailedProfile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        <Footer/>
      </Box>
    </div>
  );
}

export default App;
