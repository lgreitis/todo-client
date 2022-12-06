import { css } from "@emotion/react";
import { Input, Table, useTheme } from "@geist-ui/core";
import { Search } from "@geist-ui/icons";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useGetOrganizationsSuperAdminQuery } from "../../api/organizationApi";
interface TableData {
  id: string;
  name: string;
  ownerName: string;
  fileCount: number | string;
  usersCount: number | string;
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
        pb={0.5}
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
        <Table.Column prop="usersCount" label="user count" />
        {/* <Table.Column prop="dateCreated" label="date created" />
        <Table.Column prop="expirationDate" label="expiration Date" />
        <Table.Column prop="usersInvited" label="users invited" />
        <Table.Column prop="disabledView" label="disabled" />
        <Table.Column prop="copyLink" label="controls" render={Controls} /> */}
      </Table>
    </>
  );
};

export default OrganizationAdminPage;
