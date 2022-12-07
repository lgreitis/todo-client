import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Input, Table, useTheme, useToasts } from "@geist-ui/core";
import { Edit2, Search, Trash } from "@geist-ui/icons";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import {
  useDeleteOrganizationMutation,
  useGetOrganizationsSuperAdminQuery,
} from "../../api/organizationApi";
import SmallButtonWithToggle from "../../components/SmallButtonWithTooltip";
import ConfirmDelete from "../../modals/ConfirmDelete";
import EditOrganization from "../index/modals/EditOrganization";
interface TableData {
  id: string;
  name: string;
  ownerName: string;
  fileCount: number | string;
  usersCount: number | string;
  controls: string;
}

const OrganizationAdminPage = () => {
  const theme = useTheme();
  const { data: organizations } = useGetOrganizationsSuperAdminQuery();
  const [filtered, setFiltered] = useState<TableData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!organizations) {
      return;
    }

    const mapped = organizations?.map((el) => {
      return {
        id: el.id,
        name: el.name,
        ownerName: el.ownerUser.username,
        fileCount: el._count.files || "0",
        usersCount: el._count.users || "0",
        controls: "",
      };
    });

    if (!search) {
      setFiltered(mapped);
      return;
    }

    const fuse = new Fuse(mapped, { threshold: 0.4, keys: ["name"] });
    const res = fuse.search(search);
    setFiltered(res.map((el) => el.item));
  }, [search, organizations]);

  return (
    <>
      <Input
        css={css`
          background-color: ${theme.palette.background};
        `}
        pb={0.8}
        scale={4 / 3}
        placeholder="Search..."
        width="100%"
        icon={<Search />}
        clearable
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Table data={filtered}>
        <Table.Column prop="id" label="id" />
        <Table.Column prop="name" label="name" />
        <Table.Column prop="ownerName" label="owner" />
        <Table.Column prop="fileCount" label="file count" />
        <Table.Column prop="usersCount" label="user count" />{" "}
        <Table.Column prop="controls" label="controls" render={Controls} />
      </Table>
    </>
  );
};

export default OrganizationAdminPage;

const Controls = (
  value: string | number | boolean,
  rowData: TableData,
  rowIndex: number
) => {
  const { setToast } = useToasts();
  const theme = useTheme();
  const [submitDelete] = useDeleteOrganizationMutation();

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
        onClick={() => {
          NiceModal.show(EditOrganization, {
            id: rowData.id,
            name: rowData.name,
          });
        }}
      />
      <SmallButtonWithToggle
        tooltipText="Delete"
        icon={<Trash />}
        onClick={() => {
          NiceModal.show(ConfirmDelete, {
            itemType: "organization",
            confirm: () => {
              submitDelete(rowData.id)
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
  );
};
