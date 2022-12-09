import { css } from "@emotion/react";
import { Button, Text, Tooltip, useTheme } from "@geist-ui/core";
import {
  Bold,
  Code,
  Delete,
  Italic,
  RotateCcw,
  RotateCw,
} from "@geist-ui/icons";
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

interface buttonProps {
  icon?: ReactNode;
  type?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "abort"
    | "secondary-light"
    | "success-light"
    | "warning-light"
    | "error-light";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  active?: boolean;
  tooltip?: string;
}

const CustomButton = (props: buttonProps) => {
  const { active, tooltip, ...rest } = props;

  if (!tooltip) {
    return (
      <Button
        auto
        type={active ? "secondary" : "default"}
        px={0.6}
        css={css`
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          width: 40px !important;
          min-width: 40px !important  ;
        `}
        {...rest}
      />
    );
  }

  return (
    <Tooltip text={tooltip} leaveDelay={0} placement="bottom">
      <Button
        auto
        type={active ? "secondary" : "default"}
        px={0.6}
        css={css`
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          width: 40px !important;
        `}
        {...rest}
      />
    </Tooltip>
  );
};

const Separator = () => {
  const theme = useTheme();

  return (
    <span
      css={css`
        height: 100%;
        border-right: 1px solid ${theme.palette.accents_2};
      `}
    ></span>
  );
};

interface Props {
  editor: Editor;
}

const EditorControls = (props: Props) => {
  const { editor } = props;
  const theme = useTheme();

  return (
    <>
      <div
        css={css`
          display: flex;
          gap: 12px;
          flex-direction: row;
          border-bottom: 1px solid ${theme.palette.accents_2};
          padding: 10px;
          overflow-x: scroll;
        `}
      >
        {([1, 2, 3, 4, 5, 6] as (1 | 2 | 3 | 4 | 5 | 6)[]).map((el) => (
          <CustomButton
            key={el}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: el }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: el }).run()
            }
            active={editor.isActive("heading", { level: el })}
          >
            <Text span>h{el}</Text>
          </CustomButton>
        ))}

        <Separator />
        <CustomButton
          icon={<Bold />}
          tooltip="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <CustomButton
          icon={<Italic />}
          tooltip="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <Separator />
        <CustomButton
          icon={<Code />}
          tooltip="Inline Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
        />
        <Separator />
        <CustomButton
          icon={<Delete />}
          tooltip="Remove Styling"
          onClick={() => editor.chain().focus().clearNodes().run()}
          disabled={!editor.can().chain().focus().clearNodes().run()}
        />
        <CustomButton
          icon={<RotateCcw />}
          tooltip="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <CustomButton
          icon={<RotateCw />}
          tooltip="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
      </div>
    </>
  );
};

export default EditorControls;
