import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Modal, Select, useTheme, useToasts } from "@geist-ui/core";
import { Field, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCreateDirectoryItemMutation } from "../../../api/directoryApi";
import CustomInput from "../../../components/input/CustomInput";
import { CreateItemSchema } from "../../../schemas";
import { TreeElement } from "../../../types";

interface Props {
  organizationId: string;
  parentId?: string;
  onSuccess?: (data: TreeElement[]) => void;
}

const CreateDirectoryItemModal = NiceModal.create((props: Props) => {
  const { organizationId, parentId, onSuccess } = props;
  const modal = useModal();
  const theme = useTheme();
  const { setToast } = useToasts();
  const [submitItem, { isLoading }] = useCreateDirectoryItemMutation();

  return (
    <Formik
      initialValues={{ name: "", type: "file" }}
      validationSchema={toFormikValidationSchema(CreateItemSchema)}
      onSubmit={async (vals) => {
        const res = await submitItem({
          organizationId,
          parentId,
          name: vals.name,
          type:
            vals.type !== "file" && vals.type !== "folder" ? "file" : vals.type,
        }).unwrap();

        if (onSuccess) {
          onSuccess(res);
        }

        setToast({ text: "Item created", type: "success" });
        modal.remove();
      }}
    >
      {({ submitForm, setFieldValue, values }) => (
        <>
          <Modal visible={modal.visible} onClose={modal.remove}>
            <Modal.Title>Add new item</Modal.Title>
            <Modal.Content>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  gap: ${theme.layout.gapHalf};
                `}
              >
                <Field
                  name="name"
                  scale={4 / 3}
                  width="100%"
                  placeholder="Name"
                  component={CustomInput}
                />
                <Select
                  placeholder="Choose type"
                  scale={4 / 3}
                  width="100%"
                  value={values["type"]}
                  onChange={(val) => setFieldValue("type", val)}
                >
                  <Select.Option value="file">File</Select.Option>
                  <Select.Option value="folder">Folder</Select.Option>
                </Select>
              </div>
            </Modal.Content>
            <Modal.Action passive onClick={modal.remove} disabled={isLoading}>
              Cancel
            </Modal.Action>
            <Modal.Action
              onClick={() => {
                submitForm();
              }}
              loading={isLoading}
            >
              Add
            </Modal.Action>
          </Modal>
        </>
      )}
    </Formik>
  );
});

export default CreateDirectoryItemModal;
