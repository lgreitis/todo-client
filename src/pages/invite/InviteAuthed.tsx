import { css } from "@emotion/react";
import {
  Button,
  Code,
  Loading,
  Text,
  useTheme,
  useToasts,
} from "@geist-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAddUserMutation, useGetInviteQuery } from "../../api/invitesApi";
import Page404 from "../error/Page404";

const InviteAuthed = () => {
  const { setToast } = useToasts();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    return <Page404 />;
  }

  const { isLoading, data: invite } = useGetInviteQuery(id);
  const [submitInvite] = useAddUserMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !invite) {
    return <Page404 customMessage="Invite not found" />;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${theme.layout.gapHalf};
      `}
    >
      <Text h2 mb={0}>
        You&apos;re invited to: <Code>{invite?.organization.name}</Code>
      </Text>
      <Button
        type="secondary"
        onClick={() => {
          submitInvite(id)
            .unwrap()
            .then(() => {
              navigate("/");
              setToast({ text: "Successfully joined", type: "success" });
            })
            .catch(() => {
              return;
            });
        }}
      >
        Join
      </Button>
      <Button onClick={() => navigate("/")}>Home</Button>
    </div>
  );
};

export default InviteAuthed;
