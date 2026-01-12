import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </UserProvider>
  );
}

export default App;
