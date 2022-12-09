import { css, keyframes } from "@emotion/react";
import { GeistUIThemes, useTheme } from "@geist-ui/core";
import { LogOut, Moon, Sun } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { selectTheme, toggleTheme } from "../../../slices/themeSlice";
import { selectUser } from "../../../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ValueLabel } from "../../../types";

const menuCss = (theme: GeistUIThemes) => css`
  position: fixed;
  top: var(--page-nav-height);
  height: calc(100vh - var(--page-nav-height));
  width: 100vw;
  overflow-y: auto;
  z-index: 999;
  box-sizing: border-box;
  background-color: ${theme.palette.background};
  overflow-y: auto;
`;

const fadeIn = keyframes`
  from {
    transform: translate3d(0, 0.375rem, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const fadeInCss = css`
  animation: ${fadeIn} 200ms ease;
  animation-fill-mode: forwards;
  opacity: 0;
`;

const menuItemCss = (theme: GeistUIThemes) => css`
  padding: 0 ${theme.layout.gapHalf};
  margin: 0 ${theme.layout.gap};
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  border-bottom: 1px solid ${theme.palette.accents_2};
  text-transform: capitalize;
  color: ${theme.palette.accents_6};
  cursor: pointer;
  transition: color 200ms ease;

  :hover {
    color: ${theme.palette.accents_8};
  }
`;

const withIconCss = (theme: GeistUIThemes) => css`
  display: flex;
  flex-direction: row;
  gap: ${theme.layout.gapHalf};
`;

const items: ValueLabel[] = [
  {
    value: "/",
    label: "HOME",
  },
  {
    value: "/admin/organization",
    label: "ORGANIZATIONS",
  },
  {
    value: "/admin/user",
    label: "USERS",
  },
];

interface Props {
  hidePanel: () => void;
}

const HeaderMobile = (props: Props) => {
  const { hidePanel } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const color = useAppSelector(selectTheme).color;
  const user = useAppSelector(selectUser);

  return (
    <div css={menuCss(theme)}>
      {user.role === "SUPERADMIN" &&
        items.map((el, i) => (
          <div
            key={el.value}
            css={fadeInCss}
            style={{ animationDelay: `${(i + 1) * 50}ms` }}
          >
            <button
              css={menuItemCss(theme)}
              onClick={() => {
                hidePanel();
                navigate(el.value);
              }}
            >
              {el.label}
            </button>
          </div>
        ))}
      <div
        css={fadeInCss}
        style={{ animationDelay: `${(items.length + 1) * 50}ms` }}
      >
        <button
          css={menuItemCss(theme)}
          onClick={() => {
            hidePanel();
            dispatch(toggleTheme());
          }}
        >
          <div css={withIconCss(theme)}>
            {color === "light" ? <Sun /> : <Moon />}
            {color.toUpperCase()}
          </div>
        </button>
      </div>
      <div
        css={fadeInCss}
        style={{ animationDelay: `${(items.length + 1) * 50}ms` }}
        onClick={() => {
          hidePanel();
          dispatch(logout());
        }}
      >
        <button css={menuItemCss(theme)}>
          <div css={withIconCss(theme)}>
            <LogOut /> LOGOUT
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderMobile;
