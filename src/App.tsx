import NiceModal from "@ebay/nice-modal-react";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware";
import Header from "./components/header/Header";
import PageLayout from "./components/PageLayout";
import OrganizationAdminPage from "./pages/admin/OrganizationAdminPage";
import UserAdminPage from "./pages/admin/UserAdminPage";
import AuthPage from "./pages/auth/AuthPage";
import AuthLayout from "./pages/auth/components/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import Page404 from "./pages/error/Page404";
import IndexPage from "./pages/index/IndexPage";
import Invites from "./pages/invites/Invites";
import { selectAuth } from "./slices/authSlice";
import { selectTheme } from "./slices/themeSlice";
import { useAppSelector } from "./store";

const App = () => {
  const color = useAppSelector(selectTheme).color;
  const auth = useAppSelector(selectAuth);

  return (
    <GeistProvider themeType={color}>
      <NiceModal.Provider>
        <CssBaseline />
        <AuthMiddleware>
          <>
            <Header />
            <Routes>
              <Route path="*" element={<Page404 />} />
              {auth.refreshToken ? (
                <Route element={<PageLayout />}>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/invites/:id" element={<Invites />} />
                  <Route
                    path="/admin/organization"
                    element={<OrganizationAdminPage />}
                  />
                  <Route path="/admin/user" element={<UserAdminPage />} />
                </Route>
              ) : (
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<AuthPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Route>
              )}
            </Routes>
          </>
        </AuthMiddleware>
      </NiceModal.Provider>
    </GeistProvider>
  );
};

export default App;
