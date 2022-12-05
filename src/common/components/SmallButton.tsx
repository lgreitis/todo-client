import { Button } from "@geist-ui/core";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  icon?: ReactNode;
}

const SmallButton = (props: Props) => {
  const { onClick, icon } = props;

  return (
    <Button iconRight={icon} auto scale={1.5 / 3} px={0.6} onClick={onClick} />
  );
};

export default SmallButton;
