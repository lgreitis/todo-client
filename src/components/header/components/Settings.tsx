import { css } from "@emotion/react";
import { GeistUIThemes, Popover, useTheme } from "@geist-ui/core";
import { LogOut, Moon, Settings as SettingsIcon, Sun } from "@geist-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { selectTheme, toggleTheme } from "../../../slices/themeSlice";
import { useAppSelector } from "../../../store";

const buttonCss = (theme: GeistUIThemes) =>
  css`
    min-width: 225px;
    min-height: 36px;
    padding: 0 ${theme.layout.gap};
    display: flex;
    align-items: center;
    gap: ${theme.layout.gapHalf};
    cursor: pointer;

    :hover {
      background-color: ${theme.palette.accents_1};
    }
  `;

const Settings = () => {
  const color = useAppSelector(selectTheme).color;
  const theme = useTheme();
  const dispatch = useDispatch();

  const content = () => (
    <>
      <Popover.Item padding={0} onClick={() => dispatch(toggleTheme())}>
        <div css={buttonCss(theme)}>
          {color === "light" ? <Sun /> : <Moon />}
          {color.toUpperCase()}
        </div>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item padding={0}>
        <div
          css={buttonCss(theme)}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <LogOut />
          LOGOUT
        </div>
      </Popover.Item>
    </>
  );

  return (
    <div
      css={css`
        .tooltip {
          display: flex !important;
          cursor: pointer;
        }
      `}
    >
      <Popover
        content={content}
        placement="bottomEnd"
        padding={0}
        py={0.5}
        css={css`
          .inner {
            padding: 0;
          }
        `}
      >
        <SettingsIcon />
      </Popover>
    </div>
  );
};

export default Settings;
