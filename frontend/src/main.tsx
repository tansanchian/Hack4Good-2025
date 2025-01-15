import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import Dashboard from "./Dashboard";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomeAdmin from "./components/pages/homeAdmin";
import Transactions from "./components/pages/transactions";
import Vouchers from "./components/pages/vouchers";
import Users from "./components/pages/users";

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
          <Route path="products" element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="users" element={<Users />} />
          <Route path="manage-users" element={
            <AdminRoute
              adminRoute={<HomeAdmin />}
              nonAdminRoute={<Navigate to="/" />}
            />
          } />
          <Route path="manage-requests" element={
            <AdminRoute
              adminRoute={<HomeAdmin />}
              nonAdminRoute={<Navigate to="/" />}
            />
          } />
          <Route path="inventory" element={
            <AdminRoute
              adminRoute={<HomeAdmin />}
              nonAdminRoute={<Navigate to="/" />}
            />
          } />
          <Route path="tasks" element={
            <AdminRoute
              adminRoute={<HomeAdmin />}
              nonAdminRoute={<Navigate to="/" />}
            />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
