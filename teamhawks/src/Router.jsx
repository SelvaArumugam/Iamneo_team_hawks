import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Start from "./pages/Start";
import Vendor from "./pages/Vendor";
const Router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/home", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/vendor", element: <Vendor /> },
]);
export default Router;
