import { css } from "@emotion/react";
import { useTheme } from "@geist-ui/core";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AuthLayout = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - var(--page-nav-height));
      `}
    >
      <div
        css={css`
          flex: 1;
        `}
      ></div>
      <div
        css={css`
          max-width: 300px;

          width: 100%;
          display: flex;
          flex-direction: column;
          gap: ${theme.layout.gap};
          text-align: center;
        `}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
