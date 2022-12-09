import { css } from "@emotion/react";
import { Text, useTheme } from "@geist-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Page404 from "../error/Page404";
import EditorContainer from "./components/EditorContainer";
import EditorSidebar from "./components/EditorSidebar";

const EditorPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [selected, setSelected] = useState<string | undefined>();

  if (!id) {
    return <Page404 />;
  }

  console.log(selected);

  return (
    <>
      <EditorSidebar
        id={id}
        onClick={(el) => {
          console.log("change", el);
          setSelected(el);
        }}
      />
      <main
        css={css`
          display: flex;
          flex-direction: column;
          max-width: calc(100% - 300px);
          flex: 0 0 100%;
          min-height: 100%;
          border: 1px solid ${theme.palette.accents_2};
        `}
      >
        {selected ? (
          <EditorContainer selected={selected} key={selected} />
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100%;
            `}
          >
            <Text h1>No file selected!</Text>
            <Text h2 type="secondary">
              Choose a file to start editing!
            </Text>
          </div>
        )}
      </main>
    </>
  );
};

export default EditorPage;
