import { Route, Routes } from "react-router-dom";
import Topbar from "./componentes/Topbar";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";

function App() {
  return (
    <div>
      <Topbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
