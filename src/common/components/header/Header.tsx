import { css } from "@emotion/react";
import {
  Button,
  GeistUIThemes,
  Link,
  Tabs,
  Text,
  useTheme,
} from "@geist-ui/core";
import { Moon, Sun } from "@geist-ui/icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../../slices/themeSlice";
import { useAppSelector } from "../../../store";
import { addColorAlpha } from "../../../utils/color";

const navCss = (theme: GeistUIThemes) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--page-nav-height);
  background-color: ${addColorAlpha(theme.palette.background, 0.8)};
  backdrop-filter: saturate(180%) blur(5px);
  box-shadow: ${theme.type === "dark"
    ? "0 0 0 1px #333"
    : "0 0 15px 0 rgba(0, 0, 0, 0.1)"};
  z-index: 999;
`;

const containerCss = (theme: GeistUIThemes) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  user-select: none;
  padding: 0 ${theme.layout.gap};
`;

const logoCss = css`
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

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
  { label: "home", value: "/" },
  { label: "ORGANIZATIONS", value: "/admin/organization" },
  { label: "USERS", value: "/admin/user" },
];

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const color = useAppSelector(selectTheme).color;

  const handleTabChange = (val: string) => {
    navigate(val);
  };

  return (
    <div
      css={css`
        height: var(--page-nav-height);
      `}
    >
      <nav css={navCss(theme)}>
        <div css={containerCss(theme)}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <div css={logoCss}>
              <Text b>TODO:</Text>
            </div>
          </Link>
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
          <div css={controlsCss}>
            <Button
              onClick={() => {
                dispatch(toggleTheme());
              }}
              icon={color === "light" ? <Sun /> : <Moon />}
              auto
              scale={2 / 3}
            >
              {color}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
