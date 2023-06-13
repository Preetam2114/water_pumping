import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { DataContextProvider } from "./context/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/app",
    element: <Dashboard />
  }
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DataContextProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </DataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
