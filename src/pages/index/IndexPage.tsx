import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Button, Grid, Input, useMediaQuery, useTheme } from "@geist-ui/core";
import { Plus, Search } from "@geist-ui/icons";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import OrganizationCard from "./components/OrganizationCard";
import AddNewOrganization from "./modals/AddNewOrganization";

interface Organization {
  name: string;
  ownerName: string;
  userCount: number;
  fileCount: number;
  id: string;
}

const organizations: Organization[] = [
  {
    name: "Pyzduku stabas",
    ownerName: "Lukas",
    userCount: 5,
    fileCount: 10,
    id: "fsdf34241fsdf",
  },
  {
    name: "Dunduliuku komanda",
    ownerName: "Lukas",
    userCount: 2,
    fileCount: 84,
    id: "fdsfl234jkmxc",
  },
  {
    name: "Luko pinigu plovimo programa",
    ownerName: "Lukas",
    userCount: 10,
    fileCount: 126,
    id: "bjvoicxjv3234fd",
  },
];

const IndexPage = () => {
  const theme = useTheme();
  const isSM = useMediaQuery("sm");
  const isXS = useMediaQuery("xs");
  const isSmall = isSM || isXS;

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Organization[]>(organizations);

  useEffect(() => {
    if (!search) {
      setFiltered(organizations);
      return;
    }

    const fuse = new Fuse(organizations, { threshold: 0.4, keys: ["name"] });
    const res = fuse.search(search);
    setFiltered(res.map((el) => el.item));
  }, [search]);

  return (
    <Grid.Container gap={1} width="100%" ml={0}>
      <Grid md={20} sm={22} xs>
        <Input
          css={css`
            background-color: ${theme.palette.background};
          `}
          scale={4 / 3}
          placeholder="Search..."
          width="100%"
          icon={<Search />}
          clearable
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></Input>
      </Grid>
      <Grid md={4} sm={1}>
        <Button
          type="secondary"
          width={!isSmall ? "100%" : undefined}
          auto={isSmall}
          icon={<Plus />}
          px={0.6}
          onClick={() => {
            NiceModal.show(AddNewOrganization);
          }}
        >
          {!isSmall ? "Add New" : null}
        </Button>
      </Grid>
      {filtered.map((el) => (
        <Grid md={8} sm={12} xs={24} key={el.id}>
          <OrganizationCard {...el} />
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default IndexPage;
