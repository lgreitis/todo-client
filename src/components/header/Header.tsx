import { css } from "@emotion/react";
import { GeistUIThemes, useMediaQuery, useTheme } from "@geist-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../slices/userSlice";
import { useAppSelector } from "../../store";
import { addColorAlpha } from "../../utils/color";
import HamburgerButton from "./components/HamburgerButton";
import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";
import Logo from "./components/Logo";

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

const Header = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isXS = useMediaQuery("xs");

  const [open, setOpen] = useState(false);

  return (
    <div
      css={css`
        height: var(--page-nav-height);
      `}
    >
      <nav css={navCss(theme)}>
        <div css={containerCss(theme)}>
          <Logo
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />
          {isXS && user.id ? (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          ) : (
            <HeaderDesktop />
          )}
        </div>
        {open && isXS && <HeaderMobile hidePanel={() => setOpen(false)} />}
      </nav>
    </div>
  );
};

export default Header;
