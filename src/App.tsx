import { css } from "@emotion/react";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { Route, Routes } from "react-router-dom";
import Header from "./common/components/header/Header";
import AuthPage from "./pages/index/AuthPage";
import IndexLayout from "./pages/index/IndexLayout";
import LoginPage from "./pages/index/LoginPage";
import SignUpPage from "./pages/index/SignUpPage";
import { useAppSelector } from "./store";

const rootLayoutCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: calc(var(--page-nav-height) * -1);
  min-height: calc(100vh - var(--page-nav-height));
`;

const App = () => {
  const color = useAppSelector((x) => x.theme.color);

  return (
    <GeistProvider themeType={color}>
      <CssBaseline />
      <Header />
      <div css={rootLayoutCss}>
        <Routes>
          <Route element={<IndexLayout />}>
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </div>
    </GeistProvider>
  );
};

export default App;
