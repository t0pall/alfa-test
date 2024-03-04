import { createBrowserRouter } from "react-router-dom"
import { MainPage } from "../pages/main-page/main-page"
import PostDetailsPage from "../pages/post-details-page/post-details-page"
import ErrorPage from "../pages/error-page/error-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <PostDetailsPage />,
    errorElement: <ErrorPage />,
  },
], {basename: "/alfa-test"})
