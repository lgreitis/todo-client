import { Button } from "@geist-ui/core";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  icon?: ReactNode;
  type?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "abort"
    | "secondary-light"
    | "success-light"
    | "warning-light"
    | "error-light";
}

const SmallButton = (props: Props) => {
  const { onClick, icon, type } = props;

  return (
    <Button
      iconRight={icon}
      auto
      type={type}
      scale={1.5 / 3}
      px={0.6}
      onClick={onClick}
    />
  );
};

export default SmallButton;
