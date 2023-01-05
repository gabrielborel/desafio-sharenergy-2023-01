import { createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { HttpCats } from "./pages/HttpCats";
import { Protected } from "./pages/ProtectedRoutes";
import { RandomDogs } from "./pages/RandomDog";
import { RandomUsers } from "./pages/RandomUsers";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/",
        element: <RandomUsers />,
      },
      {
        path: "/cats",
        element: <HttpCats />,
      },
      {
        path: "/dogs",
        element: <RandomDogs />,
      },
    ],
  },
]);
