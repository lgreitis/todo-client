import { css } from "@emotion/react";
import { Link, Text, useTheme } from "@geist-ui/core";
import { Github, Linkedin } from "@geist-ui/icons";

const Footer = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: flex-end;
      `}
    >
      <div
        css={css`
          width: 100%;
          padding-top: ${theme.layout.gapHalf};
          border-top: 1px solid ${theme.palette.accents_2};
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${theme.layout.gapHalf};
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: ${theme.layout.gapHalf};
          `}
        >
          <Link href="https://www.linkedin.com/in/lukas-grei%C4%8Dius-609955217/">
            <Linkedin />
          </Link>
          <Link href="https://github.com/lgreitis/">
            <Github />
          </Link>
        </div>
        <Text h5 type="secondary">
          Lukas Greičius 2022
        </Text>
      </div>
    </div>
  );
};

export default Footer;
