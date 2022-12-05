import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import {
  Button,
  Card,
  GeistUIThemes,
  Text,
  Tooltip,
  useTheme,
} from "@geist-ui/core";
import { Book, Edit2, MessageSquare } from "@geist-ui/icons";
import { ReactNode } from "react";
import ConfirmDelete from "../../../modals/ConfirmDelete";
import EditOrganization from "../modals/EditOrganization";

const cardCss = (theme: GeistUIThemes) => css`
  cursor: pointer;
  :hover {
    border: 1px solid ${theme.palette.accents_8} !important;
  }
  .content {
    height: 100% !important;
  }
`;

const mainContainerCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const topCss = (theme: GeistUIThemes) => css`
  display: flex;
  gap: ${theme.layout.gapHalf};
  flex-direction: row;
  align-items: center;
`;

const bottomCss = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

interface Props {
  name: string;
  ownerName: string;
  userCount: number;
  fileCount: number;
  id: string;
  onClick?: () => void;
}

const OrganizationCard = (props: Props) => {
  const theme = useTheme();
  const { name, ownerName, userCount, fileCount, onClick } = props;

  return (
    <Card hoverable width="100%" onClick={onClick} css={cardCss(theme)}>
      <div css={mainContainerCss}>
        <div css={topCss(theme)}>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Book size={26} />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <Text b>{name}</Text>
            <Text small>{ownerName}</Text>
          </div>
        </div>
        <div css={bottomCss}>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: ${theme.layout.gapHalf};
            `}
          >
            <Text small type="secondary">
              Users: {userCount}
            </Text>
            <Text small type="secondary">
              Files: {fileCount}
            </Text>
          </div>
          <div
            css={css`
              display: flex;
              gap: ${theme.layout.gapQuarter};
            `}
          >
            <CardButton
              tooltipText="Invites"
              icon={<MessageSquare />}
              onClick={() => {}}
            />
            <CardButton
              tooltipText="Edit"
              icon={<Edit2 />}
              onClick={() => {
                NiceModal.show(EditOrganization);
              }}
            />
            <CardButton
              tooltipText="Delete"
              icon={<MessageSquare />}
              onClick={() => {
                NiceModal.show(ConfirmDelete, { itemType: "organization" });
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;

interface CardButtonProps {
  tooltipText: string;
  onClick: () => void;
  icon: ReactNode;
}

const CardButton = (props: CardButtonProps) => {
  const { tooltipText, onClick, icon } = props;

  return (
    <Tooltip text={tooltipText} scale={2 / 3} leaveDelay={0}>
      <Button
        iconRight={icon}
        auto
        scale={1.5 / 3}
        px={0.6}
        onClick={onClick}
      />
    </Tooltip>
  );
};
