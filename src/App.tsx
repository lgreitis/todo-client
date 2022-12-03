import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { Route, Routes } from "react-router-dom";
import Header from "./common/components/header/Header";
import AuthPage from "./pages/auth/AuthPage";
import { selectAuth } from "./pages/auth/authSlice";
import AuthLayout from "./pages/auth/components/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import IndexLayout from "./pages/index/components/indexLayout";
import IndexPage from "./pages/index/IndexPage";
import { selectTheme } from "./slices/themeSlice";
import { useAppSelector } from "./store";

const App = () => {
  const color = useAppSelector(selectTheme).color;
  const auth = useAppSelector(selectAuth);

  return (
    <GeistProvider themeType={color}>
      <CssBaseline />
      <Header />
      <Routes>
        {auth.token ? (
          <Route element={<IndexLayout />}>
            <Route path="/" element={<IndexPage />}></Route>
          </Route>
        ) : (
          <Route element={<AuthLayout />}>
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        )}
      </Routes>
    </GeistProvider>
  );
};

export default App;
