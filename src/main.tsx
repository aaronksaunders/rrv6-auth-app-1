import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  json,
  Outlet,
  Params,
  redirect,
  RouterProvider,
  LoaderFunctionArgs,
  LoaderFunction,
} from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Login from "./Login.tsx";
import PostDetail from "./PostDetail.tsx";
import HomeProtected from "./HomeProtected.tsx";
import { homeLoader, postDetailLoader } from "./loaders.ts";
import { loginAction } from "./actions.ts";

/**
 * A higher-order function that wraps a loader function with a
 * check for a valid authentication token.
 *
 * If a valid token is found in localStorage, the wrapped loader
 * function is executed. If no token is found, the function redirects
 * the user to the login page with a 401 Unauthorized status.
 *
 * @param loaderFn - The loader function to be wrapped.
 * @returns A new loader function that checks for a valid token before
 *  executing the original loader.
 */
const protectRoute = (loaderFn: LoaderFunction) => {
  return async (args: LoaderFunctionArgs) => {
    console.log("protectRoute", args);
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return redirect("/login");
    }

    console.log("token", token);
    return loaderFn(args);
  };
};
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    id: "app",
    element: (
      <div>
        <h1>App Welcome</h1>
        <Outlet />
      </div>
    ),
    loader: protectRoute(async ({ params }: { params: Params }) => {
      console.log("app loader", params);
      return json({
        message: "You are logged in",
        token: localStorage.getItem("token"),
      });
    }),
    children: [
      {
        path: "/",
        element: <App />,
        loader: protectRoute(homeLoader),
        action: async () => {
          localStorage.removeItem("token");
          return redirect("/login");
        },
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
        loader: protectRoute(postDetailLoader),
      },
      {
        path: "/home-protected",
        element: <HomeProtected />,
        loader: async () => {
          console.log("home-protected loader");
          return json({});
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
