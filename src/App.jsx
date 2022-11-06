import { Navigate, Route, Routes } from "react-router-dom";
import Topbar from "./componentes/Topbar";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import {UserContext} from "./contexts/user.context"
import { Suspense, useState } from "react";
import HomePage from "./pages/home";


function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user,setUser]}>
    <div>
      <Topbar/>
      <Suspense
          fallback={
            <div
              style={{ width: "100vw", height: "100vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="spinner-border" role="status" />
            </div>
          }
        >
      <Routes>
        <Route index element={user?<HomePage/>:<Navigate to={"/login"}/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
      </Suspense>
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
