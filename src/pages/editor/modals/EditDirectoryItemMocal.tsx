import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Modal, useTheme, useToasts } from "@geist-ui/core";
import { Field, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEditDirectoryItemMutation } from "../../../api/directoryApi";
import CustomInput from "../../../components/input/CustomInput";
import { EditItemSchema } from "../../../schemas";
import { TreeElement } from "../../../types";

interface Props {
  id: string;
  name: string;
  type: "file" | "folder";
  onSuccess?: (data: TreeElement[]) => void;
}

const EditDirectoryItemModal = NiceModal.create((props: Props) => {
  const { id, name, type, onSuccess } = props;
  const modal = useModal();
  const theme = useTheme();
  const { setToast } = useToasts();
  const [submitItem, { isLoading }] = useEditDirectoryItemMutation();

  return (
    <Formik
      initialValues={{ name: name }}
      validationSchema={toFormikValidationSchema(EditItemSchema)}
      onSubmit={async (vals) => {
        const res = await submitItem({
          id,
          name: vals.name,
          type: type,
        }).unwrap();

        if (onSuccess) {
          onSuccess(res);
        }

        setToast({ text: "Item edited", type: "success" });
        modal.remove();
      }}
    >
      {({ submitForm }) => (
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
              Edit
            </Modal.Action>
          </Modal>
        </>
      )}
    </Formik>
  );
});

export default EditDirectoryItemModal;
