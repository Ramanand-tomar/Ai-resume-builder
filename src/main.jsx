import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Sign_in from "./pages/Sign-in";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import ResumeEditorPage from "./pages/ResumeEditorPage";
import ResumeViewPage from "./pages/ResumeViewPage";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeID/edit",
        element: <ResumeEditorPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <Sign_in />,
  },
  {
    path: "/my-resume/:resumeID/view",
    element: <ResumeViewPage />,
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
