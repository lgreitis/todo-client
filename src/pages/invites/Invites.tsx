import { css } from "@emotion/react";
import { Code, Table, Text, useTheme } from "@geist-ui/core";
import { Copy, Edit2, ToggleRight, Trash } from "@geist-ui/icons";
import SmallButtonWithToggle from "../../components/SmallButtonWithTooltip";

const Controls = (
  value: string | number | boolean,
  rowData: Invite,
  rowIndex: number
) => {
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

interface Invite {
  id: string;
  dateCreated: string;
  expirationDate: string;
  usersInvited: number;
  disabled: boolean;
  copyLink: string;
}

const Invites = () => {
  const data = [
    {
      id: "5f373685-8f5d-4f3d-98b8-ef75129fc19d",
      dateCreated: "2022-01-01",
      expirationDate: "2022-01-02",
      usersInvited: 3,
      disabled: false,
      disabledView: <Code>false</Code>,
      copyLink: "",
    },
  ];

  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Text h2>Organization invites</Text>
      </div>
      <Table data={data}>
        <Table.Column prop="id" label="id" />
        <Table.Column prop="dateCreated" label="date created" />
        <Table.Column prop="expirationDate" label="expiration Date" />
        <Table.Column prop="usersInvited" label="users invited" />
        <Table.Column prop="disabledView" label="disabled" />
        <Table.Column prop="copyLink" label="controls" render={Controls} />
      </Table>
    </>
  );
};

export default Invites;
