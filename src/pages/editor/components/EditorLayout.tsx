import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const EditorLayout = () => {
  return (
    <div
      css={css`
        display: flex;
        min-height: calc(100vh - var(--page-nav-height));
      `}
    >
      <Outlet />
    </div>
  );
};

export default EditorLayout;
