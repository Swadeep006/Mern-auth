import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import Homescreen from "./screens/Homescreen.jsx";
import LoginScreen from "./screens/Loginscreen.jsx";
import Registerscreen from "./screens/Registerscreen.jsx";
import Profilescreen from "./screens/Profilescreen.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<Registerscreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profilescreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
