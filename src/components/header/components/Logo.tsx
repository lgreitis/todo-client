import { css } from "@emotion/react";
import { Link, Text } from "@geist-ui/core";

const logoCss = css`
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

interface Props {
  onClick?: (e: React.MouseEvent) => void;
}

const Logo = (props: Props) => {
  const { onClick } = props;

  return (
    <Link onClick={onClick}>
      <div css={logoCss}>
        <Text b>TODO:</Text>
      </div>
    </Link>
  );
};

export default Logo;
