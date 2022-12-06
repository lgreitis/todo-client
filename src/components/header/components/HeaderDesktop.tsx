import { css } from "@emotion/react";
import { Button, GeistUIThemes, Tabs, useTheme } from "@geist-ui/core";
import { Moon, Sun } from "@geist-ui/icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../../slices/themeSlice";
import { selectUser } from "../../../slices/userSlice";
import { useAppSelector } from "../../../store";
import Settings from "./Settings";

const controlsCss = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const tabsCss = (theme: GeistUIThemes) => css`
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: center;

  .scroll-container {
    padding: 0 ${theme.layout.gap} !important;
  }

  .content {
    display: none;
  }
`;

interface Tab {
  label: string;
  value: string;
}

const tabs: Tab[] = [
  { label: "HOME", value: "/" },
  { label: "ORGANIZATIONS", value: "/admin/organization" },
  { label: "USERS", value: "/admin/user" },
];

const HeaderDesktop = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const color = useAppSelector(selectTheme).color;

  const handleTabChange = (val: string) => {
    navigate(val);
  };

  return (
    <>
      {user.role === "SUPERADMIN" && (
        <div css={tabsCss(theme)}>
          <Tabs
            value={location.pathname}
            initialValue="Home"
            hideDivider
            hideBorder
            align="center"
            onChange={handleTabChange}
          >
            {tabs.map((el) => (
              <Tabs.Item font="14px" key={el.value} {...el} />
            ))}
          </Tabs>
        </div>
      )}
      <div css={controlsCss}>
        {user.id ? (
          <Settings />
        ) : (
          <Button
            onClick={() => {
              dispatch(toggleTheme());
            }}
            icon={color === "light" ? <Sun /> : <Moon />}
            auto
            scale={2 / 3}
          >
            {color.toUpperCase()}
          </Button>
        )}
      </div>
    </>
  );
};

export default HeaderDesktop;
