import { css } from "@emotion/react";
import { useTheme } from "@geist-ui/core";
import { Outlet } from "react-router-dom";

const IndexLayout = () => {
  const theme = useTheme();

  return (
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
  );
};

export default IndexLayout;
