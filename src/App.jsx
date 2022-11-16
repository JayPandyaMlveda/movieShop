import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Topbar from "./componentes/Topbar";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import { UserContext } from "./contexts/user.context";
import { Suspense, useState } from "react";
import HomePage from "./pages/home";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, storeJwt } from "./apiCalls";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data } = useQuery(
    ["currentUser"],
    () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return null;
      }
      storeJwt(token);
      return getCurrentUser().then((user) => {
        if (!user) {
          navigate("/login");
          return null;
        }
        setUser({ token, user });
        return { token, user };
      });
    },
    {
      suspense: true,
      useErrorBoundary: true,
      staleTime: Infinity,
    }
  );
  if (data && !user) {
    setUser(data);
    return null;
  }
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <Topbar />
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
            <Route
              index
              element={user ? <HomePage /> : <Navigate to={"/login"} />}
            ></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
          </Routes>
        </Suspense>
      </div>
    </UserContext.Provider>
  );
}

export default App;
