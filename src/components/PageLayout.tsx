import { css } from "@emotion/react";
import { useTheme } from "@geist-ui/core";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        background-color: ${theme.palette.accents_1};
        min-height: calc(100vh - var(--page-nav-height) - ${theme.layout.gap});
        padding: 0 ${theme.layout.gap};
        padding-top: ${theme.layout.gap};
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 1200px;
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
