import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  json,
  LoaderFunctionArgs,
  redirect,
  RouterProvider,
} from "react-router-dom";


import './index.css'
import App, { homeLoader } from './App.tsx'
import Login, { loginAction } from './Login.tsx';
import PostDetail, { postDetailLoader } from './PostDetail.tsx';
import HomeProtected from './HomeProtected.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      loader: homeLoader,
      action: async () => {
        localStorage.removeItem('token');
        return redirect("/login");
      },
    },
    {
      path: '/post/:id',
      element: <PostDetail />,
      loader: postDetailLoader,
    },
    {
      path: '/login',
      element: <Login />,
      action: loginAction
    },
    {
      path: '/app',
      id: 'app',
      loader: async () => {
        console.log("app loader");
        if (!localStorage.getItem('token')) {
          return redirect("/login");
        }

        return json({
          message: "You are logged in",
          token: localStorage.getItem('token')
        });
      },
      // nested routes only accessible if parent route is loaded so I can
      // use parent loader data in child, and also to protect nested routes
      children: [
        {
          path: '/app/home-protected',
          element: <HomeProtected />,
          loader: async () => {
            console.log("home-protected loader");
            return json({ });
          }
        }
      ]
    }
  ],
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
