import NiceModal from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { GeistUIThemes, Loading, useTheme, useToasts } from "@geist-ui/core";
import { ChevronDown, ChevronRight, File, Folder } from "@geist-ui/icons";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { EventDataNode } from "rc-tree/lib/interface";
import { useEffect, useState } from "react";
import { ItemParams, useContextMenu } from "react-contexify";
import {
  directoryApi,
  useDeleteDirectoryItemMutation,
  useGetDirectoryRootQuery,
} from "../../../api/directoryApi";
import ConfirmDelete from "../../../modals/ConfirmDelete";
import { useAppDispatch } from "../../../store";
import { TreeElement } from "../../../types";
import CreateDirectoryItemModal from "../modals/CreateDirectoryItemModal";
import EditorContextMenu from "./EditorContextMenu";

const treeCss = (theme: GeistUIThemes) => css`
  .rc-tree-treenode {
    display: inline-flex;
    align-items: center;
  }

  .rc-tree-node-content-wrapper {
    padding: 1px 4px !important;
    border-radius: ${theme.layout.radius};
    padding-bottom: 3px !important;
  }

  .rc-tree-node-content-wrapper {
    display: inline-flex !important;
    align-items: center !important;
    gap: ${theme.layout.gapQuarter};
  }

  .rc-tree-icon__customize {
    width: 18px;
    height: 18px;
  }

  .rc-tree-node-content-wrapper:hover {
    background-color: ${theme.palette.accents_2} !important;
    box-shadow: 0 0 0 1px ${theme.palette.accents_2} !important;
  }

  .rc-tree-node-selected {
    opacity: 1 !important;
    color: ${theme.palette.cyan};
    box-shadow: 0 0 0 1px ${theme.palette.accents_3} !important;
    background-color: ${theme.palette.accents_3} !important;
  }

  .rc-tree-switcher {
    background-image: none !important;
  }
`;

const updateRoot = (list: TreeElement[], newList: TreeElement[]) => {
  return newList.map((el) => {
    const foundEl = list.findIndex((f) => {
      return f.key === el.key;
    });

    return {
      ...el,
      children: list[foundEl] ? list[foundEl].children : [],
    };
  });
};

const updateTreeData = (
  list: TreeElement[],
  key: React.Key,
  children: TreeElement[]
): TreeElement[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

interface Props {
  id: string;
  onClick: (fileId?: string) => void;
}

const EditorSidebar = (props: Props) => {
  const { id, onClick } = props;
  const theme = useTheme();
  const { setToast } = useToasts();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<TreeElement[]>([]);
  const { show } = useContextMenu({
    id: "context",
  });

  const {
    data: root,
    isLoading: isRootLoading,
    error: rootError,
  } = useGetDirectoryRootQuery(id);

  const [submitDelete, { isLoading: isDeleteLoading, error: deleteError }] =
    useDeleteDirectoryItemMutation();

  useEffect(() => {
    if (!root) {
      return;
    }
    setData(root);
  }, [root]);

  if (isRootLoading) {
    return <Loading />;
  }

  const loadData = async (el: EventDataNode<TreeElement>) => {
    const res = await dispatch(
      directoryApi.endpoints.getDirectoryItems.initiate({
        organizationId: id,
        parentId: el.key,
      })
    ).unwrap();

    setData((state) => updateTreeData(state, el.key, res));
  };

  const handleItemClick = (
    args: ItemParams<EventDataNode<TreeElement>, void>
  ) => {
    if (!args.props) {
      switch (args.id) {
        case "new": {
          NiceModal.show(CreateDirectoryItemModal, {
            organizationId: id,
            parentId: undefined,
            onSuccess: (data: TreeElement[]) => {
              if (args.props && args.props.key && !args.props.isLeaf) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setData((state) => updateTreeData(state, args.props.key, data));
              } else {
                setData((state) => updateRoot(state, data));
              }
            },
          });
          break;
        }
      }
      return;
    }

    switch (args.id) {
      case "new": {
        NiceModal.show(CreateDirectoryItemModal, {
          organizationId: id,
          parentId:
            args.props.key && !args.props.isLeaf ? args.props.key : undefined,
          onSuccess: (data: TreeElement[]) => {
            if (args.props && args.props.key && !args.props.isLeaf) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setData((state) => updateTreeData(state, args.props.key, data));
            } else {
              setData((state) => updateRoot(state, data));
            }
          },
        });
        break;
      }
      case "remove": {
        NiceModal.show(ConfirmDelete, {
          itemType: args.props.type,
          confirm: () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            submitDelete({ type: args.props.type, id: args.props?.key })
              .unwrap()
              .then((data) => {
                if (args.props && args.props.parentId) {
                  setData((state) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateTreeData(state, args.props.parentId, data)
                  );
                } else {
                  setData((state) => updateRoot(state, data));
                }
                setToast({
                  text: `${
                    args.props?.type === "file" ? "File" : "Folder"
                  } removed`,
                  type: "success",
                });
              })
              .catch(() => {
                setToast({
                  text: `Failed to remove ${
                    args.props?.type === "file" ? "File" : "Folder"
                  }`,
                  type: "error",
                });
              });

            NiceModal.hide(ConfirmDelete);
          },
        });
        break;
      }
    }
  };

  return (
    <aside
      css={css`
        flex-grow: 1;
      `}
    >
      <div
        css={css`
          height: 100%;
          position: fixed;
          width: 300px;
          padding-top: ${theme.layout.gapQuarter};
          padding-left: ${theme.layout.gapQuarter};
        `}
      >
        <Tree
          css={treeCss(theme)}
          treeData={data.map((el) => {
            return {
              ...el,
              icon:
                el.type === "file" ? <File size={18} /> : <Folder size={18} />,
            };
          })}
          loadData={loadData}
          icon={<File size={18} />}
          onSelect={(el, info) => {
            if (!el[0]) {
              onClick(undefined);
              return;
            }
            onClick(info.node.type === "file" ? info.node.key : undefined);
          }}
          onRightClick={({ event, node }) => {
            show({ event, props: node });
          }}
          switcherIcon={(obj) => {
            if (obj.isLeaf) {
              return <></>;
            }

            return obj.expanded ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            );
          }}
        />
        <div
          css={css`
            height: 100%;
          `}
          onContextMenu={(event) => {
            show({ event });
          }}
        ></div>
      </div>

      <EditorContextMenu handleClick={handleItemClick} />
    </aside>
  );
};

export default EditorSidebar;
