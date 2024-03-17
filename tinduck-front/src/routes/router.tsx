import {createBrowserRouter, RouteObject} from "react-router-dom"
import {Home} from "../pages/Home.tsx"
import {Profile} from "../pages/profile/Profile.tsx"
import {Layout} from "../components/layout/Layout.tsx"
import {ChatList} from "../pages/messages/ChatList.tsx"
import {Like} from "../pages/Like.tsx"
import {DuckDetail} from "../pages/DuckDetail.tsx"
import {ErrorPage} from "../pages/ErrorPage.tsx"
import {AuthLayout} from "../components/layout/AuthLayout.tsx"
import {Login} from "../pages/auth/Login.tsx"
import {Register} from "../pages/auth/Register.tsx"
import {Chat} from "../pages/messages/chat/Chat.tsx"

const routes: RouteObject[] = [
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/messages",
            element: <ChatList />,
          },
          {
            path: "/like",
            element: <Like />,
          },
          {
            path: "/duck/:id",
            element: <DuckDetail />,
          },
          {
            path: "/messages/:id",
            element: <Chat />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
