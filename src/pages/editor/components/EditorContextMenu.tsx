import { css } from "@emotion/react";
import { GeistUIThemes, useTheme } from "@geist-ui/core";
import { EventDataNode } from "rc-tree/lib/interface";
import { Item, ItemParams, Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { TreeElement } from "../../../types";

const menuCss = (theme: GeistUIThemes) => css`
  border: 1px solid ${theme.palette.accents_2};

  --contexify-menu-bgColor: ${theme.palette.background};
  --contexify-separator-color: ${theme.palette.accents_2};
  --contexify-item-color: ${theme.palette.accents_6};
  --contexify-activeItem-color: ${theme.palette.accents_8};
  --contexify-activeItem-bgColor: ${theme.palette.selection};
  /* --contexify-rightSlot-color: #6f6e77; */
  /* --contexify-activeRightSlot-color: #fff; */
  /* --contexify-arrow-color: #6f6e77; */
  /* --contexify-activeArrow-color: #fff; */
`;

interface Props {
  handleClick: (args: ItemParams<EventDataNode<TreeElement>, void>) => void;
}

const EditorContextMenu = (props: Props) => {
  const { handleClick } = props;
  const theme = useTheme();

  return (
    <Menu id={"context"} css={menuCss(theme)}>
      <Item onClick={handleClick} id="new">
        Add new item
      </Item>
      <Item onClick={handleClick} id="edit">
        Edit item
      </Item>
      <Item onClick={handleClick} id="remove">
        Remove Item
      </Item>
    </Menu>
  );
};

export default EditorContextMenu;
