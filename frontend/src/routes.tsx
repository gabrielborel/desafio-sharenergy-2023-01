import { createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Protected } from "./pages/ProtectedRoutes";
import { RandomUsers } from "./pages/RandomUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },

      {
        path: "/",
        element: <RandomUsers />,
      },
    ],
  },
]);
