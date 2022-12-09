import { css } from "@emotion/react";
import { Loading, useTheme } from "@geist-ui/core";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import * as Y from "yjs";
import EditorControls from "./EditorControls";

interface Props {
  selected: string;
}

const EditorContainer = (props: Props) => {
  const { selected } = props;
  const theme = useTheme();

  const provider = useMemo(() => {
    const doc = new Y.Doc();

    return new HocuspocusProvider({
      url: "ws://127.0.0.1:3001",
      name: selected,
      document: doc,
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: provider.document,
      }),
    ],
  });

  if (!editor) {
    return <Loading />;
  }

  return (
    <>
      <EditorControls editor={editor} />
      <div
        css={css`
          display: flex;
          width: 100%;
          overflow: hidden;
        `}
      >
        <EditorContent
          css={css`
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;

            .ProseMirror {
              padding: 0 ${theme.layout.gapHalf};
            }

            .ProseMirror:focus-visible {
              outline: none;
              border-bottom: 1px solid ${theme.palette.accents_2};
            }
          `}
          editor={editor}
        />
      </div>
    </>
  );
};

export default EditorContainer;
