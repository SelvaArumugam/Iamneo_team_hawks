import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Start from "./pages/Start";
const Router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/", element: <Start /> },
  { path: "/register", element: <Register /> },
]);
export default Router;
