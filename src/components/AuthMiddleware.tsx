import { css } from "@emotion/react";
import { Loading } from "@geist-ui/core";
import { ReactElement } from "react";
import { useGetUserQuery } from "../api/userApi";

interface Props {
  children: ReactElement;
}

const AuthMiddleware = (props: Props) => {
  const { children } = props;
  const token = localStorage.getItem("refreshToken") || "";
  const { isLoading } = useGetUserQuery(null, { skip: !token });

  if (isLoading) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        `}
      >
        <Loading />
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
