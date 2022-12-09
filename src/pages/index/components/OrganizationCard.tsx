import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Card, GeistUIThemes, Text, useTheme, useToasts } from "@geist-ui/core";
import { Book, Edit2, MessageSquare, Trash } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteOrganizationMutation } from "../../../api/organizationApi";
import SmallButtonWithToggle from "../../../components/SmallButtonWithTooltip";
import ConfirmDelete from "../../../modals/ConfirmDelete";
import { selectUser } from "../../../slices/userSlice";
import { useAppSelector } from "../../../store";
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
  ownerUserId: string;
  userCount: number;
  fileCount: number;
  id: string;
  onClick?: () => void;
}

const OrganizationCard = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { setToast } = useToasts();
  const [submitDelete] = useDeleteOrganizationMutation();
  const { name, ownerName, ownerUserId, userCount, fileCount, id, onClick } =
    props;

  return (
    <Card hoverable width="100%" css={cardCss(theme)}>
      <div css={mainContainerCss}>
        <div css={topCss(theme)} onClick={onClick}>
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
          {user.id === ownerUserId && (
            <div
              css={css`
                display: flex;
                z-index: 4;
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
                  NiceModal.show(EditOrganization, { id, name });
                }}
              />
              <SmallButtonWithToggle
                tooltipText="Delete"
                icon={<Trash />}
                onClick={() => {
                  NiceModal.show(ConfirmDelete, {
                    itemType: "organization",
                    confirm: () => {
                      submitDelete(id)
                        .unwrap()
                        .then(() => {
                          setToast({
                            text: "Organization removed",
                            type: "success",
                          });
                        });

                      NiceModal.hide(ConfirmDelete);
                    },
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;
