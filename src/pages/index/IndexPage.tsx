import { css } from "@emotion/react";
import { Button, Grid, Input, useMediaQuery, useTheme } from "@geist-ui/core";
import { Plus, Search } from "@geist-ui/icons";
import OrganizationCard from "./components/OrganizationCard";

const IndexPage = () => {
  const theme = useTheme();
  const isSM = useMediaQuery("sm");
  const isXS = useMediaQuery("xs");
  const isSmall = isSM || isXS;

  const organizations = [
    {
      name: "organization 1",
      ownerName: "Lukas",
      userCount: 5,
      id: "fsdf34241fsdf",
    },
    {
      name: "organization 2",
      ownerName: "Lukas",
      userCount: 2,
      id: "fdsfl234jkmxc",
    },
    {
      name: "organization 3",
      ownerName: "Lukas",
      userCount: 10,
      id: "bjvoicxjv3234fd",
    },
  ];

  return (
    <Grid.Container gap={1} width="100%">
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
        ></Input>
      </Grid>
      <Grid md={4} sm={1}>
        <Button
          type="secondary"
          width={!isSmall ? "100%" : undefined}
          auto={isSmall}
          icon={<Plus />}
          px={0.6}
        >
          {!isSmall ? "Add New" : null}
        </Button>
      </Grid>
      {organizations.map((el) => (
        <Grid md={8} sm={12} xs={24} key={el.id}>
          <OrganizationCard {...el} />
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default IndexPage;
