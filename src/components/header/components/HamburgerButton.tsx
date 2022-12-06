import { css } from "@emotion/react";
import { Button } from "@geist-ui/core";
import { Menu } from "@geist-ui/icons";

interface HamburgerButtonProps {
  onClick?: () => void;
}

const HamburgerButton = (props: HamburgerButtonProps) => {
  const { onClick } = props;

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Button
        auto
        type="abort"
        icon={<Menu size="1.125rem" />}
        px={0.6}
        onClick={onClick}
      ></Button>
    </div>
  );
};

export default HamburgerButton;
