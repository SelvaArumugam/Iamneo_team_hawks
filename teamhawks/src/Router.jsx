import { createBrowserRouter } from "react-router-dom";
import HelpPage from "./pages/HelpPage";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import Start from "./pages/Start";
import Vendor from "./pages/Vendor";
const Router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/home", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/vendor", element: <Vendor /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/help", element: <HelpPage /> },
]);
export default Router;
