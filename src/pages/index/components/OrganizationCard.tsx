import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Card, GeistUIThemes, Text, useTheme } from "@geist-ui/core";
import { Book, Edit2, MessageSquare, Trash } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";
import SmallButtonWithToggle from "../../../common/components/SmallButtonWithTooltip";
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
  const navigate = useNavigate();
  const { name, ownerName, userCount, fileCount, id, onClick } = props;

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
            <SmallButtonWithToggle
              tooltipText="Invites"
              icon={<MessageSquare />}
              onClick={() => {
                navigate(`/invites/${id}`);
              }}
            />
            <SmallButtonWithToggle
              tooltipText="Edit"
              icon={<Edit2 />}
              onClick={() => {
                NiceModal.show(EditOrganization);
              }}
            />
            <SmallButtonWithToggle
              tooltipText="Delete"
              icon={<Trash />}
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
