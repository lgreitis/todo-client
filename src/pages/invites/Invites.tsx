import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Button, Code, Grid, Table, Text, useTheme } from "@geist-ui/core";
import { Copy, Edit2, ToggleRight, Trash } from "@geist-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrganizationInvitesQuery } from "../../api/invitesApi";
import SmallButtonWithToggle from "../../components/SmallButtonWithTooltip";
import Page404 from "../error/Page404";
import CreateInviteModal from "./modals/CreateInvite";

interface TableData {
  id: string;
  disabled: React.ReactElement;
  dateCreated: string;
  expirationDate: string;
  usersInvited: string;
  operations: string;
}

const Controls = (value: unknown, rowData: TableData) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        gap: ${theme.layout.gapQuarter};
      `}
    >
      <SmallButtonWithToggle tooltipText="Edit" icon={<Edit2 />} />
      <SmallButtonWithToggle tooltipText="Delete" icon={<Trash />} />
      <SmallButtonWithToggle
        tooltipText={rowData.disabled ? "Enable" : "Disable"}
        icon={rowData.disabled ? <ToggleRight /> : <ToggleRight />}
      />
      <SmallButtonWithToggle tooltipText="Copy link" icon={<Copy />} />
    </div>
  );
};

const Invites = () => {
  const { id } = useParams();

  if (!id) {
    return <Page404 />;
  }

  const { data, isLoading } = useGetOrganizationInvitesQuery(id);

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
