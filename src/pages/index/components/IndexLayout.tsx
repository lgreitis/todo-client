import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const IndexLayout = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          max-width: 1000px;
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default IndexLayout;
