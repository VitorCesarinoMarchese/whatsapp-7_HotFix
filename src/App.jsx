import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ChatScreen from "./pages/ChatScreen/ChatScreen";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Navbar from "./components/Navbar/Navbar";

import { useEffect, useState } from "react";

import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./contexts/useAuth";

const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/chat/:uid?"
              element={user ? <ChatScreen /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
