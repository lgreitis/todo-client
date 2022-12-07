import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import {
  Button,
  Code,
  Grid,
  Loading,
  Table,
  Text,
  useTheme,
  useToasts,
} from "@geist-ui/core";
import { Copy, Edit2 } from "@geist-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrganizationInvitesQuery } from "../../api/invitesApi";
import SmallButtonWithToggle from "../../components/SmallButtonWithTooltip";
import Page404 from "../error/Page404";
import CreateInviteModal from "./modals/CreateInvite";
import EditInviteModal from "./modals/EditInvite";

interface TableData {
  id: string;
  disabled: React.ReactElement;
  dateCreated: string;
  expirationDate: string;
  usersInvited: string;
  operations: string;
  disabledRaw: boolean;
  expirationDateRaw: number;
}

const Controls = (value: unknown, rowData: TableData) => {
  const theme = useTheme();
  const { setToast } = useToasts();

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://127.0.0.1:5173/invite/${rowData.id}`);
    setToast({ text: "Copied to clipboard", type: "success" });
  };

  const handleEdit = () => {
    NiceModal.show(EditInviteModal, {
      organizationId: rowData.id,
      disabled: rowData.disabledRaw,
      expirationDate: rowData.expirationDateRaw,
    });
  };

  return (
    <div
      css={css`
        display: flex;
        gap: ${theme.layout.gapQuarter};
      `}
    >
      <SmallButtonWithToggle
        tooltipText="Edit"
        icon={<Edit2 />}
        onClick={handleEdit}
      />
      <SmallButtonWithToggle
        tooltipText="Copy link"
        icon={<Copy />}
        onClick={handleCopy}
      />
    </div>
  );
};

const Invites = () => {
  const { id } = useParams();

  if (!id) {
    return <Page404 />;
  }

  const { data, isLoading, isFetching } = useGetOrganizationInvitesQuery(id);

  const [invites, setInvites] = useState<TableData[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const mapped: TableData[] = data.map((el) => {
      return {
        dateCreated: new Date(parseInt(el.dateCreated)).toLocaleDateString(),
        disabled: <Code>{el.disabled.toString()}</Code>,
        expirationDate: new Date(
          parseInt(el.expirationDate)
        ).toLocaleDateString(),
        id: el.id,
        operations: "",
        usersInvited: el._count.usersInvited.toString(),
        disabledRaw: el.disabled,
        expirationDateRaw: parseInt(el.expirationDate),
      };
    });

    setInvites(mapped);
  }, [data]);

  if (!isLoading && !data) {
    return <Page404 customMessage="Organization not found" />;
  }

  return (
    <>
      <Grid.Container>
        <div
          css={css`
            display: flex;
            flex: 1;
            align-items: center;
          `}
        >
          <Text h2>Organization invites</Text>
        </div>
        <Button
          type="secondary"
          onClick={() => {
            NiceModal.show(CreateInviteModal, { organizationId: id });
          }}
        >
          New invite
        </Button>
      </Grid.Container>
      <Grid margin={0.5}>{(isLoading || isFetching) && <Loading />}</Grid>
      <Table data={invites}>
        <Table.Column prop="id" label="id" />
        <Table.Column prop="dateCreated" label="date created" />
        <Table.Column prop="expirationDate" label="expiration Date" />
        <Table.Column prop="usersInvited" label="users invited" />
        <Table.Column prop="disabled" label="disabled" />
        <Table.Column prop="operations" label="controls" render={Controls} />
      </Table>
    </>
  );
};

export default Invites;
