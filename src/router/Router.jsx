// src/router/Router.jsx
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRouters from "./PrivateRouters";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Meals Pages
import Meals from "../components/Meals/Meals";
import MealDetails from "../components/Meals/MealDetails";
import OrderPage from "../components/Orders/OrderPage";

// Dashboard - User
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyReview from "../pages/Dashboard/User/MyReviews";
import FavoriteMeal from "../pages/Dashboard/User/FavoriteMeal";

// Dashboard - Chef
import MyProfileChef from "../pages/Dashboard/Chef/MyProfile";
import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";

// Dashboard - Admin
import MyProfileAdmin from "../pages/Dashboard/Admin/MyProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import PlatformStats from "../pages/Dashboard/Admin/PlatformStatistic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/meals", element: <Meals></Meals> },
      {
        path: "/meal-details/:id",
        element: (
          <PrivateRouters>
            <MealDetails></MealDetails>
          </PrivateRouters>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRouters>
            <OrderPage></OrderPage>
          </PrivateRouters>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouters>
        <DashboardLayout></DashboardLayout>
      </PrivateRouters>
    ),
    children: [
      // User Dashboard
      { path: "user/my-profile", element: <MyProfile></MyProfile> },
      { path: "user/my-orders", element: <MyOrders></MyOrders> },
      { path: "user/my-reviews", element: <MyReview></MyReview> },
      { path: "user/favorite-meal", element: <FavoriteMeal></FavoriteMeal> },

      // Chef Dashboard
      { path: "chef/my-profile", element: <MyProfileChef></MyProfileChef> },
      { path: "chef/create-meal", element: <CreateMeal></CreateMeal> },
      { path: "chef/my-meals", element: <MyMeals></MyMeals> },
      {
        path: "chef/order-requests",
        element: <OrderRequests></OrderRequests>,
      },

      // Admin Dashboard
      {
        path: "admin/my-profile",
        element: <MyProfileAdmin></MyProfileAdmin>,
      },
      { path: "admin/manage-users", element: <ManageUsers></ManageUsers> },
      {
        path: "admin/manage-requests",
        element: <ManageRequests></ManageRequests>,
      },
      {
        path: "admin/platform-stats",
        element: <PlatformStats></PlatformStats>,
      },
    ],
  },
]);
