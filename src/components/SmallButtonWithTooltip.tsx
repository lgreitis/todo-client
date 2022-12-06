import { Tooltip } from "@geist-ui/core";
import { ReactNode } from "react";
import SmallButton from "./SmallButton";

interface SmallButtonWithToggleProps {
  tooltipText?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const SmallButtonWithToggle = (props: SmallButtonWithToggleProps) => {
  const { tooltipText, onClick, icon } = props;

  return (
    <Tooltip text={tooltipText} scale={2 / 3} leaveDelay={0}>
      <SmallButton icon={icon} onClick={onClick} />
    </Tooltip>
  );
};

export default SmallButtonWithToggle;
