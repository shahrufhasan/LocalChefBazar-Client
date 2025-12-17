import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Meals from "../components/Meals/Meals";
import MealDetails from "../components/Meals/MealDetails";
import OrderPage from "../components/Orders/OrderPage"; // import OrderPage

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/meal-details/:id",
        element: <MealDetails />,
      },
      {
        path: "/order/:id",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
