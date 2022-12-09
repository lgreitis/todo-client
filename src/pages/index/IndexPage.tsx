import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import {
  Button,
  Code,
  Grid,
  Input,
  Loading,
  Text,
  useMediaQuery,
  useTheme,
} from "@geist-ui/core";
import { Plus, Search } from "@geist-ui/icons";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOrganizationsQuery } from "../../api/organizationApi";
import { selectUser } from "../../slices/userSlice";
import { useAppSelector } from "../../store";
import { Organization } from "../../types";
import OrganizationCard from "./components/OrganizationCard";
import AddNewOrganization from "./modals/AddNewOrganization";

const IndexPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isSM = useMediaQuery("sm");
  const isXS = useMediaQuery("xs");
  const isSmall = isSM || isXS;

  const {
    isLoading,
    data: organizations,
    isFetching,
  } = useGetOrganizationsQuery();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Organization[]>([]);

  useEffect(() => {
    if (!organizations) {
      return;
    }

    if (!search) {
      setFiltered(organizations);
      return;
    }

    const fuse = new Fuse(organizations, { threshold: 0.4, keys: ["name"] });
    const res = fuse.search(search);
    setFiltered(res.map((el) => el.item));
  }, [search, organizations]);

  return (
    <>
      <Text h3 pl={0.5}>
        Welcome back, <Code pr={0}>{user.username}</Code>
      </Text>
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
          />
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
        {(isLoading || isFetching) && <Loading pb={1} pt={0.5} />}
        {filtered.map((el) => (
          <Grid md={8} sm={12} xs={24} key={el.id}>
            <OrganizationCard
              id={el.id}
              fileCount={el._count.files}
              name={el.name}
              ownerUserId={el.ownerUserId}
              ownerName={el.ownerUser.username}
              userCount={el._count.users}
              onClick={() => navigate(`/editor/${el.id}`)}
            />
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
};

export default IndexPage;
