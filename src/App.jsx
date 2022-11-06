import { Navigate, Route, Routes } from "react-router-dom";
import Topbar from "./componentes/Topbar";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import {UserContext} from "./contexts/user.context"
import { useState } from "react";
import HomePage from "./pages/home";


function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user,setUser]}>
    <div>
      <Topbar/>
      <Routes>
        <Route index element={user?<HomePage/>:<Navigate to={"/login"}/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
