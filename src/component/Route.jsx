import { CreatePostPage } from "../pages/CreatePostPage";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { HomePage } from "../pages/HomePage";
import RootLayout from "../pages/Rootlayout";
import Postdetail from "./Postdetailpage";
import AuthGuard from "../guard/AuthGuard";
import NotFound from "./NotFound";
import { ExplorePage } from "../pages/ExplorePage";
import { Pagination } from "./Pagination";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <AuthGuard /> /* for navbar comman view in pages */,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/new-post",
        element: <CreatePostPage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/posts/:postId", //diynamic id
        element: <Postdetail />,
      },
    ],
  },
  {
    path: "*", //diynamic id
    element: <NotFound />,
  },
]);
