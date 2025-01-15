import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import Dashboard from "./Dashboard";
import Home from "./components/pages/home";
import Home1 from "./components/pages/home1";
import Home2 from "./components/pages/home2";
import Home3 from "./components/pages/home3";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const root = document.getElementById("root");

/**
 * A wrapper around routes that should only be accessed by logged-in users.
 * If a user is not logged in, automatically navigates to `/login`.
 * 
 * Usage:
 * ```
 * <PrivateRoute>
 *   <QuestionList />
 * </PrivateRoute>
 * ```
 */
function PrivateRoute({ children } : { children : React.ReactNode }) {
  const { auth } = useAuth();
  
  return ( auth.isLoggedIn ) ? (
    <>
      { children }
    </>
  ) : (
    <Navigate to="/login" />
  )
}


/**
 * A wrapper around routes that should only be accessed by not logged-in users.
 * If a user is logged in, automatically navigates to `/`.
 * 
 * Usage:
 * ```
 * <PublicRoute>
 *   <SignupPage />
 * </PublicRoute>
 * ```
 */
function PublicRoute({ children } : { children : React.ReactNode }) {
  const { auth } = useAuth();
  
  return ( !auth.isLoggedIn ) ? (
    <>
      { children }
    </>
  ) : (
    <Navigate to="/" />
  )
}

/**
 * A wrapper around routes that should only be accessed by admins. Admin routes
 * implicitly contain the `PrivateRoute` component, so you do not have to further
 * wrap the route around the `PrivateRoute` component.
 * 
 * If a user is an admin, navigates to the component represented by prop `adminRoute`.
 * 
 * If a user is not an admin, navigates to the component represented by prop `nonAdminRoute`.
 * 
 * Usage:
 * ```
 * <AdminRoute 
 *   adminRoute={ <EditQuestionPage /> }
 *   nonAdminRoute={ <ViewQuestionPage /> } 
 * />
 * ```
 */
function AdminRoute({ adminRoute, nonAdminRoute } : { adminRoute : React.ReactNode, nonAdminRoute : React.ReactNode }) {
  const { auth } = useAuth();
  
  return ( auth.isAdmin ) ? (
    <PrivateRoute>
      { adminRoute }
    </PrivateRoute>
  ) : (
    <PrivateRoute>
      { nonAdminRoute }
    </PrivateRoute>
  )
}

ReactDOM.createRoot(root!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path="home1" element={<Home1 />} />
          <Route path="home2" element={<Home2 />} />
          <Route path="home3" element={<Home3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
