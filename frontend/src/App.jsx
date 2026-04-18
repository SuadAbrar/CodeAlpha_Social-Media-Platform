import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { ToastProvider } from "./context/ToastContext";
import { PageTransition } from "./components/UI";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <PageTransition>
                  <Home />
                </PageTransition>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Layout>
                <PageTransition>
                  <Search />
                </PageTransition>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
