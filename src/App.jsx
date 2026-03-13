import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import Result from "./pages/Results";
import ProtectedRoutes from "./components/ProtectedRoutes";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/list"
        element={
          <ProtectedRoutes>
            <List />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/details/:id"
        element={
          <ProtectedRoutes>
            <Details />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoutes>
            <Result />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default App;
