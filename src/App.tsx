import NiceModal from "@ebay/nice-modal-react";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { Route, Routes } from "react-router-dom";
import Header from "./common/components/header/Header";
import PageLayout from "./common/components/PageLayout";
import AuthPage from "./pages/auth/AuthPage";
import { selectAuth } from "./pages/auth/authSlice";
import AuthLayout from "./pages/auth/components/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import Page404 from "./pages/index/error/Page404";
import IndexPage from "./pages/index/IndexPage";
import Invites from "./pages/invites/Invites";
import { selectTheme } from "./slices/themeSlice";
import { useAppSelector } from "./store";

const App = () => {
  const color = useAppSelector(selectTheme).color;
  const auth = useAppSelector(selectAuth);

  return (
    <GeistProvider themeType={color}>
      <NiceModal.Provider>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="*" element={<Page404 />} />
          {auth.token ? (
            <Route element={<PageLayout />}>
              <Route path="/" element={<IndexPage />} />
              <Route path="/invites/:id" element={<Invites />} />
            </Route>
          ) : (
            <Route element={<AuthLayout />}>
              <Route path="/" element={<AuthPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
          )}
        </Routes>
      </NiceModal.Provider>
    </GeistProvider>
  );
};

export default App;
