import { css } from "@emotion/react";
import { Button, Text } from "@geist-ui/core";
import { useNavigate } from "react-router-dom";

interface Params {
  customMessage?: string;
}

const Page404 = (params: Params) => {
  const { customMessage } = params;
  const navigate = useNavigate();

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
      <Text h1>404</Text>
      <Text h2 type="secondary">
        {customMessage ? customMessage : "Page not found"}
      </Text>
      <Button
        type="secondary"
        margin={2}
        onClick={() => navigate("/", { replace: true })}
      >
        Go back to safety
      </Button>
    </div>
  );
};

export default Page404;
